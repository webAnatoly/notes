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
      <path d="M3 16h10l1-11h-12zM10 2v-2h-4v2h-5v3l1-1h12l1 1v-3h-5zM9 2h-2v-1h2v1z"></path>
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
    fill: red;
  }

  svg:hover {
    transform: scale(1.4);
    cursor: pointer;
  }
</style>