import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Transport, ClientsModule } from '@nestjs/microservices'

import { RentModule } from './rent/rent.module'

const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT, MONGO_HOST } = process.env

const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/books?authSource=admin&w=1`

@Module({
  imports: [
    ConfigModule.forRoot(),
    RentModule,
    MongooseModule.forRoot(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }),
  ],
})

export class AppModule {}
