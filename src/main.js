import Vue from 'vue'
import store from './store/index'
import VueRouter from 'vue-router'
import App from './App.vue'
import Authorization from "./components/Authorization.vue";
import NewNote from "./components/NewNote.vue";
import Notes from "./components/Notes.vue";

import {firebaseApp} from "./api/firebase/db";

import "normalize.css/normalize.css";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Notes },
  { path: '/auth', component: Authorization },
  { path: '/add', component: NewNote },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

firebaseApp.auth().onIdTokenChanged(function(user) {

  store.commit({
    type: 'updateUser',
    user: user ? user : null,
  });

  new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
      this.$nextTick(function () {
        // Code that will run only after the entire view has been rendered
        this.$store.commit('appInitFinished');
      })
    }
  }).$mount('#app')

});

