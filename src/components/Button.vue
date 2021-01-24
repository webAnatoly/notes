<template>
  <button v-on:click="onClick" v-bind:style="mergedStyles">
    <slot>Кнопка</slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    styles: Object,
    onClick: {
      type: Function,
      default: () => {},
      require: true,
    }
  },
  computed: {
    mergedStyles: function() { /* Сливаем стили по-умолчанию со стилями из пропсов */
      return Object.assign({
        borderRadius: '4px',
        backgroundColor: 'lightblue',
        color: 'inherit',
        padding: '5px',
        border: 'none',
        boxShadow: 'rgba(0,0,0,0.1)',
        fontSize: '1.4rem',
      }, this.styles);
    }
  },
}
</script>

<style scoped>
  /* стили для кнопки прописаны в computed свойстве mergedStyles */
</style>