import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

@Injectable()
export class RentService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async authorize(accessToken: string) {}

  async rentBook(dto: any) {
    console.log(dto)

    return 1
    /*
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)

    try {
      // const result = await this.service.createBook(data)
      const result = 2
      return { result }
    } catch (error) {
      return { error }
    }

    */
  }
}
