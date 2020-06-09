import { Document } from 'mongoose'

export interface User extends Document {
  readonly firstname: string
  readonly lastname: string
  readonly email: string
  readonly age: number
  readonly password: string
  readonly created_at: Date
}
