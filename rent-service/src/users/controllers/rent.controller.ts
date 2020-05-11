import { Controller, Inject, Get } from '@nestjs/common'
import { EventPattern, ClientProxy } from '@nestjs/microservices'
const { SERVICE_NAME } = process.env

@Controller()
export class RentController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy) {}

  @EventPattern('message_printed')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data.text)
  }
}
