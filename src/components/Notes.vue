<template>
  <div class="notes">
    <div v-if="!isAuthorized">
      <p>Чтобы просматривать заметки необходимо <router-link to="/auth">авторизироваться</router-link></p>
    </div>
    <Spinner v-else-if="this.$store.state.isGetNotesStarted" color="#78b99b" scale="2" style="margin-top: 11rem"/>
    <div v-else-if="Object.keys(this.$store.state.notes).length > 0" v-for="(val, key) in this.$store.state.notes" :key="key">
      <Note :title="val.title" :description="val.description" :creation-timestamp="val.creationTimestamp" :documentId="key"/>
    </div>
    <div v-else>
      Не удалось получить заметки. Возможные причины:
      <ul>
        <li>Вы не создали ни одной заметки;</li>
        <li>Пропал интернет;</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import Note from "@/components/Note";

export default {
  name: "Notes",
  components: {
    Spinner,
    Note,
  },
  beforeCreate() {
    if (this.$store.state.user) {
      this.$store.commit('startGetNotes');
      this.$store.dispatch('fetchNotes');
    }
  },
  computed: {
    isAuthorized: function() {
      return !!this.$store.state.user;
    },
  }
}
</script>

<style scoped>
  .notes {
    padding: 3rem;
  }
  .note {
    margin-bottom: 3rem;
  }
</style>