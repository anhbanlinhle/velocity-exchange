import pool from "../../config/database"

let winner = async (req, res) => {
  let auctionId = req.body.auctionId
  let userId = req.body.userId

  if (auctionId === undefined || userId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" })
  }
  try {
    let query = `
      select * from auction where id = ? and winner_id = ?
    `
    
    let [auctionDetail, dump] = await pool.query(query, [auctionId, userId])

    if (auctionDetail.length === 0) {
      return res.status(200).send({ isWinner: false })
    }
    return res.status(200).send({ isWinner: true })
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: 'ER_INTERNAL_SERVER_ERROR' })
  }
}

module.exports = {
  winner
}