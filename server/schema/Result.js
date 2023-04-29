import { model, Schema } from 'mongoose'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  result: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

export default model('Result', schema)