import { HTTP } from '@/plugins/axios'

export function login(body) {
  return HTTP.post('/login', body)
}

export function getCourses() {
  return HTTP.get('/courses')
}

export function getCourseById(id) {
  return HTTP.get(`/courses/${id}`)
}

export function createCourse(body) {
  return HTTP.post('/courses', body)
}

export function updateCourse(slug, body) {
  return HTTP.patch(`/courses/${slug}`, body)
}

export function removeCourse(slug) {
  return HTTP.delete(`/courses/${slug}`)
}

