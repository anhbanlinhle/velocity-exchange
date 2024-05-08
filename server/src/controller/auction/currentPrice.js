import pool from "../../config/database";

let currentPrice = async (req, res) => {
  let auctionId = req.body.auctionId;

  if (auctionId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  try {
    let query = `
    select max(price) as currentPrice from bid
    where auction_id = ?
    `
    let [rows, dump] = await pool.query(query, auctionId)
    return res.status(200).send({ data : rows[0] })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
};

module.exports = {
    currentPrice,
};
