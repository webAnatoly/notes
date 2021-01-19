<template>
  <div class="info-panel">
    <span v-if="this.$store.state.user">вы вошли как: <b>{{this.$store.state.user.displayName}}</b></span>
    <span v-if="this.$store.state.user">ваш емейл: <b>{{this.$store.state.user.email}}</b></span>
    <span v-if="!this.$store.state.user">вы не <router-link to="/auth">авторизированы</router-link></span>
  </div>
</template>

<script>
export default {
name: "InfoPanel"
}
</script>

<style scoped>
  .info-panel {
    min-height: 3rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: .5rem;
    font-family: monospace;
    text-align: left;
  }
  .info-panel > span:not(:last-child) {
    margin-right: 2rem;
  }
  .info-panel a {
    color: ;
  }
</style>