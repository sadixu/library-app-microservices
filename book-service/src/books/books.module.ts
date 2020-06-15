import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common'
import { Transport, ClientsModule } from '@nestjs/microservices'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule } from '@nestjs/mongoose'

import { BookService } from './services/book.service'
import { BooksController } from './controllers/books.controller'
import { BookSchema } from './schemas/Book'
import { CreateBookMiddleware } from './controllers/middlewares/create-book.middleware'
import { BookRepository } from './repositories/book.repository'
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
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],
  controllers: [
    BooksController
  ],
  providers: [
    BookService,
    BookRepository,
     ...CommandHandlers
  ],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateBookMiddleware).forRoutes({ path: 'book', method: RequestMethod.POST })
  }
}
