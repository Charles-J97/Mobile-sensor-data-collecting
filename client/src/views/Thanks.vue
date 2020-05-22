<template>
  <div class="container">
    <div class="col-xs-12">
      <br>

      <b-alert show variant="success">
        <h4 class="alert-heading">Well Done!</h4>
        <p>You have completed all required tasks! Thank you again for your cooperation.</p>
        <hr>
        <p class="mb-0">You can exit this application by clicking the
          <strong>Exit</strong> button or click the
          <strong>Re-enter</strong> button to start another round of input.
        </p>
      </b-alert>

      <br>

      <div>
        <el-button type="danger" style="margin-right: 33px" round @click="exit">Exit</el-button>
        <el-button type="success" round @click="retry">Re-enter</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'thanks',
  methods: {
    retry () {
      router.push('index')
    },

    exit () {
      localStorage.removeItem('eleToken')
      router.push('/login')
    }
  }
}
</script>
