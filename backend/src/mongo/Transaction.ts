import { model, Schema, Document } from 'mongoose'

export interface ITransaction extends Document {
  transactionId: string;
  collaborators: string;
  name: string;
  amount: string;
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
  collaborators: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: String,
    required: true,
    unique: true
  }
})

const Transaction = model<ITransaction>('transanction', TransactionSchema)

export default Transaction