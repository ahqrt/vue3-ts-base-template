<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <footerCom />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import footerCom from './Footer.vue'

export default defineComponent({
  components: {
    footerCom
  },
  setup() {
    const key = computed(() => {
      return useRoute().path
    })
    return {
      key
    }
  }
})

// export default class extends Vue {
//   get key() {
//     return this.$route.path
//   }
// }
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  max-height: calc(100vh - 70px);
  width: 100%;
  position: relative;
  overflow: auto;
}

.app-main::-webkit-scrollbar {
  width: 8px;
}
.app-main::-webkit-scrollbar-thumb {
  box-shadow: inset006pxrgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
}
.app-main::-webkit-scrollbar-track {
  box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.app-main::-webkit-scrollbar-thumb:window-inactive {
  background: #ccd18c;
}
</style>
