<template>
  <div class="container">
    <div class="front">
      <b-alert :show="!supportMotionSensors" variant="danger">
        <strong>Caution!</strong>
        This device do not support inertial sensors, please open this page on your mobile devices.
      </b-alert>

      <b-card bg-variant="success" text-variant="white" header="Register" align="left">
        <p>In this part, you can create your own account.</p>

        <li>Please enter your username in the first input area below which is used to distinguish different users.</li>
        <li>Please enter your email address in the second input area below.</li>
        <li>Please enter your password in the third input area below.</li>
        <li>Please confirm your password in the fourth input area below.</li>
        <li>Once you have finished inputting the username, you can click the <strong>FINISH</strong> button to save your username.</li>
        <li>Then, you can click the <strong>START</strong> button to move to the next page.</li>

        <br>

        <strong>NOTICE THAT:</strong>

        <li>The username's length is not allowed to be more than <strong>8 characters</strong>.</li>
        <li>The password's length is not allowed to be less than <strong>6 characters</strong>.</li>
      </b-card>

      <br>

      <b-form-input
        type="text"
        v-model="name"
        :state="nameState"
        @keyup.native="nameInputboxCheck"
        aria-describedby="nameInputFeedback"
        placeholder="Please enter your username."
      >
      </b-form-input>

      <b-form-invalid-feedback id="nameInputFeedback">
        Your username should not be null or more than 8 characters!
      </b-form-invalid-feedback>

      <br>

      <b-form-input
        type="text"
        v-model="email"
        :state="emailState"
        @keyup.native="emailInputboxCheck"
        aria-describedby="emailInputFeedback"
        placeholder="Please enter your email."
      >
      </b-form-input>

      <b-form-invalid-feedback id="emailInputFeedback">
        Please input the email with correct format!
      </b-form-invalid-feedback>

      <br>

      <b-form-input
        type="text"
        v-model="password"
        :state="passwordState"
        @keyup.native="passwordInputboxCheck"
        aria-describedby="passwordInputFeedback"
        placeholder="Please enter your password."
      >
      </b-form-input>

      <b-form-invalid-feedback id="passwordInputFeedback">
        Your password should not be less than 6 characters!
      </b-form-invalid-feedback>

      <br>

      <b-form-input
        type="text"
        v-model="re_pw"
        :state="re_pwState"
        @keyup.native="re_pwInputboxCheck"
        aria-describedby="re_pwInputFeedback"
        placeholder="Please confirm your password."
      >
      </b-form-input>

      <b-form-invalid-feedback id="re_pwInputFeedback">
        The confirm passeord should be consistent with your password!
      </b-form-invalid-feedback>
    </div>

    <br>

    <div class="front">
        <el-button
            type="success"
            :disabled="startButtonDisplay"
            @click="start"
            round
            style="margin-top: 10px; margin-bottom: 10px"
        >
            Register
        </el-button>

        <br>

        <el-button
            type="warning"
            @click="goToLogin"
            round
            style="margin-top: 10px; margin-bottom: 10px"
        >
            Go to login
        </el-button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import router from '../router'
import { config } from '../config/config'

export default {
  name: 'register',
  data () {
    return {
      name: '',
      nameState: null,
      password: '',
      passwordState: null,
      re_pw: '',
      re_pwState: null,
      email: '',
      emailState: null,
      userAgent: null
    }
  },

  created () {
    this.sensorSupportCheck()
    this.socketEstablish()
    this.listen()
  },

  computed: {
    startButtonDisplay () {
      if (this.nameState === true && this.passwordState === true && this.emailState === true && this.re_pwState === true && this.supportMotionSensors === true) {
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

    re_pwInputboxCheck () {
      if (this.re_pw === this.password) {
        this.re_pwState = true
      } else {
        this.re_pwState = false
      }
    },

    emailInputboxCheck () {
      if (this.email.endsWith('@qq.com') ||
          this.email.endsWith('@gmail.com') ||
          this.email.endsWith('@msn.com') ||
          this.email.endsWith('@aol.com') ||
          this.email.endsWith('@aim.com') ||
          this.email.endsWith('@mail.com') ||
          this.email.endsWith('@walla.com') ||
          this.email.endsWith('@inbox.com') ||
          this.email.endsWith('@163.com') ||
          this.email.endsWith('@126.com') ||
          this.email.endsWith('@56.com') ||
          this.email.endsWith('@cina.com') ||
          this.email.endsWith('@21cn.com') ||
          this.email.endsWith('@sohu.com') ||
          this.email.endsWith('@etang.com') ||
          this.email.endsWith('@eyou.com') ||
          this.email.endsWith('@chinaren.com') ||
          this.email.endsWith('@citiz.com') ||
          this.email.endsWith('@sogou.com') ||
          this.email.endsWith('@tom.com') ||
          this.email.endsWith('@outlook.com') ||
          this.email.endsWith('@yahoo.com') ||
          this.email.endsWith('@hotmail.com')) {
        this.emailState = true
      } else {
        this.emailState = false
      }
    },

    start () {
      this.$confirm('Are you sure to register?', 'Alert', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        this.socket.emit('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Registration is cancelled!'
        })
      })
    },

    goToLogin () {
      this.$confirm('Are you sure to cancel registration and go to login?', 'Alert', {
        cancelButtonText: 'NO',
        confirmButtonText: 'YES',
        type: 'warning'
      }).then(() => {
        router.push('login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Continue to register.'
        })
      })
    },

    listen () {
      this.socket.on('res', data => {
        if (data === 0) {
          this.$message({
            type: 'error',
            message: 'The username exists. Please go to login directly!'
          })
          router.push('login')
        } else if (data === 1) {
          this.$message({
            type: 'error',
            message: 'There are some problems. Please register again!'
          })
        } else if (data === 2) {
          this.$message({
            type: 'success',
            message: 'Register successfully!'
          })
          router.push('login')
        }
      })
    }
  }
}
</script>
