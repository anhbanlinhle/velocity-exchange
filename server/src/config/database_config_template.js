import mysql from 'mysql2/promise'

console.log('Creating connection pool...')

// Fill in your MySQL connection information
// REMOVE password if you don't have one
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'velocity_exchange',
  dateStrings: true
})

export default pool