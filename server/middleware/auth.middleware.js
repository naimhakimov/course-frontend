import { verify } from 'jsonwebtoken'
import User from '../schema/User.js'

export const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    req.user = null
    return res.status(401).send({ message: 'Not authorized' })
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decode = verify(token, 'super secret')
    req.user = await User.findOne({ _id: decode._id })
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized' })
  }
}

export const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next()
    } else {
      return res.status(401).json({ message: 'You don\'t have access' })
    }
  } catch (err) {
    next(err)
  }
}

export const adminGuard = [auth, admin]