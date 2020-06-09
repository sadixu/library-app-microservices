import { Module } from '@nestjs/common'
import { Transport, ClientsModule } from '@nestjs/microservices'
import { MongooseModule } from '@nestjs/mongoose'
import { CqrsModule } from '@nestjs/cqrs'

import { UserSchema } from './schemas/User'
import { UserService } from './services/user.service'
import { UsersController } from './controllers/users.controller'
import { UserRepository } from './repositories/user.repository'
import { CommandHandlers } from './commands/handlers'

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
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [UserService, UserRepository, ...CommandHandlers],
})
export class UsersModule {}
