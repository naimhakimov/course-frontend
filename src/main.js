import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import App from './App.vue'
import router from './router'
import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(Toast)
app.use(router)

app.mount('#app')
