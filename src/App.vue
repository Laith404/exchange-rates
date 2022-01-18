<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Navbar from "./components/navbar/Navbar.vue"
export default {
  name: 'app',
  components: {Navbar},
  methods: {
    ...mapActions([
            "GET_STORE_API"// подключении к api
        ])
  },
  mounted() {
    this.GET_STORE_API()
  }
}
</script>

<style lang="sass">
*
  padding: 0
  margin: 0
</style>
