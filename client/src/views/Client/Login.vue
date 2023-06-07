<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '@/services/http.service'

const router = useRouter()

const tab = ref('login')
const loginForm = reactive({ email: '', password: '' })
const registerForm = reactive({ first_name: '', last_name: '', email: '', password: '' })

async function onSubmit(event) {
  try {
    event.preventDefault()
    let data = null
    if (tab.value === 'login') {
      data = await login(loginForm)
    } else {
      data = await register(registerForm)
    }
    await router.push('/client')
    localStorage.setItem('user', JSON.stringify(data))
    location.reload()
  } catch (err) {
    throw err
  }
}

function clickHandler(type) {
  tab.value = type
}
</script>
<template>
  <div class='lecture'>
    <div class='login_form'>
      <form @submit='onSubmit($event)'>
        <div class='reg_h1'>
          <div @click="clickHandler('login')" class='log_b' :class="tab === 'login' && ' log_act'" id='log_b'>Даромад
          </div>
          <div @click="clickHandler('register')" class='reg_b' :class="tab === 'register' && ' log_act'" id='reg_b'>
            Бақайдгирӣ
          </div>
        </div>
        <div id='log_input' v-if="tab === 'login'">
          <input v-model='loginForm.email' class='log' type='text' name='login' placeholder='E-mail'>
          <input v-model='loginForm.password' class='log' type='password' name='password' placeholder='Парол'>
          <input :disabled='!loginForm.email && !loginForm.password' class='submit' type='submit' value='Даромад'>
        </div>
        <div v-if="tab === 'register'" id='reg_input'>
          <input v-model='registerForm.first_name' class='log' type='text' name='name' placeholder='Ном'>
          <input v-model='registerForm.last_name' class='log' type='text' name='name' placeholder='Насаб'>
          <input v-model='registerForm.email' class='log' type='text' name='login' placeholder='E-mail'>
          <input v-model='registerForm.password' class='log' type='password' name='password_reg' placeholder='Парол'>
          <input
            :disabled='!registerForm.first_name && !registerForm.last_name && !registerForm.email && !registerForm.password'
            class='submit'
            type='submit'
            value='Бақайдгирӣ'>
        </div>
      </form>
    </div>
  </div>
</template>
