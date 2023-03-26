<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { removeCourse, getCourses } from '@/services/http.service'
import Edit from '@/components/icons/Edit.vue'
import Delete from '@/components/icons/Delete.vue'
import { toast } from '@/plugins/toast'

const router = useRouter()

const courses = ref([])

onMounted(async () => {
  courses.value = await getCourses()
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('default', { dateStyle: 'long' }).format(date)
}

function edit(slug) {
  router.push(`/edit/${slug}`)
}

async function remove(slug) {
  try {
    await removeCourse(slug)
    courses.value = courses.value.filter(item => item.slug !== slug)
    toast.success('Успешно удалено!')
  } catch (e) {
    throw e
  }
}

</script>

<template>
  <main>
    <table class='table table-striped table-bordered'>
      <thead class='thead-dark'>
      <tr>
        <th scope='col'>#</th>
        <th scope='col'>Название</th>
        <th scope='col'>Слаг</th>
        <th scope='col'>Дата создание</th>
        <th scope='col'>Дата обновление</th>
        <th scope='col'></th>
        <th scope='col'></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for='(item, index) in courses'>
        <th scope='row'>{{ index + 1 }}</th>
        <td>{{ item.title }}</td>
        <td>{{ item.slug }}</td>
        <td>{{ formatDate(item.created_at) }}</td>
        <td>{{ formatDate(item.updated_at) }}</td>
        <td>
          <Edit @click='edit(item.slug)' />
        </td>
        <td>
          <Delete @click='remove(item.slug)' />
        </td>
      </tr>
      </tbody>
    </table>
  </main>
</template>
