<script setup>
import { onMounted, ref } from 'vue'
import { createLecture, deleteLectureById, getLectureList, removeFile, uploadFile } from '@/services/http.service'

const lectureList = ref([])
const title = ref(null)
const file = ref(null)

onMounted(async () => {
  lectureList.value = await getLectureList()
})

async function removeLecture(item) {
  const isDelete = confirm('Оё шумо дар ҳақиқат мехоҳед нест кунед?')
  if (isDelete) {
    await removeFile(item.file.public_id)
    await deleteLectureById(item._id)
    lectureList.value = lectureList.value.filter(lecture => lecture._id !== item._id)
  }
}

async function uploadFileHandler(event) {
  file.value = await uploadFile(event.target.files[0])
}

async function create() {
  if (file.value && title.value) {
    const lecture = await createLecture({title: title.value, file: file.value})
    lectureList.value = [...lectureList.value, lecture]
    title.value = file.value = null
  }
}

function edit(item) {
  title.value = item.title;
  file.value = item.file;
}
</script>

<template>
  <div>
    <h1>Лексияхо</h1>
    <div class='mb-3 card p-3'>
      <input v-model='title' type='text' class='form-control mb-2' placeholder='some text'>
      <input :ref='file' type='file' class='form-control mb-2' @change='uploadFileHandler($event)'>
      <button :disabled='!title && !file' class='btn btn-primary' @click='create'>Сохтан</button>
    </div>


    <ul class='list-group'>
      <li class='list-group-item' v-for='item in lectureList'>
        <div class='d-flex justify-content-between'>
          {{ item.title }}

          <div class='btn-group btn-group-sm' role='group'>
            <button class='btn btn-danger' @click='removeLecture(item)'>Нест кардан</button>
            <button class='btn btn-primary' @click='edit(item)'>Таҳрир</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>