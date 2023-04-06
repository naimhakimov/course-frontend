import axios from 'axios'
import { useToast } from 'vue-toastification'

export const HTTP = axios.create({
  baseURL: 'https://sharipova-sh-backend.cyclic.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

HTTP.interceptors.request.use(req => {
  req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
  return req
})

HTTP.interceptors.response.use(
  response => response.data,
  error => {
    const toast = useToast()
    if (Array.isArray(error?.response?.data)) {
      toast.error(error.response.data.join(', '))
    } else {
      toast.error(error.message)
    }
  })
