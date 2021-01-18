<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
      Страница авторизации и регистрации
    </p>
    <p>
      Авторизирован или нет? Состояние берется из глобального Vuex store <b>{{ this.$store.state.isAuthorized }}</b>
    </p>
    <h1 v-if="this.$store.state.isAuthorized">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase';
import * as firebaseui from "firebaseui/dist/npm__ru";
import "firebaseui/dist/firebaseui.css";

export default {
  name: 'Auth',
  props: {
    msg: String
  },
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '#/home',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          // this.$emit('updateAuthResult', authResult)
          // this.foo = 'bar'
          console.log(authResult)
          return true
        }
      }
      // Other config options...
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
