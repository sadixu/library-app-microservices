import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  password: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
})
