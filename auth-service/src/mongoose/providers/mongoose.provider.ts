import * as mongoose from 'mongoose'

const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT, MONGO_HOST } = process.env

const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/users?authSource=admin&w=1`

export const mongooseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }),
  },
]
