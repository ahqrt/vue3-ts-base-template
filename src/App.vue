<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import { useProvide } from './context/index'

export default defineComponent({
  setup() {
    useProvide()
  }
})
</script>
