import { Controller, Inject, Logger } from '@nestjs/common'
import { ClientProxy, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'

import { RentService } from '../services/rent.service'

const { SERVICE_NAME } = process.env

export class RentalController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy, private readonly service: RentService) {
    Logger.log('Constructor is alive')
  }

  @MessagePattern('rent-book')
  async createBook(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)

    return this.service.rentBook(data)
  }

  @MessagePattern('get-rentals')
  async getRentals(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)

    return this.service.getRentals(data)
  }
}
