import pool from '../../config/database'

let dbHealth = async (req, res) => {
  let query = 'select 1'

  try {
    let [rows, field] = await pool.query(query)

    if (rows.length === 0) {
      return res.status(500).send({ErrorCode: 'DB_ERROR', ErrorNo: 'NO_DATA'})
    }
    else {
      return res.status(200).send({Status: 'OK'})
    }
  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
}

module.exports = {
  dbHealth
}