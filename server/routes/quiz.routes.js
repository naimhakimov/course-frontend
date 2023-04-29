import { Router } from 'express'
import {
  createQuiz,
  getQuiz,
  getQuizById,
  removeQuizById,
  updateQuizById,
  checkQuiz
} from '../controllers/quiz.controller.js'
import { admin, auth } from '../middleware/auth.middleware.js'

const router = Router()

router
  .get('', [getQuiz])
  .get('/:id', [auth, admin, getQuizById])
  .post('', [auth, admin, createQuiz])
  .post('/check', [auth, admin, checkQuiz])
  .patch('/:id', [auth, admin, updateQuizById])
  .delete('/:id', [auth, admin, removeQuizById])

export default router