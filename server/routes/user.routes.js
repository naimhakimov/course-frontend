import { Router } from 'express'

import { adminGuard, auth } from '../middleware/auth.middleware.js'
import {
  deleteUserById,
  getCurrentUser,
  getUserById,
  getUsers,
  updateUserById
} from '../controllers/user.controller.js'

const router = Router()

router.get('', [...adminGuard, getUsers])

router.get('/:id', [...adminGuard, getUserById])

router.patch('/:id', [...adminGuard, updateUserById])

router.delete('/:id', [...adminGuard, deleteUserById])

router.get('/currentUser', [auth, getCurrentUser])

export default router