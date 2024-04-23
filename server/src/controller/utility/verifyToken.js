import jwt from 'jsonwebtoken'

let verifyToken = (req, res, next) => {
  const token = req.get('Authorization') || req.session.token;
  if (!token) {
    return res.status(401).send({ErrorCode: "ER_MISSING_TOKEN"})
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET)
    if (!req.session.userid || !req.session.email) {
      req.session.userid = verified.id
      req.session.email = verified.email
      req.session.authority = verified.authority
      req.session.token = token
      req.user = verified
    }
    next()
  }
  catch (err) {
    console.log(err)
    return res.status(401).send({ErrorCode: "ER_INVALID_TOKEN"})
  }
}

module.exports = {
  verifyToken
}