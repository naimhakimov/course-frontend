import Task from '../schema/Task.js'

export const getTasks = async (req, res, next) => {
  try {
    const data = await Task.find()
    res.send(data)
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const task = new Task(req.body)
    const data = await task.save()

    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
}

export const getTaskById = async (req, res, next) => {
  try {
    const data = await Task.findById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const updateById = async (req, res, next) => {
  try {
    const data = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const removeById = async (req, res, next) => {
  try {
    const data = await Task.findByIdAndDelete(req.params.id)
    if (data) {
      return res.json({ message: 'Successfully removed' })
    }

    res.status(400).json({ message: 'Not found task' })

  } catch (err) {
    next(err)
  }
}