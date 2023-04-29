<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  createVideo,
  getVideoById,
  removeFile,
  updateVideoById,
  uploadFile
} from '@/services/http.service'
import { toast } from '@/plugins/toast'
import { URL_FILE } from '@/url.js'

const video = reactive({ title: '', file: null, description: '' })
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.id) {
    const lectureData = await getVideoById(route.params.id)
    video.title = lectureData.title
    video.file = lectureData.file
    video.description = lectureData.description
  }
})

async function uploadFileHandler(event) {
  try {
    const file = await uploadFile(event.target.files[0])
    video.file = file.url
  } catch (err) {
    throw err
  }
}

async function deleteFile() {
  try {
    await removeFile(video.file)
    video.file = null
  } catch (e) {
    throw e
  }
}

async function onSubmit() {
  try {
    if (route.params.id) {
      await updateVideoById(route.params.id, video)
      await toast.success('Навсози карда шуд')
    } else {
      await createVideo(video)
      await toast.success('Сохта шуд')
    }
    await router.push('/video')
  } catch (err) {
    throw err
  }
}
</script>

<template>
  <div class='mb-3 card p-3'>
    <h3>{{ route.params.id ? 'Дохил кардан' : 'Сохтан' }}</h3>

    <label>Ном</label>
    <input
      v-model='video.title'
      type='text'
      class='form-control mb-2'
    />

    <div>
      <label class='form-label'>Тавсиф</label>
      <textarea v-model='video.description' class='form-control' rows='3'></textarea>
    </div>

    <div>
      <label class='form-label'>Файл</label>
      <input
        type='file'
        class='form-control mb-2'
        @change='uploadFileHandler($event)'
      />

      <div class='file' v-if='video?.file'>
        <video width='400' controls>
          <source :src='URL_FILE + video.file' type='video/mp4'>
          <!--          <source src="movie.ogg" type="video/ogg">-->
          Your browser does not support the video tag.
        </video>
        <div class='file-remove' @click='deleteFile'>&times;</div>
      </div>
    </div>

    <button
      :disabled='!video.title && !video.file'
      class='btn btn-primary mt-2'
      @click='onSubmit'
    >
      {{ route.params.id ? 'Дохил кардан' : 'Сохтан' }}
    </button>
  </div>
</template>