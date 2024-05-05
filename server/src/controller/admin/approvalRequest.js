import pool from "../../config/database";

let approvalRequest = async (req, res) => {
  let verification_request_id = req.body.verification_request_id;
  let admin_id = req.body.admin_id;

  if (verification_request_id === undefined || admin_id === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  let query =
    'UPDATE verification_request SET status = "APPROVED", time = NOW(), admin_id = ? WHERE id = ?';

  try {
    let [rows, fields] = await pool.query(query, [admin_id, verification_request_id]);

    if (rows.affectedRows === 0) {
      return res.status(200).send({ ErrorCode: "NO_DATA", ErrorNo: "No data found" });
    } else {
      return res.status(200).send({ Status: "OK" });
    }
  } catch (err) {
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno });
  }
};

module.exports = {
  approvalRequest,
};
