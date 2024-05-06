import pool from "../../config/database";

let makeBid = async (req, res) => {
  let userId = req.body.userId;
  let auctionId = req.body.auctionId;
  let price = req.body.price;

  if (userId === undefined || auctionId === undefined || price === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  try {
    let valid_query = `
    SELECT
        CASE
            WHEN ? > b.price THEN TRUE
            ELSE FALSE
        END AS bid_valid,
        CASE
            WHEN NOW() > a.date_expired THEN FALSE
            ELSE TRUE
        END AS time_valid
    FROM
        bid AS b
    JOIN
        auction AS a ON a.id = b.auction_id
    WHERE
        b.auction_id = ?
    ORDER BY
        price DESC
    LIMIT 1;
    `

    let [rows, fields] = await pool.query(valid_query, [price, auctionId])

    let timeValid = rows[0].time_valid;
    let bidValid = rows[0].bid_valid;

    if (timeValid === 1 && bidValid === 1) {
        let bid_query = `
        INSERT INTO bid (auction_id, customer_id, timestamp, price)
        VALUES (?, ?, NOW(), ?);
        `

        let [rows, fields] = await pool.query(bid_query, [auctionId, userId, price])
    } else if (timeValid === 0) {
        return res.status(400).send({ message: "Out of time limit" })
    } else if (bidValid === 0) {
        return res.status(400).send({ message: "Bid price is not enough" })
    }

    return res.status(200).send({ message: "success" })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
};

module.exports = {
    makeBid,
};
