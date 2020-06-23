import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs'
import { HttpException, HttpStatus } from '@nestjs/common'

import { RentBookCommand } from '../impl/rent-book.command'
import { Rental } from '../../models/Rental.model'
import { RentRepository } from '../../repositories/rent.repository'

@CommandHandler(RentBookCommand)
export class RentBookHandler implements ICommandHandler<RentBookCommand> {
  constructor(private readonly repository: RentRepository, private readonly publisher: EventPublisher) {}

  async execute(command: RentBookCommand) {
    try {
      const rental = new Rental(command.bookId, command.userId)

      return this.repository.addOne({ bookId: rental.bookId, userId: rental.userId })
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
