const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const routes = require('./routes')
const app = express()
const UserModel = require('./models/UserModel')
const {requestServerError} = require('./utils')

const config = {
  mongodb:{isConnected:false}
}
const mongooseConnect = () => {
  mongoose.connect('mongodb://localhost:3032/api42')
  .catch(err => {
    setTimeout(() => {
      mongooseConnect()
    }, 1000)
  })
}

mongoose.connection.on('connected', () => {
  config.mongodb.isConnected = true
})

mongoose.connection.on('disconnected', () => {
  config.mongodb.isConnected = false
})

mongooseConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(helmet())

app.use((req, res, next) => {
  if (config.mongodb.isConnected) {
    return next()
  } else {
    return requestServerError(req, res)
  }
})

app.disable('x-powered-by')

routes.config(app)

app.listen(3008, () => {
  console.log('listening on 3008')
})

module.exports = app
