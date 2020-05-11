import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users.controller'
import { Transport, ClientsModule } from '@nestjs/microservices'

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
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
