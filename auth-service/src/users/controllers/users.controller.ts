import { Controller, Inject, Get } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
const { SERVICE_NAME } = process.env

@Controller()
export class UsersController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy) {
    console.log('im created')
  }

  @Get()
  getHello() {
    console.log('test')
    this.client.emit<any>('message_printed', { text: 'test text' })
    return 'Hello World printed'
  }
}
