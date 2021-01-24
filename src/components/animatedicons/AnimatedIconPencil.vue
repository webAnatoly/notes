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
    <g :fill="iconColor" class="animated-icon">
      <path d="M6 10l2-1 7-7-1-1-7 7-1 2zM4.52 13.548c-0.494-1.043-1.026-1.574-2.069-2.069l1.548-4.262 2-1.217 6-6h-3l-6 6-3 10 10-3 6-6v-3l-6 6-1.217 2z"></path>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'svg icon'
    },
    width: {
      type: [Number, String],
      default: 14
    },
    height: {
      type: [Number, String],
      default: 14
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    iconLang: {
      type: String,
      default: "ru",
    }
  }
}
</script>

<style scoped>
  svg {
    transition: transform .3s;
  }

  svg:hover .animated-icon {
    fill: black;
  }

  svg:hover {
    transform: scale(1.4);
    cursor: pointer;
  }

</style>