import { Router } from 'express'
import { adminGuard } from '../middleware/auth.middleware.js'
import { create, getMaterial, getMaterialById, updateById, removeById } from '../controllers/material.controller.js'

const router = Router()

router.get('', [getMaterial])

router.get('/:id', [getMaterialById])

router.post('', [...adminGuard, create])

router.patch('/:id', [...adminGuard, updateById])

router.delete('/:id', [...adminGuard, removeById])

export default router