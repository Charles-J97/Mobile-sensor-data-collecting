const mongoose = require('mongoose')

// Schema and model of collection sensor
const oriSensorSchema = new mongoose.Schema({
  username: String,
  time: Date,
  sequence: Number,

  data: {
    ori_gamma: Number,
    ori_beta: Number,
    ori_alpha: Number,

    interval: Number
  }
})

module.exports = mongoose.model('OriSensor', oriSensorSchema, 'of2')
