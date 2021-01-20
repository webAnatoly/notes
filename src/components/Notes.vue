<template>
  <div class="notes">
    <div>
      Тут будут заметки
    </div>
  </div>
</template>

<script>
export default {
  name: "Notes",
  beforeCreate() {
    if (!this.$store.state.user) {
      this.$router.push('auth');
    }
  }
}
</script>

<style scoped>
  .notes {
    padding: 3rem;
  }
</style>