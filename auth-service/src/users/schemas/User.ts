import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  password: String,
  email: String,
  created_at: { type: Date, default: Date.now },
})
