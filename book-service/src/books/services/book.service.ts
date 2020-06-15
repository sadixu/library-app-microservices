import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { CreateBookDTO } from '../dtos/create-book.dto'
import { BookRepository } from '../repositories/book.repository'
import { CreateBookCommand } from '../commands/impl/create-book.command'

@Injectable()
export class BookService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly repository: BookRepository) {}

  async createBook(dto: CreateBookDTO) {
    return this.commandBus.execute(new CreateBookCommand(dto.author, dto.title, dto.ISBN, dto.year))
  }
}
