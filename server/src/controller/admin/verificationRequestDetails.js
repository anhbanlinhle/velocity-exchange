import pool from "../../config/database";

let verificationRequestDetails = async (req, res) => {
  let requestId = req.body.requestId;

  if (requestId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  try {
    let query = `
    select v.status, v.time, c.*, a.first_name, a.last_name 
    from verification_request as v 
    join car as c on c.id = v.car_id 
    join account as a on v.seller_id = a.id 
    where v.id = ?
    `

    let [rows, fields] = await pool.query(query, [requestId])

    return res.status(200).send({ data: rows })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
};

module.exports = {
  verificationRequestDetails,
};
