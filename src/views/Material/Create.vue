<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  createMaterial,
  updateMaterial,
  getMaterialById,
  removeFile,
  uploadFile,
} from '@/services/http.service.js'

import {toast} from '@/plugins/toast.js'

const route = useRoute()
const router = useRouter()

const material = reactive({ title: '', file: null, photo: null })

onMounted(async () => {
  if (route.params['id']) {
    const materialData = await getMaterialById(route.params['id'])
    material.title = materialData.title
    material.file = materialData.file
    material.photo = materialData.photo
  }
})

async function uploadFileHandler(key, event) {
  material[key] = await uploadFile(event.target.files[0])
}

async function deleteFile(key, id) {
  await removeFile(id)
  material[key] = null
}

async function onSubmit() {
  if (!route.params['id']) {
    await createMaterial(material)
    await toast.success('Сохта шуд')
  } else {
    await updateMaterial(route.params['id'], material)
    await toast.success('Навсози карда шуд')
  }
  await router.push('/material')
}
</script>

<template>
  <div class="mb-3 card p-3">
    <h3>{{ route.params.id ? 'Дохил кардан' : 'Сохтан' }}</h3>

    <label>Ном</label>
    <input
      v-model="material.title"
      type="text"
      class="form-control mb-2"
    />

    <div>
      <label class="form-label">Файл</label>
      <input
        type="file"
        class="form-control mb-2"
        accept="application/pdf"
        @change="uploadFileHandler('file', $event)"
      />

      <div class="file" v-if="material.file">
        Pdf
        <div
          class="file-remove"
          @click="deleteFile('file', material.file.public_id)"
        >
          &times;
        </div>
      </div>
    </div>

    <div>
      <label class="form-label">Сурат</label>
      <input
        type="file"
        class="form-control mb-2"
        accept="image/png, image/jpg, image/jpeg"
        @change="uploadFileHandler('photo', $event)"
      />

      <div class="photo" v-if="material.photo">
        <a :href="material.photo.url" target="_blank"
          ><img :src="material.photo.url" alt=""
        /></a>
        <div
          class="file-remove"
          @click="deleteFile('photo', material.photo.public_id)"
        >
          &times;
        </div>
      </div>
    </div>

    <button
      :disabled="!material.title && !material?.file?.url"
      class="btn btn-primary mt-2"
      @click="onSubmit"
    >
      {{ route.params.id ? 'Дохил кардан' : 'Сохтан' }}
    </button>
  </div>
</template>