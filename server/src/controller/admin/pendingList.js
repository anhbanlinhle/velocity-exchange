import pool from '../../config/database';

let pendingList = async (req, res) => {
  let query = 'SELECT * FROM verification_request WHERE status = "PENDING"';

  try {
    let [rows, fields] = await pool.query(query);

    if (rows.length === 0) {
      return res.status(200).send({ ErrorCode: 'NO_DATA', ErrorNo: 'No data found' });
    } else {
      return res.status(200).send({data: rows}); // Send the query result in the response
    }
  } catch (err) {
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno });
  }
};

module.exports = {
  pendingList
};
