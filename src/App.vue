<template>
  <component :is="layout"></component>
</template>

<script>
import Main from './layouts/MainLayout.vue'
import Empty from './layouts/EmptyLayout.vue'

export default {
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  },
  components: {
    Main,
    Empty
  }
}
</script>