import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Rental } from '../interfaces/rental.interface'
import { CreateRentalDTO } from '../dtos/create-rental.dto'
import { GetRentalsDTO } from '../dtos/get-rental.dto'

@Injectable()
export class RentRepository {
  constructor(@InjectModel('Rental') private readonly rentalModel: Model<Rental>) {}

  async findByUser(userId: string): Promise<Rental> {
    return this.rentalModel.findOne({ userId })
  }

  async addOne(rentBookDTO: CreateRentalDTO): Promise<Rental> {
    const newRental = await this.rentalModel(rentBookDTO)
    const rental = newRental.save()

    return rental
  }

  async findAllByUser(userId: string): Promise<{rentals: Rental[], amount: Number}> {
    const rentals = await this.rentalModel.find({ userId })

    return { rentals, amount: rentals.length}
  }
}
