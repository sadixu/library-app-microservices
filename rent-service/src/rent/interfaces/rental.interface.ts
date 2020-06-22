import { Document } from 'mongoose'

export interface Rental extends Document {
  readonly _id: string
  readonly userId: string
  readonly bookId: string
  readonly active: boolean
  readonly created_at: Date
}
