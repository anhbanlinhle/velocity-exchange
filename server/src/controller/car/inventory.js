import pool from "../../config/database";

let inventoryRequest = async (req, res) => {
  let userId = req.body.userId;

  if (userId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  try {
    let query = `
    SELECT
        c.*,
        v.status as verification_request_status,
        a.id as auction_id, a.status as auction_status,
        CASE
            WHEN a.id IS NOT NULL THEN TRUE
            ELSE FALSE
        END AS is_auctioning
    FROM
        car AS c
    JOIN
        verification_request AS v ON c.id = v.car_id
    LEFT JOIN
        auction AS a ON a.car_id = c.id
    WHERE
        v.seller_id = ?
        AND a.winner_id IS NULL
    order by
        c.id DESC;
    `

    let [rows, fields] = await pool.query(query, [userId])

    return res.status(200).send({ data: rows })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
};

module.exports = {
    inventoryRequest,
};
