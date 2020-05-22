<template>
  <div class="container">
    <div class="col-xs-12">
      <br>

      <b-card bg-variant="success" text-variant="white" header="Welcome" align="left">
        <p>Hello {{this.name}}, this is the second part.</p>
        <p>In this part, you can check the basic information of your current mobile device.</p>

        <li>You can click the <strong>CHECK</strong> button to view the basic information.</li>
        <li>You can click the <strong>READY? GO</strong> button to move to the next part.</li>
      </b-card>
    </div>

    <br>

    <div class="col-xs-12">
      <el-button
        type="primary"
        @click="check"
        round
        style="margin-top: 10px; margin-bottom: 10px"
      >
        CHECK
      </el-button>

    <br>

      <el-button
        type="success"
        @click="login"
        round
        style="margin-top: 10px; margin-bottom: 10px"
      >
        READY? GO
      </el-button>
    </div>
  </div>
</template>

<script>
import store from '../store'
import router from '../router'

export default {
  name: 'welcome',
  data () {
    return {
      name: store.state.user.name
    }
  },

  methods: {
    check () {
      router.push('info')
    },

    login () {
      router.push('index')
    }
  }
}
</script>
