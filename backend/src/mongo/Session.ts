import { model, Schema, Document } from 'mongoose'

export interface ISession extends Document {
  sessionId: string
  expiryDate: Date
}

const sessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
})

sessionSchema.index({ expiryDate : 1, }, { expireAfterSeconds: 0 })
const Session = model('session', sessionSchema)

export default Session