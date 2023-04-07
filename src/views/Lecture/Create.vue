<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { createLecture, getLectureById, removeFile, updateLecture, uploadFile } from '@/services/http.service'
import { toast } from '@/plugins/toast'

const lecture = reactive({ title: '', file: null })
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.id) {
    const lectureData = await getLectureById(route.params.id)
    lecture.title = lectureData.title
    lecture.file = lectureData.file
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
      await toast.success('Successfully updated')
    } else {
      await createLecture(lecture)
      await toast.success('Successfully created')
    }
    await router.push('/lecture')
  } catch (err) {
    throw err
  }
}
</script>

<template>
  <div class='mb-3 card p-3'>
    <h3>{{ route.params.id ? 'Edit' : 'Create' }}</h3>
    <input v-model='lecture.title' type='text' class='form-control mb-2' placeholder='some text'>
    <div>
      <input type='file' class='form-control mb-2' accept='application/pdf' @change='uploadFileHandler($event)'>

      <div class='file' v-if='lecture.file'>
        Pdf

        <div class='file-remove' @click='deleteFile'>&times;</div>
      </div>
    </div>
    <button
      :disabled='!lecture.title && !lecture.file?.url'
      class='btn btn-primary mt-2'
      @click='onSubmit'>
      {{ route.params.id ? 'Edit' : 'Create' }}
    </button>
  </div>
</template>

<style lang='scss'>
.file {
  padding: 10px;
  width: max-content;
  display: flex;
  align-content: center;
  justify-content: center;
  word-break: revert;
  background: var(--gray-400);
  border-radius: 8px;
  position: relative;

  &-remove {
    position: absolute;
    right: -5px;
    top: -5px;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: var(--danger);
    color: var(--white);
    cursor: pointer;
  }
}
</style>