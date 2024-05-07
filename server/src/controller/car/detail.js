import pool from "../../config/database"

let detail = async (req, res) => {
  let carId = req.body.carId

  if (carId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" })
  }
  try {
    let query = `
    select c.*, v.status from car as c
    join verification_request as v on v.car_id = c.id
    where c.id = ?
    `

    let [rows, fields] = await pool.query(query, [carId])

    return res.status(200).send({ data: rows[0] })
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ ErrorCode: 'ER_INTERNAL_SERVER_ERROR' })
  }
}

module.exports = {
  detail
}