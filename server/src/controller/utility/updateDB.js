import pool from "../../config/database"

let updateDB = async (req, res, next) => {
  console.log('Updating database...')

  try {
    let allAuction = await pool.query(`select id, car_id, date_started, date_expired, status from auction where status = 'INCOMING' or status = 'ONGOING'`)
    let now = new Date().getTime()
    for (let i = 0; i < allAuction[0].length; i++) {
      if (new Date(allAuction[0][i].date_expired).getTime() < now) {
        await pool.query('update auction set status = "COMPLETED" where id = ?', [allAuction[0][i].id])

        let [highestBid, dump] = await pool.query('select max(price) as highest from bid where auction_id = ?', [allAuction[0][i].id])

        if (highestBid[0].highest) {
          let [bidder, dump2] = await pool.query('select customer_id from bid where price = ? and auction_id = ?', [highestBid[0].highest, allAuction[0][i].id])
          await pool.query('update auction set winner_id = ? where id = ?', [bidder[0].customer_id, allAuction[0][i].id])

          let [payment, dump3] = await pool.query('insert into payment (user_id, transaction_id, amount) values (?, ?, ?)', [bidder[0].customer_id, 'trol6l66-v314-458n-x531-xDa024968714', highestBid[0].highest])
          console.log(bidder[0].customer_id, allAuction[0][i].car_id, payment.insertId)

          await pool.execute('insert into verification_request (seller_id, car_id, status, time, admin_id, payment_id) value (?, ?, ?, NOW(), ?, ?)', [bidder[0].customer_id, allAuction[0][i].car_id, 'APPROVED', 1, payment.insertId])

          await pool.query('update car set status_in_storage = "Available" where id = ?', [allAuction[0][i].car_id])
        }
      }
      else if (new Date(allAuction[0][i].date_started).getTime() < now) {
        if (allAuction[0][i].status === 'INCOMING') {
          await pool.query('update auction set status = "ONGOING" where id = ?', [allAuction[0][i].id])
        }
      }
    }
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER_ERROR'})
  }

  next()
}

module.exports = {
  updateDB
}