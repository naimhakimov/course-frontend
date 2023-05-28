<template>
  <div class="client-layout">
    <client-header />
    <main>
      <router-view/>
    </main>
    <client-footer />
  </div>
</template>
<script>
import ClientHeader from '@/components/ClientHeader.vue'
import ClientFooter from '@/components/ClientFooter.vue'
export default {
  components: { ClientHeader, ClientFooter }
}
</script>

<style lang='scss' scoped>
.client-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;

  main {
    margin-top: 60px;
    flex: 1;
    width: 100%;
  }
}
</style>