import pool from "../../config/database";

let verificationRequestDetails = async (req, res) => {
  let verification_request_id = req.body.verification_request_id;

  if (verification_request_id === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  let query =
    "select v.status, v.time, c.*, a.first_name as seller_first_name, a.last_name as seller_last_name from verification_request as v join car as c on c.id = v.car_id join account as a on v.seller_id = a.id where v.id = ?";

  try {
    let [rows, fields] = await pool.query(query, [verification_request_id]);

    if (rows.length === 0) {
      return res
        .status(200)
        .send({ ErrorCode: "NO_DATA", ErrorNo: "No data found" });
    } else {
      return res.status(200).send({ data: rows }); // Send the query result in the response
    }
  } catch (err) {
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno });
  }
};

module.exports = {
  verificationRequestDetails,
};
