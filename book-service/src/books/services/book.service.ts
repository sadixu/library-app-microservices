import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { HttpException, HttpStatus } from '@nestjs/common'

import { CreateBookDTO } from '../dtos/create-book.dto'

@Injectable()
export class BookService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async createBook(dto: CreateBookDTO) {
    console.log(dto)

    return 1
  }
}
