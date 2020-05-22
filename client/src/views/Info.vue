<template>
  <div class="container">
    <div class="col-xs-12">
      <br>
      <b-card bg-variant="success" text-variant="white" header="Excited?" align="left">
        <strong>Hello {{this.name}}, here is your mobile phone's configuration:</strong>
      </b-card>
      <b-card bg-variant="primary" text-variant="white" header="Information!" align="left">
        <strong>Device:</strong>
          <li>Device model: {{this.devicemodel}}</li>
          <li>Device type: {{this.devicetype}}</li>
          <li>Device manufacturer: {{this.devicevender}}</li>
        <br>
        <strong>Operating System:</strong>
          <li>OS name: {{this.osname}}</li>
          <li>OS version: {{this.osversion}}</li>
        <br>
        <strong>Browser:</strong>
          <li>Broswer name: {{this.browsername}}</li>
          <li>Browser version: {{this.browserversion}}</li>
        <br>
        <strong>Engine:</strong>
          <li>Engine name: {{this.enginename}}</li>
          <li>Engine version: {{this.engineversion}}</li>
      </b-card>
    </div>

    <br>

    <div class="col-xs-12">
      <el-button
        type="primary"
        @click="back"
        round
        style="margin-top: 10px; margin-bottom: 10px"
      >
        BACK
      </el-button>
    </div>
  </div>
</template>

<script>
import store from '../store'
import router from '../router'
const UA = require('ua-device')
const ua = UA(navigator.userAgent)

export default {
  name: 'info',
  methods: {
    back () {
      router.push('welcome')
    }
  },
  data () {
    return {
      name: store.state.user.name,
      devicemodel: ua.device.model,
      devicetype: ua.device.type,
      devicevender: ua.device.manufacturer,
      osname: ua.os.name,
      osversion: ua.os.version,
      browsername: ua.browser.name,
      browserversion: ua.browser.version,
      enginename: ua.engine.name,
      engineversion: ua.engine.version
    }
  }
}
</script>
