<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layouts/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
