import pool from '../../config/database'

let homepage = async (req, res) => {
  try {
    let query = `
      select a.name, a.date_started, a.date_expired, a.bid_step, a.initial_price,
      c.image, max(b.price) as current_price
      from auction as a
      left join bid as b on a.id = b.auction_id
      left join car as c on a.car_id = c.id
      group by a.id
    ;`

    let [rows, dump] = await pool.query(query)
    console.log(rows)
    return res.status(200).send(rows)
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER_ERROR'})
  }

}

module.exports = {
  homepage
}