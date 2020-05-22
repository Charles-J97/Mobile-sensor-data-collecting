<template>
  <div class="container">
    <div class="front">
      <b-alert :show="!supportMotionSensors" variant="danger">
        <strong>Caution!</strong>
        This device do not support inertial sensors, please open this page on your mobile devices.
      </b-alert>

      <b-card bg-variant="success" text-variant="white" header="Instructions" align="left">
        <p>Thanks for your cooperation to help us collect the sensor data of mobile devices.</p>
        <p>To help you understand how to finish the whole task efficiently, there are some instructions in every page.</p>
        <p>Please notice that: all tasks should be finished with mobile devices. Any personal computers are not allowed to use. Thanks for your cooperation.</p>
      </b-card>
    </div>

    <div class="front">
        <el-button
            type="success"
            :disabled="startButtonDisplay"
            @click="goAhead"
            round
            style="margin-top: 10px; margin-bottom: 10px"
        >
            Go Ahead
        </el-button>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'initial',
  data () {
    return {
      userAgent: null
    }
  },

  created () {
    this.sensorSupportCheck()
  },

  computed: {
    startButtonDisplay () {
      if (this.supportMotionSensors === true) {
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

    goAhead () {
      router.push('login')
    }
  }
}
</script>
