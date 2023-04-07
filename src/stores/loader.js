import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref(false)

  function setLoading(value) {
    isLoading.value = value
  }

  return { setLoading, isLoading }
})
