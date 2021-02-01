<template>
  <div class="app-wrapper">
    <nav-bar />
    <app-main />
  </div>
</template>

<script lang="ts">
import NavBar from './components/NavBar/induex.vue'
import AppMain from './components/AppMain.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    AppMain,
    NavBar
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
