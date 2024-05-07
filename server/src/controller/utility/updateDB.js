import pool from "../../config/database"

let updateDB = async (req, res, next) => {
  console.log('Updating database...')
  next()
}

module.exports = {
  updateDB
}