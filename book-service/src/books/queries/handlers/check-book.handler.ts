import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { BookRepository } from '../../repositories/book.repository'
import { CheckBookQuery } from '../impl/check-book.query'
import { CheckBookDTO } from '../../dtos/check-book.dto'

@QueryHandler(CheckBookQuery)
export class CheckBookHandler implements IQueryHandler<CheckBookQuery> {
  constructor(private readonly repository: BookRepository) {}

  async execute(query: CheckBookDTO) {
    console.log(1)

    const book = await this.repository.findOne(query.bookId)

    if (!book) {
      return 0
    }

    return 1
  }
}
