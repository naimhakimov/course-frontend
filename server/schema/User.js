import { model, Schema } from 'mongoose'
import bcryptjs from 'bcryptjs'

const schema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  phone: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

schema.methods.validatePassword = async function (password) {
  return await bcryptjs.compare(password, this.password)
}

export default model('User', schema)
