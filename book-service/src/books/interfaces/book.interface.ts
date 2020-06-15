import { Document } from 'mongoose'

export interface Book extends Document {
  readonly _id: string
  readonly author: string
  readonly title: string
  readonly ISBN: string
  readonly year: number
}
