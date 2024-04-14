import crypto from 'crypto'
import pool from '../../config/database'

let signUp = async (req, res) => {
  let email = req.body.email
  let password = crypto.createHash('sha256').update(req.body.password).digest('hex')
  let username = req.body.username
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let dob = req.body.dob
  let phone_num = req.body.phone_num

  if (email === undefined || password === undefined || username === undefined || first_name === undefined || last_name === undefined || dob === undefined || phone_num === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }

  try {
    let [mailCheck, dump1] = await pool.query('select * from account where mail = ?', [email])
    if (mailCheck.length > 0) {
      console.log(mailCheck);
      return res.status(409).send({ErrorCode: 'ER_EMAIL_ALREADY_REGISTERED'})
    }

    let [usernameCheck, dump2] = await pool.query('select * from account where username = ?', [username])
    if (usernameCheck.length > 0) {
      return res.status(409).send({ErrorCode: 'ER_USERNAME_ALREADY_REGISTERED'})
    }

    let query = 'insert into account (mail, password, username, first_name, last_name, dob, phone_num, is_admin) values (?, ?, ?, ?, ?, ?, ?, ?)'

    await pool.query(query, [email, password, username, first_name, last_name, dob, phone_num, 0])

    return res.status(201).send({message: 'Account created'})
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER_ERROR'})
  }
}

module.exports = {
  signUp
}