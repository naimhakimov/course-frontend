import Video from '../schema/Video.js'

export const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find()
    res.send(videos)
  } catch (e) {
    next(e)
  }
}

export const getVideoById = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
    res.send(video)
  } catch (e) {
    next(e)
  }
}

export const createVideo = async (req, res, next) => {
  try {
    const video = new Video(req.body)
    const result = video.save()
    res.send(result)
  } catch (e) {
    next(e)
  }
}

export const updateVideoById = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send({ message: 'Successfully updated' })
  } catch (e) {
    next(e)
  }
}

export const removeVideoById = async (req, res, next) => {
  try {
    await Video.findByIdAndDelete(req.params.id)
    res.send({ message: 'Successfully deleted' })
  } catch (e) {
    next(e)
  }
}
