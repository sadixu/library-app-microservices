import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { RentBookCommand } from '../commands/impl/rent-book.command'

@Injectable()
export class RentService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async rentBook(dto: any) {
    return this.commandBus.execute(new RentBookCommand(dto.bookId, dto.userId))
  }
}
