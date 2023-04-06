import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import App from './App.vue'
import router from './router'
import 'vue-toastification/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import './assets/main.css'
import { createI18n } from 'vue-i18n'
import ru from '@/assets/i18n/ru'
import tj from '@/assets/i18n/tj'

const messages = {
  ru: ru,
  tj: tj
}

const i18n = createI18n({
  globalInjection: true,
  locale: 'ru',
  fallbackLocale: 'ru',
  legacy: false,
  messages
})
const app = createApp(App)
app.use(createPinia())
app.use(Toast)
app.use(router)
app.use(i18n)

app.mount('#app')
