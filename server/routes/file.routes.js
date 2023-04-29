import { Router } from 'express'
import multer from 'multer'

import { removeFile, uploadFile } from '../controllers/file.controller.js'

const router = Router()
const storage = multer.memoryStorage({})


const upload = multer({
  storage: storage,
  //limiting file size by 5Mb
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: function(req, file, cb) {
    const fileRegex = new RegExp('\.(jpg|jpeg|png|pdf|docx|doc|pptx|rar|zip|mp4|avi)$')
    const fileName = file.originalname

    if (!fileName.match(fileRegex)) {
      return cb(new Error('Invalid file type'))
    }
    cb(null, true)
  }
})

router.post('/upload', [upload.single('file'), uploadFile])

router.post('/remove', [removeFile])

export default router
