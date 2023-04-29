import { Schema } from 'mongoose'
import slugify from 'slugify'

export const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: null
  },
  file: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

schema.pre('save', async function (next) {
  try {
    this.slug = slugify(this.title, { lower: true })
    next()
  } catch (err) {
    next(err)
  }
})