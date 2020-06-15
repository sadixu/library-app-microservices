import * as mongoose from 'mongoose'

export const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  ISBN: String,
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
})
