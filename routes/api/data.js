const io = require('socket.io')
const log = require('../../tools/log')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../tools/keys')
const OriSensorModel = require('../../models/OriSensor')
const MotionSensorModel = require('../../models/MotionSensor')
const UserModel = require('../../models/User')

/**
 * Establish a websocket for sensor data transmission
 * @param {Object} server A HTTP server
 */
function DataSocket (server) {
  const webSocketServer = io(server)

  // Connection establishment
  webSocketServer.on('connection', socket => {
    log(1, 'Sensor Websocket connection success!')

    // Register sensor listener
    // Receive sensor data
    socket.on('motionSensor', data => {
      let sensorInstance = new MotionSensorModel(data)
      sensorInstance.save(err => {
        if (err) {
          log(3, `Error occured when inserting new data into database. Error message: ${err}`)
        } else {
          log(1, `New motion data has been added successfully!`)
        }
      })
    })

    socket.on('oriSensor', data => {
      let sensorInstance = new OriSensorModel(data)
      sensorInstance.save(err => {
        if (err) {
          log(3, `Error occured when inserting new data into database. Error message: ${err}`)
        } else {
          log(1, `New ori data has been added successfully!`)
        }
      })
    })

    socket.on('register', data => {
      UserModel.findOne({ name: data.name }).then(user => {
        if (user) {
          log(1, `Username ${data.name} has been registered already!`)
          socket.emit('res', 0)
        } else {
          const newUser = new UserModel({
            name: data.name,
            email: data.email,
            password: data.password
          })
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash
              newUser.save(err => {
                if (err) {
                  log(3, `Error occured when inserting new user information into database. Error message: ${err}`)
                  socket.emit('res', 1)
                } else {
                  log(1, `${data.name} register complete.`)
                  socket.emit('res', 2)
                }
              })
            })
          })
        }
      })
    })

    socket.on('login', data => {
      UserModel.findOne({ name: data.name }).then(user => {
        if (!user) {
          log(3, `Username ${data.name} has not been registered yet!`)
          socket.emit('token', 0)
        } else {
          bcrypt.compare(data.password, user.password).then(isMatch => {
            if (isMatch) {
              const rule = {
                id: user.id,
                name: user.name,
                email: user.email
              }
              jwt.sign(rule, keys.secretOrKey, { expiresIn: 100 }, (err, token) => {
                if (err) throw err
                socket.emit('token', {
                  success: true,
                  token: 'Bearer ' + token
                })
              })
            } else {
              log(3, `The password is wrong!`)
              socket.emit('token', 1)
            }
          })
        }
      })
    })
  })
}

module.exports = DataSocket
