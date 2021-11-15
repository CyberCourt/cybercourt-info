<template>
  <div id="app">
    <header-bar></header-bar>

    <router-view/>

<!--    <footer-bar></footer-bar>-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: 'App',
  components: {
    'header-bar': HeaderBar,
    'footer-bar': FooterBar
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions(['init'])
  }
}
</script>
<style>
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}

#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
