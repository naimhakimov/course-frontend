import Material from '../schema/Material.js'

export const getMaterial = async (req, res, next) => {
  try {
    const data = await Material.find()
    res.send(data)
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const lecture = new Material(req.body)
    const data = await lecture.save()

    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
}

export const getMaterialById = async (req, res, next) => {
  try {
    const data = await Material.findById( req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const updateById = async (req, res, next) => {
  try {
    const data = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const removeById = async (req, res, next) => {
  try {
    const data = await Material.findByIdAndDelete(req.params.id)
    if (data) {
      return res.json({ message: 'Successfully removed' })
    }
    return res.status(400).json({message: 'Not found material'})


  } catch (err) {
    next(err)
  }
}