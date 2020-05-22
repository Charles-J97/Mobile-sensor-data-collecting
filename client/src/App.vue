<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'app',
  created () {
    if (localStorage.eleToken) {
      const decode = jwtDecode(localStorage.eleToken)
      this.$store.dispatch('setIsAutnenticated', !this.isEmpty(decode))
      this.$store.dispatch('setUser', decode)
    }
  },
  methods: {
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
