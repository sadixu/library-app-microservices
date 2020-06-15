import { Controller, Inject, Get, Post, Res, Body, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { CreateBookDTO } from '../dtos/create-book.dto'
import { BookService } from '../services/book.service'

const { SERVICE_NAME } = process.env

@Controller('book')
export class BooksController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy, private readonly service: BookService) {}

  @Post()
  async createBook(@Res() res, @Body() dto: CreateBookDTO) {
    const result = await this.service.createBook(dto)

    return res.send(result)
  }
}
