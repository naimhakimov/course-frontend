import User from '../schema/User.js'

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    next(err)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const findUser = await User.findById(req.params.id)
    res.send(findUser)
  } catch (err) {
    next(err)
  }
}

export const updateUserById = async (req, res, next) => {
  try {
    const user = req.user
    const findUser = await User.findById(req.params.id)
    if (user.role === 'admin' || user._id === findUser._id) {
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.send(updateUser)
    } else {
      res.status(401).send({ message: 'Not authorized' })
    }
  } catch (err) {
    next(err)
  }
}

export const deleteUserById = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id, { active: false })
    res.send('Successfully disabled')
  } catch (err) {
    next(err)
  }
}

export const getCurrentUser = async (req, res, next) => {
  try {
    if (req.user.active) {
      res.send(req.user)
    } else {
      res.status({message: 'Not found user'})
    }
  } catch (err) {
    next(err)
  }
}