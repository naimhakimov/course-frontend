import { Router } from 'express'

import { adminGuard } from '../middleware/auth.middleware.js'
import {
  createVideo,
  getVideoById,
  getVideos,
  removeVideoById,
  updateVideoById
} from '../controllers/video.controller.js'

const router = Router()

router.get('', [getVideos])

router.get('/:id', [getVideoById])

router.post('', [...adminGuard, createVideo])

router.patch('/:id', [...adminGuard, updateVideoById])

router.delete('/:id', [...adminGuard, removeVideoById])

export default router