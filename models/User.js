const mongoose = require('mongoose')

// Schema and model of collection sensor
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema, 'user')
