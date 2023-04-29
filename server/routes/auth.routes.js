import { Router } from 'express'

import { login, register } from '../controllers/auth.controller.js'
import { loginValidation, registerValidation } from '../validations/auth.validation.js'

const router = Router()

router.post('/register', [registerValidation, register])

router.post('/login', [loginValidation, login])

export default router