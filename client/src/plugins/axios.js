import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useLoaderStore } from '@/stores/loader'

const useLoader = useLoaderStore()

export const HTTP = axios.create({
  // baseURL: 'https://sharipova-sh-backend.cyclic.app/api',
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

HTTP.interceptors.request.use(req => {
  req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
  useLoader.setLoading(true)
  return req
})

HTTP.interceptors.response.use(
  response => {
    useLoader.setLoading(false)
    return response.data
  },
  error => {
    useLoader.setLoading(false)
    const toast = useToast()
    if (Array.isArray(error?.response?.data)) {
      toast.error(error.response.data.join(', '))
    } else {
      toast.error(error.message)
    }
  })
