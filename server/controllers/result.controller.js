import Result from '../schema/Result.js'

export async function getResults(_, res, next) {
  try {
    const data = await Result.find().populate('user')
    res.send(data)
  } catch (err) {
    next(err)
  }
}

export async function getResultCurrentUser(req, res, next) {
  try {
    const data = await Result.findOne({ user: req.user._id }).populate('user')
    res.send(data)
  } catch (err) {
    next(err)
  }
}


export async function removeResultCurrentUser(req, res, next) {
  try {
    await Result.findOneAndDelete({ user: req.user._id })
    res.send({message: 'Successfully deleted'})
  } catch (err) {
    next(err)
  }
}