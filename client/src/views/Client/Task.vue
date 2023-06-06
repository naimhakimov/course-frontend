<script setup>
import { HTTP } from '@/plugins/axios'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tasks = ref([])
const task = ref(null)

watch(route, (value) => {
  task.value = tasks.value.find(task => task._id === value.params['id'])
})

onMounted(async () => {
  tasks.value = await HTTP.get('/tasks')
})
</script>

<template>
  <div class='container'>
    <h1>Супориш</h1>
    <div class='lecture'>
      <div class='lecture_page'>
        <div class='lecture_left' v-if='!task'>
          <div class='lecture_body'>
            <div class='lecture_file' v-for='item in tasks' :key='item._id'>

              <div class='lecture_icon'>
                <i class='fa fa-file-text-o'></i>
              </div>

              <div class='lecture_name'>
                <router-link :to="'/client/task/' + item._id">{{ item.title }}</router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else class='lecture_right'>
          <div class='lecture_right_name'>
            <h1>{{ task.title }}</h1>
          </div>
          <div class='lecture_right_text' v-html='task.description'>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>