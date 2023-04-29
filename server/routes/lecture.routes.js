import { Router } from 'express'
import {
  create,
  getLecture,
  getLectureById,
  removeById,
  updateById
} from '../controllers/lecture.controller.js'
import { adminGuard } from '../middleware/auth.middleware.js'

const router = Router()

router.get('', [getLecture])

router.get('/:id', [getLectureById])

router.post('', [...adminGuard, create])

router.patch('/:id', [...adminGuard, updateById])

router.delete('/:id', [...adminGuard, removeById])

export default router