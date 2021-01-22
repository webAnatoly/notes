<template>
  <div class="authorization">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
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

    // Если авторизированный пользователь в браузере наберет путь /auth то он разлогинится
    if (this.$store.state.user) {
      // logout
      firebase.auth().signOut().then(() => {
        window.location.reload();
      })
    } else {
      // запуск формы авторизации
      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '#/',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Other config options...
      });
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.authorization {
  padding: 3rem;
  word-wrap: break-word;
}
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
