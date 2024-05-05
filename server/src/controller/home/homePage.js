import pool from '../../config/database'

let homepage = async (req, res) => {
  let pageSize = req.body.pageSize || 8
  let pageNo = req.body.pageNo || 1
  try {
    let query = `
      select a.id, a.name, a.date_started, a.date_expired, a.bid_step, a.initial_price,
      c.image, max(b.price) as current_price
      from auction as a
      left join bid as b on a.id = b.auction_id
      left join car as c on a.car_id = c.id
      group by a.id
      limit ? offset ?
    `
    let offset = (pageNo - 1) * pageSize

    let [rows, dump1] = await pool.query(query, [pageSize, offset])

    let [totalResult, dump2] = await pool.query('select count(*) as total from auction')

    return res.status(200).send({data: rows, total: totalResult[0].total})
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER_ERROR'})
  }

}

module.exports = {
  homepage
}