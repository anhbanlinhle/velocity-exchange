import pool from '../../config/database'

let homepage = async (req, res) => {
  let pageSize = req.body.pageSize || 8
  let pageNo = req.body.pageNo || 1
  let userId = req.body.userId

  if (pageSize < 1 || pageNo < 1) {
    return res.status(400).send({ErrorCode: 'ER_INVALID_PAGE'})
  }
  if (userId === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }

  try {
    let query = `
      (select a.id, a.name, a.date_started, a.date_expired, a.bid_step, a.initial_price,
        c.image, max(b.price), 1 as isRegist
      from auction as a
      join auction_registration as r on a.id = r.auction_id
      left join bid as b on a.id = b.auction_id
      left join car as c on a.car_id = c.id
      where r.customer_id = ?
      group by a.id)
      union
      (select a.id, a.name, a.date_started, a.date_expired, a.bid_step, a.initial_price,
            c.image, max(b.price), 0 as isRegist
      from auction as a
      left join bid as b on a.id = b.auction_id
      left join car as c on a.car_id = c.id
      where a.id not in 
      (select a.id
      from auction as a
      join auction_registration as r on a.id = r.auction_id
      where r.customer_id = ?)
      group by a.id
      )
      order by id
      limit ? offset ?
    `
    let offset = (pageNo - 1) * pageSize

    let [rows, dump1] = await pool.query(query, [userId, userId, pageSize, offset])

    let [totalResult, dump2] = await pool.query('select count(*) as total from auction')

    return res.status(200).send({data: rows, pages: Math.ceil(totalResult[0].total / pageSize)})
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER_ERROR'})
  }

}

module.exports = {
  homepage
}