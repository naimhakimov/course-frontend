import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import routes from './routes/index.js'
import errorHandler from './middleware/error.middleware.js'
import { serve, setup } from 'swagger-ui-express'
import { createRequire } from 'module'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { initialUser } from './controllers/user.controller.js'

const app = express()

const require = createRequire(import.meta.url)
const data = require('./swagger_output.json')
const PORT = process.env.PORT ?? 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/docs', serve, setup(data))

app.use('/api', routes)

app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))


app.use(errorHandler)

async function start() {
  try {
    await connect('mongodb://localhost:27017/diplom')
    await initialUser()
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    )
  } catch (e) {
    process.exit(1)
  }
}

start()