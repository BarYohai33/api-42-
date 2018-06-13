const {requestNotFound} = require('./utils')
const user = require('./controllers/user')
const users = require('./controllers/users')

exports.config = (app) => {
  app.use('/user', user)
  app.use('/users', users)
  app.use('*', requestNotFound)
}
