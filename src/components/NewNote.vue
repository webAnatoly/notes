<template>
  <div class="new-note">

    <div v-if="errors.length" class="new-note-validation">
      <b>Пожалуйста, устраните следующие ошибки:</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>

    <form action="">

      <label for="entry-name">Название заметки</label>
      <input type="text" id="entry-name" v-model="noteTitle">

      <label for="entry-description">Описание заметки</label>
      <textarea name="" id="entry-description" cols="90" rows="30" v-model="noteDescription"></textarea>
      <input type="button" value="Сохранить" v-on:click="save">

    </form>

  </div>
</template>

<script>
export default {
  name: 'NewNote',
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

      console.log(this.noteTitle);
      console.log(this.noteDescription);
    },
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

.new-note-validation {
  padding: 1rem;
  margin: 1rem;
  background-color: rgba(238, 113, 113, 0.5);
  border-radius: 1rem;
}
</style>
