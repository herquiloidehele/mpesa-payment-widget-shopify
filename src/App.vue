<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
body {
  background-color: white !important;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  .messages {
    align-items: center;
    justify-content: center;
    scroll-behavior: smooth;
    height: 100%;
  }

  .success-bg {
    background-color: #08c988;
  }
}
</style>
