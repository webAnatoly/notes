<template>
  <div class="info-panel" ref="infoPanel">
    <span v-if="isAuthorized">вы вошли как: <b>{{displayName}}</b></span>
    <span v-if="this.$store.state.user">ваш емейл: <b>{{email}}</b></span>
    <span v-if="!isAuthorized">вы не <router-link to="/auth">авторизированы</router-link></span>
  </div>
</template>

<script>
export default {
  name: "InfoPanel",
  computed: {
    isAuthorized: function() {
      return !!this.$store.state.user;
    },
    email: function() {
      if (this.$store.state.user !== null) {
        return this.$store.state.user.displayName;
      }
      return '';
    },
    displayName: function() {
      if (this.$store.state.user !== null) {
        return this.$store.state.user.displayName;
      }
      return '';
    }
  },
  mounted: function() {
    // Определить высоту компонента и записать в store
    const infoPanelHeight = this.$refs.infoPanel.offsetHeight;
    this.$store.commit('writeInfoPanelHeight', infoPanelHeight)
  }
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
    position: fixed;
    background-color: #78b99b; /* такого же цвета как и body */
    width: 100%;
    box-shadow: 1px 2px 7px 1px rgba(0,0,0,0.1);
  }
  .info-panel > span:not(:last-child) {
    margin-right: 2rem;
  }
</style>