import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

@Injectable()
export class RentService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async authorize(accessToken: string) {}

  async rentBook(dto: any) {}
}
