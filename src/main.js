import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Authorization from "./components/Authorization.vue";
import NewNote from "./components/NewNote.vue";
import Notes from "./components/Notes.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Notes },
  { path: '/home', component: Notes },
  { path: '/auth', component: Authorization },
  { path: '/add', component: NewNote },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
