<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { HTTP } from '@/plugins/axios'
import { URL_FILE } from '@/url'

const lectures = ref([])
const lecture = ref([])
const route = useRoute()

onMounted(async () => {
  lectures.value = await HTTP.get('/lectures')
  lecture.value = lectures.value[0]
})

watch(route, (value) => {
  lecture.value = lectures.value.find(l => l._id === value.params['id'])
})
</script>

<template>
  <div class='lecture'>
    <div class='lecture_page'>
      <div class='lecture_left'>
        <div class='lecture_body'>
          <div class='lecture_file' v-for='item in lectures' :key="item._id">

            <div class='lecture_icon'>
              <i class='fa fa-file-text-o'></i>
            </div>

            <div class='lecture_name'>
              <router-link :to="'/client/lecture/' + item._id">{{ item.title }}</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class='lecture_right'>
        <div class='lecture_right_name'>
          <h1>{{ lecture.title }}</h1>
        </div>
        <div class='lecture_right_text'>
          <p>{{ lecture.description }}</p>
        </div>
        <div class='lecture_file'>

          <div class='lecture_icon'>
            <i class='fa fa-file-text-o'></i>
          </div>

          <h4>{{ lecture.title }}</h4>
        </div>
        <a :href='URL_FILE +  lecture.file' download target='_blank'>
          <div class='lecture_save'><i class='fa fa-download'></i> Зеркашӣ кардан</div>
        </a>
      </div>
    </div>
  </div>
</template>

<style>
.lecture-content {
  display: flex;
}

.lecture_left {
  position: sticky;
  top: 0;
}
</style>