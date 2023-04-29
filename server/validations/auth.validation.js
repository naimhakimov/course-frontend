import { check } from 'express-validator'

export const loginValidation = [
  check('email')
    .exists().withMessage('email is required')
    .isEmail().withMessage('incorrect email'),
  check('password')
    .exists().withMessage('password is required')
    .isLength({ min: 6 }).withMessage('minimum length 6')
]

export const registerValidation = [
  ...loginValidation,
  check('phone')
    .exists().withMessage('phone number is required')
    .isLength({ min: 12, max: 12 }).withMessage('minimum length 12'),
  check('first_name')
    .exists().withMessage('first_name is required'),
  check('last_name')
    .exists().withMessage('last_name is required')
]
