import pool from "../../config/database"

let approvalRequest = async (req, res) => {
  let requestId = req.body.requestId
  let adminId = req.body.adminId
  let status = req.body.status

  if (requestId === undefined || adminId === undefined || status === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" })
  }
  if (status !== 'APPROVED' || status !== 'REJECTED') {
    return res.status(400).send({ ErrorCode: 'ER_INVALID_STATUS' })
  }

  try {
    let requestStatus = `
    select status from verification_request where id = ?
    `
    let [rows1, dump1] = await pool.query(requestStatus, [requestId])

    if (rows1[0].status !== 'PENDING') {
      return res.status(400).send({ ErrorCode: 'ER_REQUEST_PROCESSED' })
    }

    let query = `
    update verification_request 
    set status = ?, time = NOW(), adminId = ? 
    where id = ?
    `

    let [rows, fields] = await pool.query(query, [status, adminId, requestId])

    return res.status(200).send({message: 'success'})
  } catch (err) {
    return res.status(500).send({ ErrorCode: err.code, ErrorNo: err.errno })
  }
}

module.exports = {
  approvalRequest
}