import { HTTP } from '@/plugins/axios'

export function login(body) {
  return HTTP.post('/login', body)
}

export function getSubjects() {
  return HTTP.get('/subjects')
}

export function getUsers() {
  return HTTP.get('/users')
}

export function updateUserById(id, body) {
  return HTTP.patch(`/users/${id}`, body)
}

export function deleteUserById(id) {
  return HTTP.delete(`/users/${id}`)
}

export function getLectureList() {
  return HTTP.get('/lectures')
}

export function getLectureById(id) {
  return HTTP.get(`/lectures/${id}`)
}

export function createLecture(body) {
  return HTTP.post('/lectures', body)
}

export function updateLecture(id, body) {
  return HTTP.patch(`/lectures/${id}`, body)
}

export function deleteLectureById(id) {
  return HTTP.delete(`/lectures/${id}`)
}

// quiz 

export function getQuiz() {
  return HTTP.get('/quiz')
}

export function getQuizById(id) {
  return HTTP.get(`/quiz/${id}`)
}

export function craeteQuiz(body) {
  return HTTP.post('/quiz', body)
}

export function updateQuiz(id, body) {
  return HTTP.patch(`/quiz/${id}`, body)
}

export function removeQuizById(id) {
  return HTTP.delete(`/quiz/${id}`)
}

//file

export function uploadFile(file) {
  return HTTP.post('/files/upload', {
    file
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}

export function removeFile(public_id) {
  return HTTP.post('/files/remove', {
    public_id
  })
}