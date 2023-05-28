<script setup>
import { HTTP } from "@/plugins/axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const tasks = ref([])
onMounted(async () => {
  tasks.value = await HTTP.get('/tasks')
})
</script>

<template>
  <div class='container'>
    <h1>Task</h1>
      <pre>{{  tasks  }}</pre>
  </div>
</template>