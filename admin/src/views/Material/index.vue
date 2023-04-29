<script setup>
import { onMounted, ref } from 'vue'
import { deleteMaterialById, getMaterials, removeFile } from '@/services/http.service.js'

const materials = ref([])

onMounted(async () => {
  materials.value = await getMaterials()
})

async function removeMaterial(item) {
  const isDelete = confirm('Оё шумо дар ҳақиқат мехоҳед нест кунед?')
  if (isDelete) {
    await removeFile(item.file)
    await removeFile(item.photo)
    await deleteMaterialById(item._id)
    materials.value = materials.value.filter(
      (lecture) => lecture._id !== item._id
    )
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <h3>Адабиётхо</h3>
      <button class="btn btn-primary" @click="$router.push('/material/create')">Сохтан</button>
    </div> 
    <ul class="list-group mt-3">
      <li class="list-group-item" v-for="item in materials" :key="item._id">
        <div class="d-flex justify-content-between">
          {{ item.title }}

          <div class="btn-group">
            <button class="btn btn-danger" @click="removeMaterial(item)">
              &times;
            </button>
            <button
              class="btn btn-primary"
              @click="$router.push('/material/edit/' + item._id)"
            >
              Таҳрир
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>