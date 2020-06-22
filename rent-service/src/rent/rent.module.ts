import { Module } from '@nestjs/common'
import { RentalController } from './controllers/rent.controller'
import { Transport, ClientsModule } from '@nestjs/microservices'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule } from '@nestjs/mongoose'

import { RentService } from './services/rent.service'
import { RentalSchema } from './schemas/Rental'

const { RMQ_USER, RMQ_PASSWORD, RMQ_PORT, RMQ_HOST, RMQ_VIRTUAL_HOST, RMQ_USER_QUEUE, SERVICE_NAME } = process.env
const rmqConnectionUrl = `amqp://${RMQ_USER}:${RMQ_PASSWORD}@${RMQ_HOST}:${RMQ_PORT}/${RMQ_VIRTUAL_HOST}`

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [rmqConnectionUrl],
          queue: RMQ_USER_QUEUE,
          noAck: false,
          prefetchCount: 1,
        },
      },
    ]),
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
  ],
  controllers: [RentalController],
  providers: [RentService],
})
export class RentModule {}
