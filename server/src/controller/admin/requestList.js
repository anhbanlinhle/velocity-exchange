import pool from '../../config/database'

let requestList = async (req, res) => {
  let pageNo = req.body.pageNo || 1
  let pageSize = req.body.pageSize || 8

  try {
    let query = `
      select v.id, c.model_code, a.first_name, a.last_name, v.status, v.time
      from verification_request as v
      join car as c on c.id = v.car_id
      join account as a on a.id = v.seller_id
      order by v.id desc
      limit ? offset ?
    `

    let [rows, fields] = await pool.query(query, [pageSize, (pageNo - 1) * pageSize])

    let [totalResult, dump2] = await pool.query('select count(*) as total from verification_request')

    return res.status(200).send({data: rows, pages: Math.ceil(totalResult[0].total / pageSize)})
  } catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
};

module.exports = {
  requestList
}
