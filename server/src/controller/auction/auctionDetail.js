import pool from '../../config/database'

let auctionDetail = async (req, res) => {
  let auctionId = req.body.auctionId

  if (auctionId === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }

  try {
    let query = `select a.*, c.*, max(b.price) as highest_bid
    from auction as a
    join car as c on a.car_id = c.id 
    join bid as b on a.id = b.auction_id
    where a.id = ?
    group by b.auction_id
    `

    let [auctionDetail, dump] = await pool.query(query, [auctionId])

    if (auctionDetail.length === 0) {
      return res.status(404).send({ErrorCode: 'ER_AUCTION_NOT_FOUND'})
    }
    return res.status(200).send(auctionDetail)
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER_ERROR'})
  }

}

module.exports = {
  auctionDetail
}