<script setup>
import { getTaskById, updateTaskById, createTask } from '@/services/http.service'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from '@/plugins/toast'

const router = useRouter()
const route = useRoute()

const task = reactive({ title: '', tasks: [{title: ''}] })

onMounted(async () => {
  const id = route.params['id']
  if (id) {
    const taskData = await getTaskById(id)
    task.title = taskData.title
    task.tasks = taskData.tasks.map(i => ({title: i}))
  }
})

function addTask() {
  task.tasks.push({title: ''})
}

function removeTask(idx) {
  task.tasks.splice(idx, 1)
}

async function onSubmit() {
  const paramId = route.params['id']
  task.tasks = task.tasks.map(t => t.title).filter(item => item)
  if (paramId) {
    await updateTaskById(paramId, task)
    await toast.success('Навсози карда шуд')
  } else {
    await toast.success('Сохта шуд')
    await createTask(task)
  }
  await router.push('/task')
}
</script>

<template>
  <div class="card p-3">
    <h3>{{ route.params['id'] ? 'Дохил кардан' : 'Сохтан' }}</h3>
    <div>
      <label>Ном</label>
      <input type="text" class="form-control" v-model="task.title" />
    </div>

    <div class='d-flex gap-2' v-for="(item, index) in task.tasks" :key="index">
     <div class='flex-grow-1'>
       <label>Масъалаи {{ index + 1 }}</label>
       <textarea class='form-control' v-model="item.title" rows="3"></textarea>
     </div>

      <button class='btn btn-danger align-self-center' @click='removeTask(index)'>&times;</button>
    </div>

    <button @click='addTask' style='width: max-content' class='btn btn-primary mt-3'>+</button>

    <button class='btn btn-primary mt-3' @click='onSubmit'>{{ route.params['id'] ? 'Дохил кардан' : 'Сохтан' }}</button>
  </div>
</template>