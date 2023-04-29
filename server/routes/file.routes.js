import { Router } from 'express'
import multer from 'multer'

import { removeFile, uploadFile } from '../controllers/file.controller.js'

const router = Router()

const upload = multer({
  limits: {
    fileSize: 200 * 1024 * 1024
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|MP4|mp4|avi|pdf|docx|doc)$/)) {
      return cb(new Error('Please upload a valid file'))
    }
    cb(undefined, true)
  },
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename(req, file, callback) {
      const extension = file.mimetype.split('/')[1]
      const fileName = (new Date().getTime() / 1000 | 0) + '.' + extension
      callback(null, fileName)
    }
  })
})

router.post('/upload', [upload.single('file'), uploadFile])

router.post('/remove', [removeFile])

export default router
