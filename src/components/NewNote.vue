<template>
  <div class="new-note">
    <form action="">

      <label for="entry-name">Название заметки</label>
      <input type="text" id="entry-name">

      <label for="entry-description">Описание заметки</label>
      <textarea name="" id="entry-description" cols="90" rows="30"></textarea>
      <input type="button" value="Сохранить">

    </form>

  </div>
</template>

<script>
export default {
  name: 'NewNote',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-note {
  padding: 3rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
</style>
