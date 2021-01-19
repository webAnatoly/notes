<template>
  <div>
    <div>
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <router-link to="/">Все заметки</router-link>
      <router-link to="/add">Добавить заметку</router-link>
      <router-link to="/auth">{{ msg }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    msg () {
      return this.$store.state.user ? "Выйти" : "Войти"
    }
  },
}
</script>

<style scoped>
  div {
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    color: #013501;
    text-decoration: none;
  }

  a {
    padding: 15px 25px 15px 25px;
    background-color: beige;
    border-radius: 5px;
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  }
  a:not(:last-child) {
    margin-right: 55px;
  }
</style>