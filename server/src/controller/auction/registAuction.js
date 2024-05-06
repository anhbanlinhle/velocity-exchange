import pool from "../../config/database"

let registAuction = async (req, res) => {
  let userId = req.body.userId
  let auctionId = req.body.auctionId
  
  if (userId === undefined || auctionId === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }

  try {
    let transactionId = 'trol6l66-v314-458n-x531-xDa024968714'
    let auctionQuery = `
      select deposit_price, status
      from auction
      where id = ?
    `

    let [auction, dump] = await pool.query(auctionQuery, [auctionId])

    if (auction.length === 0) {
      return res.status(404).send({ErrorCode: 'ER_NOT_FOUND'})
    }
    if (auction[0].status !== 'ONGOING') {
      return res.status(400).send({ErrorCode: 'ER_AUCTION_CLOSED'})
    }

    let amount = auction[0].deposit_price

    let insertPayment = `
      insert into payment (transaction_id, user_id, amount)
      values (?, ?, ?)
    `
    let [payment, dump1] = await pool.query(insertPayment, [transactionId, userId, amount])

    let regist = `
      insert into auction_registration (auction_id, customer_id, payment_id)
      values (?, ?, ?)
    `

    let [result, dump2] = await pool.query(regist, [auctionId, userId, payment.insertId])

    return res.status(200).send({message: 'success'})
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER'})
  }
}

module.exports = {
  registAuction
}