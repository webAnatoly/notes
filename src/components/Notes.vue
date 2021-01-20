<template>
  <div class="notes">
    <Spinner v-if="this.$store.state.isGetNotesStarted" color="#78b99b" scale="2" style="margin-top: 11rem"/>
    <div v-else>
      Тут будут заметки
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";

export default {
  name: "Notes",
  components: {
    Spinner,
  },
  beforeCreate() {
    if (!this.$store.state.user) {
      this.$router.push('auth');
    }
    this.$store.commit('startGetNotes');
    // this.$store.dispatch('fetchNotes');
  }
}
</script>

<style scoped>
  .notes {
    padding: 3rem;
  }
</style>