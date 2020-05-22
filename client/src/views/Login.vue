<template>
  <div class="container">
    <div class="front">
      <b-alert :show="!supportMotionSensors" variant="danger">
        <strong>Caution!</strong>
        This device do not support inertial sensors, please open this page on your mobile devices.
      </b-alert>

      <b-card bg-variant="success" text-variant="white" header="Login" align="left">
        <p><strong>This is the first part:</strong></p>

        <li>If you have had personal account already, you can input your username and password to login.</li>
        <li>If you have not had the account yet, you can click the <strong>Go to register</strong> button to create your account.</li>
        <li>After inputting, you can click the <strong>START</strong> button to move to the next part.</li>

        <br>

        <p><strong>NOTICE THAT:</strong></p>
        <li>The username's length is not allowed to be more than <strong>8 characters</strong>.</li>
        <li>The password's length is not allowed to be less than <strong>6 characters</strong>.</li>
      </b-card>

      <br>

      <b-form-input
        id="inputbox1"
        type="text"
        v-model="name"
        :state="nameState"
        @keyup.native="nameInputboxCheck"
        aria-describedby="nameInputFeedback"
        placeholder="Please enter your username."
      >
      </b-form-input>

      <b-form-invalid-feedback id="nameInputFeedback">
        Your username should not be null or more than 8 characters.
      </b-form-invalid-feedback>

      <br>

      <b-form-input
        id="inputbox2"
        type="text"
        v-model="password"
        :state="passwordState"
        @keyup.native="passwordInputboxCheck"
        aria-describedby="passwordInputFeedback"
        placeholder="Please enter your password."
      >
      </b-form-input>

      <b-form-invalid-feedback id="passwordInputFeedback">
        Your password should not be less than 6 characters.
      </b-form-invalid-feedback>
    </div>

    <br>

    <div class="front">
        <el-button
            type="success"
            :disabled="startButtonDisplay"
            @click="login"
            round
            style="margin-top: 10px; margin-bottom: 10px"
        >
            Login
        </el-button>

        <br>

        <el-button
            type="warning"
            @click="goToReg"
            round
            style="margin-top: 10px; margin-bottom: 10px"
        >
            Go to register
        </el-button>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import io from 'socket.io-client'
import router from '../router'
import { config } from '../config/config'

export default {
  name: 'login',
  data () {
    return {
      name: '',
      nameState: null,
      password: '',
      passwordState: null,
      userAgent: null
    }
  },

  created () {
    this.sensorSupportCheck()
    this.socketEstablish()
    this.confirm()
  },

  computed: {
    startButtonDisplay () {
      if (this.nameState === true && this.passwordState === true && this.supportMotionSensors === true) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    sensorSupportCheck () {
      if (navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        this.supportMotionSensors = true
      } else {
        this.supportMotionSensors = false
      }
    },

    socketEstablish () {
      this.socket = io(`${config.server.url}:${config.server.port}`)
    },

    nameInputboxCheck () {
      if (this.name.length <= 8 && this.name.length > 0) {
        this.nameState = true
      } else {
        this.nameState = false
      }
    },

    passwordInputboxCheck () {
      if (this.password.length >= 6) {
        this.passwordState = true
      } else {
        this.passwordState = false
      }
    },

    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    },

    goToReg () {
      this.$confirm('Are you sure to go to register?', 'Alert', {
        cancelButtonText: 'NO',
        confirmButtonText: 'YES',
        type: 'warning'
      }).then(() => {
        router.push('register')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Continue to login.'
        })
      })
    },

    login () {
      this.socket.emit('login', {
        name: this.name,
        email: this.email,
        password: this.password
      })
    },

    clearInputbox () {
      // In browser of phones, using "v-model" sometimes is useless
      // So we adopt the operations in DOM
      document.getElementById('inputbox1').value = ''
      document.getElementById('inputbox2').value = ''
      this.name = ''
      this.password = ''
    },

    confirm () {
      this.socket.on('token', data => {
        if (data === 0) {
          this.$message({
            type: 'error',
            message: 'The username does not exist!'
          })
          this.clearInputbox()
        } else if (data === 1) {
          this.$message({
            type: 'error',
            message: 'The password is wrong!'
          })
        } else {
          this.$message({
            type: 'success',
            message: 'Login successfully!'
          })
          const { token } = data
          localStorage.setItem('eleToken', token)

          // explain the token
          const decode = jwtDecode(token)

          // store the data
          this.$store.dispatch('setIsAutnenticated', !this.isEmpty(decode))
          this.$store.dispatch('setUser', decode)
          router.push('welcome')
        }
      })
    }
  }
}
</script>
