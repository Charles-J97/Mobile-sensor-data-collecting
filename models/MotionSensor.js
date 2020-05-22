const mongoose = require('mongoose')

// Schema and model of collection sensor
const motionSensorSchema = new mongoose.Schema({
  username: String,
  time: Date,
  sequence: Number,

  data: {
    acc_x: Number,
    acc_y: Number,
    acc_z: Number,

    gacc_x: Number,
    gacc_y: Number,
    gacc_z: Number,

    rot_alpha: Number,
    rot_beta: Number,
    rot_gamma: Number,

    interval: Number
  }
})

module.exports = mongoose.model('MotionSensor', motionSensorSchema, 'mf2')
