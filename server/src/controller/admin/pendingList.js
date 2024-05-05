import pool from '../../config/database'

let pendingList = async (req, res) => {
  let pageNo = req.body.pageNo || 1
  let pageSize = req.body.pageSize || 8

  try {
    let query = `
      select * from verification_request
      where status = 'PENDING'
      limit ? offset ?
    `

    let [rows, fields] = await pool.query(query, [pageSize, (pageNo - 1) * pageSize])

    let [totalResult, dump2] = await pool.query('select count(*) as total from verification_request')

    if (rows.length === 0) {
      return res.status(200).send({ ErrorCode: 'NO_DATA', ErrorNo: 'No data found' })
    } else {
      return res.status(200).send({data: rows, pages: Math.ceil(totalResult[0].total / pageSize)})
    }
  } catch (err) {
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
};

module.exports = {
  pendingList
}
