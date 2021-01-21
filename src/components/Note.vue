<template>
  <div class="note">
    <div class="note-header">
      <div class="note-header__left-container">
        <p>дата создания: <b>{{ getCreationDate }}</b></p>
      </div>
      <div class="note-header__right-container">
        <p>прошло с момента создания: <b>в разработке</b></p>
      </div>
    </div>
    <div class="note-title">
      {{ title }}
    </div>
    <div class="note-body">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    title: String,
    description: String,
    creationTimestamp: Number,
  },
  computed: {
    getCreationDate: function () {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return (new Date(this.creationTimestamp)).toLocaleDateString('ru', options);
    }
  }
}
</script>

<style scoped>
  .note {
    width: 100%;
    min-height: 5rem;
    border-radius: 5px;
    background-color: #D9EAD9;
    padding: 10px;
  }

  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    font-size: 1.4rem;
    font-family: monospace;
    font-style: italic;
  }

  .note-header > div {
    min-width: 200px;
  }

  .note-header__left-container {
    display: flex;
    justify-content: flex-start;
  }

  .note-header__right-container {
    display: flex;
    justify-content: flex-end;
  }

  .note-title {
    font-size: 2rem;
    font-weight: bold;
    padding: 4px 0 10px 0;
  }
  .note-body {
    /*padding: 1rem;*/
    text-align: left;
  }
</style>