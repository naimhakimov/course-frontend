<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useRouter, useRoute } from 'vue-router'

import { toast } from '@/plugins/toast'
import { createCourse, getCourseById, updateCourse } from '@/services/http.service'

const router = useRouter()
const route = useRoute()

const form = reactive({
  title: '',
  content: '# Hello world'
})
const slug = ref(route.params.slug)

watch(route, () => {
  console.log(slug.value)
  slug.value = route.params.slug
})


onMounted(async () => {
  if (slug.value) {
    const data = await getCourseById(slug.value)
    form.content = data.content
    form.title = data.title
  } else {

  }
})

async function onSubmit() {
  if (!form.title && !form.content) {
    toast.warning('Заполните все поля')
    return
  }
  try {
    if (slug.value) {
      await updateCourse(slug.value, {
        ...form,
        content: JSON.stringify(form.content)
      })
    } else {
      await createCourse({
        ...form,
        content: JSON.stringify(form.content)
      })
    }
    toast.success('Успешно сохранено!')
    router.push('/course')
  } catch (e) {
    throw e
  }
}
</script>

<template>
  <div>
    <h2>{{ slug ? 'Редактирование' : 'Создание' }}</h2>

    <form>
      <div class='mb-3'>
        <label for='title' class='form-label'>Название</label>
        <input required v-model='form.title' type='text' class='form-control' id='title'>
      </div>

      <div class='mb-3'>
        <label class='form-label'>Контент</label>
        <MdEditor required v-model='form.content' language='en-US' previewTheme='github' />
      </div>

      <button type='button' class='btn btn-primary' @click='onSubmit'>{{ slug ? 'Обновить' : 'Создать' }}</button>
    </form>

  </div>
</template>