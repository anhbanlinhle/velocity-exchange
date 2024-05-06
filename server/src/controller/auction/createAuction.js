import pool from "../../config/database"

let createAuction = async (req, res) => {
  let name = req.body.name
  let hostId = req.body.accountId
  let carId = req.body.carId
  let startTime = req.body.startTime
  let endTime = req.body.endTime
  let bidStep = req.body.bidStep
  let initialPrice = req.body.initialPrice
  let deposit = req.body.deposit

  if (name === undefined || hostId === undefined || carId === undefined || startTime === undefined || endTime === undefined || bidStep === undefined || initialPrice === undefined || deposit === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }

  try {
    let car_status = `
    select status_in_storage from car where id = ?
    `
    let [rows5, dump5] = await pool.query(car_status, [carId])
    if (rows5.length === 0) {
      return res.status(404).send({ErrorCode: 'ER_CAR_NOT_FOUND'})
    }
    if (rows5[0].status_in_storage !== 'Available') {
      return res.status(400).send({ErrorCode: 'ER_CAR_NOT_AVAILABLE'})
    }

    let createdTime = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (14 * 3600 * 1000)).toISOString().slice(0, 19).replace('T', ' ');

    let query = `
    insert into auction (name, host_id, car_id, date_created, date_started, date_expired, bid_step, initial_price, deposit_price)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    let [rows, dump1] = await pool.query(query, [name, hostId, carId, createdTime, startTime, endTime, bidStep, initialPrice, deposit])

    let auctionId = rows.insertId

    let first_bid = `
    insert into bid (auction_id, customer_id, timestamp, price)
    values (?, ?, ?, ?)
    `
    let [rows2, dump2] = await pool.query(first_bid, [auctionId, hostId, createdTime, initialPrice])

    let car_storage = `
    update car set status_in_storage = 'Auctioning' where id = ?
    `

    let [rows4, dump4] = await pool.query(car_storage, [carId])

    let startedTime = new Date(startTime).getTime()
    if (startedTime <= new Date().getTime()) {
      let query3 = `
        update auction set status = 'ONGOING' where id = ?
      `
      let [rows3, dump3] = await pool.query(query3, [auctionId])
    }

    return res.status(200).send({message: 'success'})
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER_ERROR'})
  }

}

module.exports = {
  createAuction
}