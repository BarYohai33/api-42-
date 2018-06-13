const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  'name': {
    'type': String,
    'required': true
  },
  'age': {
    'type': Number,
    'required': true
  },
  'gender': {
    'type': String,
    'required': true
  }
}, {
  collection: 'users',
  versionKey: false
})

module.exports = mongoose.model('User', UserSchema)
