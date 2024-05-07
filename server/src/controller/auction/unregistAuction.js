import pool from "../../config/database"

let unregistAuction = async (req, res) => {
  let userId = req.body.userId
  let auctionId = req.body.auctionId
  
  if (userId === undefined || auctionId === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }

  try {
    let auctionQuery = `
      select status
      from auction
      where id = ?
    `

    let [auction, dump] = await pool.query(auctionQuery, [auctionId])

    if (auction.length === 0) {
      return res.status(404).send({ErrorCode: 'ER_NOT_FOUND'})
    }
    if (auction[0].status !== 'INCOMING') {
      return res.status(400).send({ErrorCode: 'ER_AUCTION_CLOSED'})
    }

    let regist = `
      delete from auction_registration 
      where auction_id = ? and customer_id = ?
    `

    let [result, dump2] = await pool.query(regist, [auctionId, userId])

    return res.status(200).send({message: 'success'})
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER'})
  }
}

module.exports = {
  unregistAuction
}