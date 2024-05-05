import pool from "../../config/database"

let createAuction = async (req, res) => {
  let name = req.body.name
  let hostId = req.body.accountId
  let carId = req.body.carId
  let startTime = req.body.startTime
  let endTime = req.body.endTime
  let bidStep = req.body.bidStep
  let initialPrice = req.body.initialPrice
  let deposit = req.body.deposit

  if (name === undefined || hostId === undefined || carId === undefined || startTime === undefined || endTime === undefined || bidStep === undefined || initialPrice === undefined || deposit === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }

  try {
    let createdTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    console.log(createdTime)

    /* example request body
    {
      "name": "auction 1",
      "hostId": 1,
      "carId": 1,
      "startTime": "2021-08-01 00:00:00",
      "endTime": "2021-08-02 00:00:00",
      "bidStep": 100000,
      "initialPrice": 1000000,
      "deposit": 1000000
    }
    

    */
    return res.status(200).send({data: 'success'})
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER_ERROR'})
  }

}

module.exports = {
  createAuction
}