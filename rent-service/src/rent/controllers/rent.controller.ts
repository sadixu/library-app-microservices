import { Controller, Inject, Logger } from '@nestjs/common'
import { ClientProxy, EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'

import { RentService } from '../services/rent.service'

const { SERVICE_NAME } = process.env

export class RentalController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy, private readonly service: RentService) {
    Logger.log('Constructor is alive')
  }



  @EventPattern('rent-book')
  async createBook(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data)

    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)


    return this.service.rentBook(data)
  }
}
