<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { login } from '@/services/http.service'

const loading = ref(false)
const formValue = reactive({ email: '', password: '' })
const router = useRouter()

async function onSubmit() {
  loading.value = true
  try {
    const user = await login(formValue)
    localStorage.setItem('user', JSON.stringify(user))
    loading.value = false
    router.push('/')
  } catch (err) {
    loading.value = false
  }
}

onMounted(() => {
  if (localStorage.getItem('user')) {
    router.push('/')
  }
})
</script>

<template>
  <form class='card p-4'>
    <h1>Панель администратора</h1>
    <div class='mb-3'>
      <label for='email' class='form-label'>Email</label>
      <input v-model='formValue.email' type='email' class='form-control' id='email'>
    </div>

    <div class='mb-3'>
      <label class='form-label' for='password'>Парол</label>
      <input v-model='formValue.password' type='password' class='form-control' id='password'>
    </div>

    <div class='mb-3 d-flex'>
      <input class='form-check-input' id='remember' type='checkbox' value=''
             aria-label='Checkbox for following text input'>

      <label class='form-label mx-1' for='remember'>Запомнить</label>
    </div>

    <button class='btn btn-primary' type='button' @click='onSubmit' :disabled='loading'>

      <template v-if='loading'>
        <div class='spinner-border spinner-grow-sm text-light' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      </template>

      <template v-else>Вход</template>
    </button>
  </form>
</template>

<style>

</style>
