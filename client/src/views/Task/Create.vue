<script setup>
import { getTaskById, updateTaskById, createTask } from '@/services/http.service'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from '@/plugins/toast'
import { QuillEditor } from '@vueup/vue-quill'

const router = useRouter()
const route = useRoute()

const task = reactive({ title: '', description: '' })

onMounted(async () => {
  const id = route.params['id']
  if (id) {
    const taskData = await getTaskById(id)
    task.title = taskData.title
    task.description = taskData.description
  }
})

async function onSubmit() {
  const paramId = route.params['id']
  if (paramId) {
    await updateTaskById(paramId, task)
    await toast.success('Навсози карда шуд')
  } else {
    await toast.success('Сохта шуд')
    await createTask(task)
  }
  await router.push('/task')
}

const modules = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: file => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function() {
          resolve(reader.result);
        };

        reader.onerror = function() {
          reject(reader.error);
        };
      })
    }
  }
}

</script>

<template>
  <div class="card p-3">
    <h3>{{ route.params['id'] ? 'Дохил кардан' : 'Сохтан' }}</h3>
    <div>
      <label>Ном</label>
      <input type="text" class="form-control" v-model="task.title" />
    </div>
    <br>
    <QuillEditor contentType='html' v-model:content='task.description' :modules="modules" toolbar="full" />


    <button class='btn btn-primary mt-3' @click='onSubmit'>{{ route.params['id'] ? 'Дохил кардан' : 'Сохтан' }}</button>
  </div>
</template>