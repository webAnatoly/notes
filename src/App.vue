<template>
  <div id="app">

    <div class="header">
      <h1>Хранитель заметок</h1>
      <Navbar />
    </div>
    <div class="screen-wrapper">
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
    </div>


<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar: Navbar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.screen-wrapper {
  background-color: rgb(245, 245, 220);
  min-height: 90vh;
  border: 1px solid rgb(245, 245, 220);
  border-radius: 10px;
  margin-top: 20px;
}

body {
  background-color: lightblue;
}
</style>
