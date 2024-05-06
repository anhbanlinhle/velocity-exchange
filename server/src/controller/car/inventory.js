import pool from "../../config/database";

let inventoryRequest = async (req, res) => {
  let userId = req.body.userId;
  let pageNo = req.body.pageNo || 1
  let pageSize = req.body.pageSize || 8

  if (userId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  try {
    let query = `
    SELECT
        c.id, c.model_code, c.current_owner, c.class, c.status_in_storage, c.image,
        ac.first_name, ac.last_name,
        v.id as verification_request_id,
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
	join account as ac on ac.id = v.seller_id
    WHERE
        v.seller_id = ?
        AND a.winner_id IS NULL
    order by
        c.id DESC
    limit ? offset ?;
    `

    let total_query = `
    SELECT
        count(*) as total
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
        c.id DESC
    limit ? offset ?;
    `

    let [rows, fields] = await pool.query(query, [userId, pageSize, (pageNo - 1) * pageSize])
    let [totalResult, dump2] = await pool.query(total_query, [userId, pageSize, (pageNo - 1) * pageSize])

    return res.status(200).send({data: rows, pages: Math.ceil(totalResult[0].total / pageSize)})

  } catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
};

module.exports = {
    inventoryRequest,
};
