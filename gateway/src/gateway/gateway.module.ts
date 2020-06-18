import { Module } from '@nestjs/common'
import { Transport, ClientsModule } from '@nestjs/microservices'

import { UsersController } from './controllers/users.controller'
import { BooksController } from './controllers/books.controller'

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
        },
      },
    ]),
  ],
  controllers: [UsersController, BooksController],
  providers: [],
})
export class GatewayModule {}
