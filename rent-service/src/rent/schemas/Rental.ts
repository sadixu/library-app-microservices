import * as mongoose from 'mongoose'

export const RentalSchema = new mongoose.Schema({
  bookId: String,
  userId: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})
