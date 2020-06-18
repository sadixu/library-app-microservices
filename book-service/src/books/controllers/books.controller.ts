import { Controller, Inject, Logger } from '@nestjs/common'
import { ClientProxy, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'

import { CreateBookDTO } from '../dtos/create-book.dto'
import { BookService } from '../services/book.service'

const { SERVICE_NAME } = process.env

@Controller('book')
export class BooksController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy, private readonly service: BookService) {}

  @MessagePattern('create-book')
  async createBook(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)

    try {
      const result = await this.service.createBook(data)

      return { result }
    } catch (error) {
      return { error }
    }
  }
}
