import express from 'express'
import session from 'express-session'
import initWebRoute from '../route/web.js'

import { config } from 'dotenv'
config()

const app = express()
const port = process.env.PORT || 1111
const cors = require("cors")

app.use(cors({ 
  credentials: true, 
  origin: true
}))

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(express.urlencoded({ 
  extended: true 
}))

app.use(express.json())

initWebRoute(app)

app.listen(port, () => {
  console.log(`\nApp running at:`)
  console.log("\t\t\x1b[4m",`localhost:${port}`, "\x1b[0m")
})