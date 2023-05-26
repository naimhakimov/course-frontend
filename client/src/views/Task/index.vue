<script setup>
import { getTasks, removeTaskById } from '@/services/http.service'
import { onMounted, ref } from 'vue'

const tasks = ref([])

onMounted(async () => {
  tasks.value = await getTasks()
})

async function removeTaskHandler(id) {
  const isDelete = confirm('Оё шумо дар ҳақиқат мехоҳед нест кунед?')
  if (isDelete) {
    await removeTaskById(id)
    tasks.value = tasks.value.filter((task) => task._id !== id)
  }
}
</script>

<template>
  <div>
    <div class='d-flex align-items-center justify-content-between'>
      <h3>Масъалахо</h3>
      <button class='btn btn-primary' @click="$router.push('/task/create')">
        Сохтан
      </button>
    </div>
    <ul class='list-group mt-3'>
      <li class='list-group-item' v-for='task in tasks' :key='task._id'>
        <div class='d-flex justify-content-between align-items-center'>
          {{ task.title }}

          <button class='btn btn-group'>
            <button class='btn btn-danger' @click='removeTaskHandler(task._id)'>
              &times;
            </button>
            <button
              class='btn btn-primary'
              @click="$router.push('/task/edit/' + task._id)"
            >
              Таҳрир
            </button>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>