import { model, Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  userId: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  }
})

const User = model<IUser>('user', UserSchema)

export default User