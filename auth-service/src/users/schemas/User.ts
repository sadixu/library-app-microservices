import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  password: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
})
