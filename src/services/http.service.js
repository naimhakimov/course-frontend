import { HTTP } from '@/plugins/axios'

// auth
export function login(body) {
  return HTTP.post('/login', body)
}

// users
export function getUsers() {
  return HTTP.get('/users')
}

export function updateUserById(id, body) {
  return HTTP.patch(`/users/${id}`, body)
}

export function deleteUserById(id) {
  return HTTP.delete(`/users/${id}`)
}

// lectures
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

//quiz

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

//materials

export function getMaterials() {
  return HTTP.get('/materials')
}

export function createMaterial(body) {
  return HTTP.post('/materials', body)
}

export function updateMaterial(id, body) {
  return HTTP.patch(`/materials/${id}`, body)
}

export function getMaterialById(id) {
  return HTTP.get(`/materials/${id}`)
}

export function deleteMaterialById(id) {
  return HTTP.delete(`/materials/${id}`)
}

//tasks

export function getTasks() {
  return HTTP.get('/tasks')
}

export function getTaskById(id) {
  return HTTP.get(`/tasks/${id}`)
}

export function createTask(body) {
  return HTTP.post('/tasks', body)
}

export function updateTaskById(id, body) {
  return HTTP.patch(`/tasks/${id}`, body)
}

export function removeTaskById(id) {
  return HTTP.delete(`/tasks/${id}`)
}

//video

export function getVideos() {
  return HTTP.get('/videos')
}


export function getVideoById(id) {
  return HTTP.get(`/videos/${id}`)
}

export function createVideo(body) {
  return HTTP.post('/videos', body)
}

export function updateVideoById(id, body) {
  return HTTP.patch(`/videos/${id}`, body)
}

export function removeVideoById(id) {
  return HTTP.delete(`/videos/${id}`)
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