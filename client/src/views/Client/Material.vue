<script setup>
import { onMounted, ref } from 'vue'
import { URL_FILE } from '@/url'
import { HTTP } from '@/plugins/axios'

const materials = ref([])

onMounted(async () => {
  materials.value = await HTTP.get('/materials')
})
</script>

<template>
  <div class="lecture">
    <div class="adabiyot" v-for="book in materials" :key="book._id">
      <div class="adabiyot_img">
        <img :src="URL_FILE + book.photo" alt="book" />
      </div>
      <div class="adabiyot_info">
        <div v-html="book.title"></div>
        <a :href="URL_FILE + book.file">
          <div class="lecture_save">
            <i class="fa fa-download"></i> Зеркаши кардан
          </div>
        </a>
      </div>
    </div>
  </div>
</template>