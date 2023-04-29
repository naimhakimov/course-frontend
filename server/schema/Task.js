import { model, Schema } from 'mongoose'
import slugify from 'slugify'

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  tasks: {
    type: Array,
    required: true
  },
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

schema.pre('save', async function(next) {
  try {
    this.slug = slugify(this.title, { lower: true })
    next()
  } catch (err) {
    next(err)
  }
})

export default model('Task', schema)