import mysql from 'mysql2/promise'
import { config } from 'dotenv'
config()

console.log('Creating connection pool...')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'velocity_exchange',
  dateStrings: true
})

export default pool