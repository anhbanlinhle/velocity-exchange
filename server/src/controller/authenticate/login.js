import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import pool from '../../config/database'

let login = async (req, res) => {
  let email = req.body.email
  let password = req.body.password

  if (email === undefined || password === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }

  try {
    password = crypto.createHash('sha256').update(password).digest('hex')

    let [account, dump] = await pool.query('select * from account where mail = ? and password = ?', [email, password])
    if (account.length === 0) {
      return res.status(403).send({ErrorCode: 'ER_INVALID_CREDENTIAL'})
    }

    req.session.email = email
    req.session.userid = account[0].id
    req.session.authority = account[0].is_admin
    
    const payload = {
      email: req.session.email,
      id: req.session.userid,
      authority: req.session.authority
    }
    const authToken = jwt.sign(payload, process.env.SECRET, {expiresIn: '240h'})
    req.session.token = authToken
    console.log('\t\t\x1b[4mLogin succeeded\x1b[0m')

    res.status(200).send({token: authToken, id: account[0].id})
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: 'ER_INTERNAL_SERVER_ERROR'})
  }
}

module.exports = {
  login
}