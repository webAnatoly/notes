<template>
  <div class="new-note">

    <div v-if="this.$store.state.isSavingNoteStarted">
      <Overlay show-message="Сохраняем..."/>
    </div>

    <div v-if="errors.length" class="new-note-error">
      <b>Пожалуйста, устраните следующие ошибки:</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <div v-else-if="this.$store.state.isSavingNoteError" class="new-note-error">
      <p>{{this.$store.state.isSavingNoteError}}</p>
    </div>
    <div v-else-if="this.$store.state.isSavingNoteSuccess" class="new-note-success">
      <p>{{this.$store.state.isSavingNoteSuccess}}</p>
    </div>

    <form action="" v-if="this.$store.state.user">

      <label for="entry-name">Название заметки</label>
      <input type="text" id="entry-name" v-model="noteTitle">

      <label for="entry-description">Описание заметки</label>
      <textarea name="" id="entry-description" cols="90" rows="20" v-model="noteDescription"></textarea>
      <input type="button" value="Сохранить" v-on:click="save">

    </form>
    <div v-else>
      <p>Чтобы добавлять заметки необходимо <router-link to="/auth">авторизироваться</router-link></p>
    </div>

  </div>
</template>

<script>
import Overlay from "@/components/Overlay";

export default {
  name: 'NewNote',
  components: {
    Overlay,
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      errors: [],
      noteTitle: null,
      noteDescription: null,
    };
  },
  methods: {
    save: function() {

      // валидация
      this.errors = [];

      if (!this.noteTitle) {
        this.errors.push('Отсутсвует заголовок');
      }
      if (!this.noteDescription) {
        this.errors.push('Заметка не может быть пустой');
      }

      if (!this.errors.length) {
        this.$store.dispatch('saveNote', {title: this.noteTitle, description: this.noteDescription});
      }
    },
  },
  beforeMount() {
    this.$store.commit('resetSavingNoteState');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-note {
  padding: 3rem;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

textarea {
  padding: 1rem;
}

.new-note-error {
  padding: 1rem;
  margin: 1rem;
  background-color: rgba(238, 113, 113, 0.5);
  border-radius: 1rem;
}

.new-note-success {
  padding: 1rem;
  margin: 1rem;
  background-color: #C9EAC8;
  border-radius: 1rem;
}
</style>
