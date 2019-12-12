<template>
  <div id="app">
    <Uploader/>
    <SignedUrl/>
  </div>
</template>

<script>
import SignedUrl from './components/SignedUrl.vue'
import Uploader from './components/Uploader.vue'

export default {
  name: 'app',
  components: {
    SignedUrl,
    Uploader
  }
}
</script>

<style>
body {
  background: #eee;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* border: 1px solid #ccc; */
  width: 400px;
  padding: 20px;
  margin: 20px auto;
  /* background: white; */
}
</style>
