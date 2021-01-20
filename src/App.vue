<template>
  <div id="app">
    <InfoPanel />
    <Overlay v-show="!this.$store.state.isAppInitialized" showMessage="Инициализация..."/>
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
import Overlay from "@/components/Overlay";
import InfoPanel from "@/components/InfoPanel";
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Overlay,
    InfoPanel,
    Navbar: Navbar,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

.screen-wrapper {
  background-color: rgb(245, 245, 220);
  min-height: 90vh;
  border: 1px solid rgb(245, 245, 220);
  border-radius: 10px;
  margin-top: 20px;
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  /* все элементы (включая псевдо элементы всех элементов ::before и ::after)
  будут наследовать свойство box-sizing: border-box; от body */
}

html {
  font-size: 62.5%; /* This defines what 1rem is */

  /* Если для элемента html установить font-size в процентах, то процент берется от шрифта браузера по умолчанию.
  Браузеры по умолчанию ставят шрифт равным 16px, а нам нужен 10px, поэтому 62.5% от 16px это как раз 10px.
  Можно сразу жестко задать 10px, но тогда те пользователи,
  которые в настройках своих браузеров увеличили шрифт по умолчанию, не увидят эффекта увелечения шрифта */

  /* Если бы это свойство использовалось только для шрифтов, то его можно было разместить в папку typograpy,
  но оно лежит тут потому-что по задумке оно используется
  не только для шрифтов, но и для маржинов/паддингов и других размерностей устанавливаемых через rem */
}

/*прибиваем футер к полу*/
body {
  box-sizing: border-box;
  background-color: #78b99b;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.6rem;
}

a,
a:link,
a:visited,
a:hover,
a:active {
  color: #0c5ca0;
  text-decoration: none;
}
.header {
  margin-top: 6rem;
}
</style>
