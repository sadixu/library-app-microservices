import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { RentRepository } from '../../repositories/rent.repository'
import { GetRentalsQuery } from '../impl/get-rentals.query'
import { GetRentalsDTO } from '../../dtos/get-rental.dto'

@QueryHandler(GetRentalsQuery)
export class GetRentalsHandler implements IQueryHandler<GetRentalsQuery> {
  constructor(private readonly repository: RentRepository) {}

  async execute(query: GetRentalsDTO) {
    const rentals = await this.repository.findAllByUser(query.userId)

    return rentals
  }
}
