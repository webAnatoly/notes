<template>
  <div class="overlay">
    <div v-if="showLoader" class="overlay__loader">
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else-if="showMessage" class="overlay__loader">{{ showMessage }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Overlay",
  props: {
    showLoader: {
      type: Boolean,
      default: false,
    },
    showMessage: {
      type: String,
      default: null,
    },
  }
}
</script>

<style scoped>
  body .overlay {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 9999;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }

  .overlay__loader {
    opacity: 0;
    font-size: 3rem;
    animation: animation-overlay__loader 2s infinite;
    color: whitesmoke;
  }

  @keyframes animation-overlay__loader {
    0%   {opacity: 0.1;}
    50%   {opacity: 1;}
    100% {opacity: 0.1;}
  }
</style>