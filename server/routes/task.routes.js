import { Router } from 'express'
import { adminGuard } from '../middleware/auth.middleware.js'
import {
  create,
  getTasks, getTaskById,
  removeById,
  updateById
} from '../controllers/task.controller.js'

const router = Router()

router.get('', [getTasks])

router.get('/:id', [getTaskById])

router.post('', [...adminGuard, create])

router.patch('/:id', [...adminGuard, updateById])

router.delete('/:id', [...adminGuard, removeById])

export default router