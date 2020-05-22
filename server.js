const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const db = require('./tools/keys').mongoURI
const portNum = require('./tools/keys').serverPort
const log = require('./tools/log')
const dataRoute = require('./routes/api/data')

const port = process.env.PORT || portNum // set the port

// connect the database
mongoose.connect(db, { useNewUrlParser: true }, error => {
  if (error) {
    log(3, `Database connection error! ${error}`)
  } else {
    log(1, `Database connection success!`)
  }
})

// set access across domains
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// using body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// passport initializing
app.use(passport.initialize())
require('./tools/passport')(passport)

// Register routing events
let server = app.listen(port, () => {
  dataRoute(server)
})

log(4, `Server is starting at port ${port}`)
