import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { BookRepository } from '../../repositories/book.repository'
import { CreateBookCommand } from '../impl/create-book.command'

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private readonly repository: BookRepository, private readonly publisher: EventPublisher) {}

  async execute(command: CreateBookCommand) {
    return this.repository.addBook(command)
  }
}
