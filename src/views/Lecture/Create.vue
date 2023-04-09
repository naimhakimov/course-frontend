<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  createLecture,
  getLectureById,
  removeFile,
  updateLecture,
  uploadFile,
} from '@/services/http.service'
import { toast } from '@/plugins/toast'

const lecture = reactive({ title: '', file: null, description: '' })
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.id) {
    const lectureData = await getLectureById(route.params.id)
    lecture.title = lectureData.title
    lecture.file = lectureData.file
    lecture.description = lectureData.description
  }
})

async function uploadFileHandler(event) {
  try {
    lecture.file = await uploadFile(event.target.files[0])
  } catch (err) {
    throw err
  }
}

async function deleteFile() {
  try {
    await removeFile(lecture.file.public_id)
    lecture.file = null
  } catch (e) {
    throw e
  }
}

async function onSubmit() {
  try {
    if (route.params.id) {
      await updateLecture(route.params.id, lecture)
      await toast.success('Навсози карда шуд')
    } else {
      await createLecture(lecture)
      await toast.success('Сохта шуд')
    }
    await router.push('/lecture')
  } catch (err) {
    throw err
  }
}
</script>

<template>
  <div class="mb-3 card p-3">
    <h3>{{ route.params.id ? 'Дохил кардан' : 'Сохтан' }}</h3>

    <label>Ном</label>
    <input
      v-model="lecture.title"
      type="text"
      class="form-control mb-2"
      placeholder="some text"
    />

    <div>
      <label class="form-label">Тавсиф</label>
      <textarea v-model="lecture.description" class="form-control" rows="3"></textarea>
    </div>

    <div>
      <label class="form-label">Файл</label>
      <input
        type="file"
        class="form-control mb-2"
        accept="application/pdf"
        @change="uploadFileHandler($event)"
      />

      <div class="file" v-if="lecture.file">
        Pdf
        <div class="file-remove" @click="deleteFile">&times;</div>
      </div>
    </div>

    <button
      :disabled="!lecture.title && !lecture.file?.url"
      class="btn btn-primary mt-2"
      @click="onSubmit"
    >
      {{ route.params.id ? 'Дохил кардан' : 'Сохтан' }}
    </button>
  </div>
</template>