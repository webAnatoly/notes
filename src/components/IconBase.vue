<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       viewBox="0 0 18 18"
       :aria-labelledby="iconName"
       role="presentation"
  >
    <title
        :lang="iconLang"
    >{{ iconName }}</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: "IconBase",
  props: {
    iconName: {
      type: String,
      default: 'svg icon'
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    iconLang: {
      type: String,
      default: "en",
    }
  }
}
</script>

<style scoped>

</style>