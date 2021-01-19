<template>
  <div class="notes">
<!--    <p v-if="notes">Если заметки есть, то будем выводить заметки.-->
<!--      Ну или подключать компонент выводящий заметки.</p>-->
<!--    <p v-else>Создайте свою первую заметку. <router-link to="/add">Создать</router-link></p>-->
    <p>тут будут все заметки заметки</p>
  </div>
</template>

<script>
export default {
  name: "Notes",
}
</script>

<style scoped>
  .notes {
    padding: 3rem;
  }
</style>