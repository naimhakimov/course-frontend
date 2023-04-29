import { Router } from 'express'
import { getResultCurrentUser, getResults } from '../controllers/result.controller.js'
import { auth } from '../middleware/auth.middleware.js'

const router = Router()

router.get('', [getResults])

router.get('/currentUser', [auth, getResultCurrentUser])

export default router