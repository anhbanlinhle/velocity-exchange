import pool from '../../config/database'

let requestFilter = async (req, res) => {
  let pageNo = req.body.pageNo || 1
  let pageSize = req.body.pageSize || 8
  let status = req.body.status || 'PENDING'

  if (status !== 'PENDING' && status !== 'APPROVED' && status !== 'REJECTED') {
    return res.status(400).send({ ErrorCode: 'INVALID_STATUS', ErrorNo: 400 })
  }

  try {
    let query = `
      select v.id, c.model_code, a.first_name, a.last_name, v.status, v.time
      from verification_request as v
      join car as c on c.id = v.car_id
      join account as a on a.id = v.seller_id
      where v.status = ?
      order by v.id desc
      limit ? offset ?
    `

    let [rows, fields] = await pool.query(query, [status, pageSize, (pageNo - 1) * pageSize])

    let totalQuery = `
      select count(*) as total from verification_request where status = ?
    `
    let [totalResult, dump2] = await pool.query(totalQuery, [status])

    return res.status(200).send({data: rows, pages: Math.ceil(totalResult[0].total / pageSize)})
  } catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
};

module.exports = {
  requestFilter
}
