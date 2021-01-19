<template>
  <div class="authorization">
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
      signInSuccessUrl: '#/',
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
