import { Schema, model } from 'mongoose'

const schema = new Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  answer: {
    type: String
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

schema.pre('save', async function(next) {
  try {
    const answerIndex = this.options.findIndex(item => item.answer)
    this.options = this.options.map(item => ({
      title: item.title,
      uid: Math.random().toString(16).slice(2)
    }))
    this.answer = this.options[answerIndex].uid
    next()
  } catch (err) {
    next(err)
  }
})

schema.pre('findOneAndUpdate', async function(next) {
  try {
    const answerIndex = this._update.options.findIndex(item => item.answer)
    this._update.options = this._update.options.map(item => ({
      title: item.title,
      uid: Math.random().toString(16).slice(2)
    }))
    this._update.answer = this._update.options[answerIndex].uid
    next()
  } catch (err) {
    next(err)
  }
})

export default model('Quiz', schema)