import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersModule } from './users/users.module'

const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT, MONGO_HOST } = process.env

const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/users?authSource=admin&w=1`

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }),
  ],
})
export class AppModule {}
