import User from '../schema/User.js'
import { buildUser } from '../utils/helper.js'
import { validationResult } from 'express-validator'

export const register = async (req, res, next) => {
  try {
    const sameLogin = await User.findOne({ email: req.body.email })

    if (sameLogin) {
      return res.status(400).json({
        message: 'email already exist'
      })
    }

    const user = new User({
      ...req.body
    })

    const saveUser = await user.save()

    res.status(201).json(buildUser(saveUser))
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array().map(({ msg }) => {message: msg}))
    }

    const user = await User.findOne({ email: req.body.email }).select('+password')

    if (user.active === false) {
      return res.status(401).send({ message: 'Not authorized' })
    }

    const errorMessage = { message: 'email or password incorrect' }

    if (!user) {
      return res.status(400).send(errorMessage)
    }

    const passwordCompare = await user.validatePassword(req.body.password)

    if (!passwordCompare) {
      return res.status(400).send(errorMessage)
    }

    res.json(buildUser(user))
  } catch (err) {
    next(err)
  }
}