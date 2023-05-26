<script setup>
import { ref, onMounted } from 'vue'
import { HTTP } from '@/plugins/axios'
const lecture = ref()

onMounted(async () => {
  lecture.value = await HTTP.get('/lectures')
})
</script>

<template>
  <div class='container'>
    <h1>lecture</h1>
    <pre>{{ lecture }}</pre>
  </div>
</template>