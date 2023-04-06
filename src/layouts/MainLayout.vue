<script setup>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
</script>
<template>
  <div class="main">
    <Aside/>
    <div class="main-views">
      <Header/>
      <div class="pages">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.main {
  display: flex;

  &-views {
    width: 100%;
    margin-left: 300px;
  }

  .pages{
    padding: 20px;
  }
}
</style>