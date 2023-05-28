import { Router } from 'express'
import { getResultCurrentUser, getResults,removeResultCurrentUser } from '../controllers/result.controller.js'
import { auth, adminGuard } from '../middleware/auth.middleware.js'

const router = Router()

router.get('', [adminGuard, getResults])

router.get('/currentUser', [auth, getResultCurrentUser])

router.delete('/currentUser', [auth, removeResultCurrentUser])

export default router