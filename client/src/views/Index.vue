<template>
  <div class="index">
    <div class="col-xs-12">
      <br>

      <b-card bg-variant="success" text-variant="white" header="Just do it!" align="left">
        <p>Hello {{this.name}}, this is the third part.</p>
        <p>In this part, you have to input these pins.</p>

        <li>There are {{this.count}} pins totally. Each pin's length is 4 characters.</li>
        <li>The OVERALL PROGRESS will display your current progress.</li>
        <li>Once finishing, you will move to the next part automatically.</li>
        <li>If you do not want to input all the pins, you can click the <strong>Stop input</strong> button to move to the next part.</li>
      </b-card>

      <br>

      <b-card
        border-variant="primary"
        header-bg-variant="success"
        header-text-variant="white"
        align="center"
      >
        <div>
          <strong>OVERALL PROGRESS</strong>
          <b-progress variant="success" striped="striped" :animated="true" :max="count" height="25px">
            <b-progress-bar :value="progress">
              <strong>{{ progress }} / {{ count }}</strong>
            </b-progress-bar>
          </b-progress>
        </div>

        <br>

        <strong>PLEASE ENTER PINS</strong>
        <div>
          <b-input-group size="lg" :prepend="pins">
            <b-form-input
              id="inputbox"
              type="tel"
              @focus.native="inputboxOnFocus"
              @blur.native="inputboxOnBlur"
              @keyup.native="inputboxOnKeyup"
              v-model="inputboxContent"
            >
            </b-form-input>
          </b-input-group>
        </div>

      </b-card>

      <br>

      <div class="front">
        <el-button
            type="warning"
            @click="Continue"
            round
            style="margin-top: 10px; margin-bottom: 10px"
        >
            Stop input
        </el-button>
    </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import router from '../router'
import store from '../store'
import { config } from '../config/config'

export default {
  name: 'index',
  data () {
    return {
      name: store.state.user.name,
      pins: 6738,
      sequence: 201,
      socket: null,
      inputboxClear: '',
      inputboxContent: '',
      count: 200,
      progress: 0
    }
  },

  created () {
    this.setBasicInformation()
    this.socketEstablish()
  },

  methods: {

    setBasicInformation () {
      this.pins = this.randomNum(1000, 9999)
    },

    inputboxOnKeyup () {
      if (this.inputboxContent.length === 4) {
        this.removeSensorListener()
        this.progress++
        this.sequence++
        this.pins = this.randomNum(1000, 9999)
        setTimeout(() => {
          this.clearInputbox()
        }, 100)
        if (this.progress === this.count) {
          this.sendSuccessMessage()
        } else {
          this.addSensorListener()
        }
      }
    },

    randomNum (minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        default:
          return 0
      }
    },

    clearInputbox () {
      // In browser of phones, using "v-model" sometimes is useless
      // So we adopt the operations in DOM
      document.getElementById('inputbox').value = ''
      this.inputboxContent = ''
    },

    socketEstablish () {
      this.socket = io(`${config.server.url}:${config.server.port}`)
    },

    inputboxOnFocus () {
      this.addSensorListener()
    },

    inputboxOnBlur () {
      this.removeSensorListener()
    },

    addSensorListener () {
      window.addEventListener('devicemotion', this.motionHandler)
      window.addEventListener('deviceorientation', this.orientationHandler)
    },

    removeSensorListener () {
      window.removeEventListener('devicemotion', this.motionHandler)
      window.removeEventListener('deviceorientation', this.orientationHandler)
    },

    motionHandler (event) {
      let acc = event.acceleration
      let gac = event.accelerationIncludingGravity
      let rot = event.rotationRate
      let itv = event.interval

      let dataPackage = {
        'acc_x': acc.x,
        'acc_y': acc.y,
        'acc_z': acc.z,
        'gacc_x': gac.x,
        'gacc_y': gac.y,
        'gacc_z': gac.z,
        'rot_alpha': rot.alpha,
        'rot_beta': rot.beta,
        'rot_gamma': rot.gamma,
        'interval': itv
      }
      this.motionDataDeliver(dataPackage)
    },

    orientationHandler (event) {
      let dataPackage = {
        'ori_gamma': event.gamma,
        'ori_beta': event.beta,
        'ori_alpha': event.alpha,
        'interval': event.interval
      }
      this.oriDataDeliver(dataPackage)
    },

    motionDataDeliver (data) {
      this.socket.emit('motionSensor', {
        'username': this.name,
        'time': new Date(),
        'sequence': this.sequence,
        'data': data
      })
    },

    oriDataDeliver (data) {
      this.socket.emit('oriSensor', {
        'username': this.name,
        'time': new Date(),
        'sequence': this.sequence,
        'data': data
      })
    },

    Continue () {
      this.progress = 0
      this.removeSensorListener()
      this.$confirm('Are you sure to stop input and move to the next part?', 'Alert', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        router.push('thanks')
        this.$message({
          type: 'warning',
          message: 'Input is cancelled.'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Please continue to input pins.'
        })
      })
    },

    sendSuccessMessage () {
      this.progress = 0
      this.removeSensorListener()
      this.$message({
        type: 'success',
        message: 'Finish inputting successfully!'
      })
      router.push('thanks')
    }
  }
}
</script>
