import pool from "../../config/database";

let inventoryRequest = async (req, res) => {
  let userId = req.body.userId;

  if (userId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  try {
    let query = `
    select c.id as car_id, c.model_code, c.current_owner, c.class, c.status_in_storage, c.image,
    ac.first_name, ac.last_name,
    max(v.id) as verification_request_id,
    CASE
        WHEN a.id IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_auctioning
    from car as c
    join verification_request as v on c.id = v.car_id
    left join auction as a on a.car_id = c.id
    join account as ac on ac.id = v.seller_id
    where v.seller_id = ? AND a.winner_id IS NULL
    and (v.car_id, v.id) in
    (select v.car_id, max(v.id)
    from car as c
    join verification_request as v on c.id = v.car_id
    group by c.id
    )
    group by c.id
    ;
    `

    let [rows, fields] = await pool.query(query, [userId])

    return res.status(200).send({data: rows})

  } catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
};

module.exports = {
    inventoryRequest,
};
