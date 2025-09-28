import { model, Schema, Document } from 'mongoose'

export interface ITransaction extends Document {
  transactionId: string;
  collaborators: string;
  name: string;
}

const TransactionSchema = new Schema({
name: {
    type: String,
    required: true,
    unique: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const Transaction = model<ITransaction>('user', TransactionSchema)

export default Transaction