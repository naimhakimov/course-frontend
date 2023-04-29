<script setup>
import { onMounted, ref } from 'vue'
import {
  removeFile,
  removeVideoById,
  createVideo,
  getVideos
} from '@/services/http.service'

const videoList = ref([])

onMounted(async () => {
  videoList.value = await getVideos()
})

async function removeVideo(item) {
  const isDelete = confirm('Оё шумо дар ҳақиқат мехоҳед нест кунед?')
  if (isDelete) {
    await removeFile(item.file)
    await removeVideoById(item._id)
    videoList.value = videoList.value.filter(
      (lecture) => lecture._id !== item._id
    )
  }
}

async function create() {
  if (file.value && title.value) {
    const lecture = await createVideo({
      title: title.value,
      file: file.value
    })
    videoList.value = [...videoList.value, lecture]
    title.value = file.value = null
  }
}
</script>

<template>
  <div>
    <div class='d-flex justify-content-between'>
      <h1>Видеохо</h1>
      <button
        class='btn btn-primary btn-sm align-self-baseline'
        @click="$router.push('/video/create')"
      >
        Сохтани видео
      </button>
    </div>
    <ul class='list-group'>
      <li class='list-group-item' v-for='item in videoList' :key='item._id'>
        <div class='d-flex justify-content-between'>
          {{ item.title }}

          <div class='btn-group'>
            <button class='btn btn-danger' @click='removeVideo(item)'>
              &times;
            </button>
            <button
              class='btn btn-primary'
              @click="$router.push('/video/edit/' + item._id)"
            >
              Таҳрир
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>