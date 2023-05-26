<script setup>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import BaseLoading from '@/components/BaseLoading.vue'
</script>
<template>
  <div class="main">
    <BaseLoading />
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