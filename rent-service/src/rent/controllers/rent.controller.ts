import { Controller, Inject, Get } from '@nestjs/common'
import { EventPattern, ClientProxy, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'
const { SERVICE_NAME } = process.env

@Controller('rental')
export class RentController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy) {}

  @Get()
  async getHello() {
    console.log('1. mam geta do API')
    // const test = await this.client.emit<any>('message_printed', { text: 'test text' })
    const test = this.client.send<any>('message_printed', { text: 'test text' })
    let blerp = null
    const testerinho = await test.subscribe({
      next(x) {
        console.log(x)
        return x
      },
      error(err) {
        console.error('something wrong occurred: ' + err)
      },
      complete() {
        console.log('done')
      },
    })
    console.log('2. jebnalem message do RMQ')
    console.log('3. obiekt jebniecia message:')
    console.log(testerinho)

    const test2 =  this.client.send<any>('message_printed2', { text: 'test text' })
    const testerinho2 = await test2.subscribe({
      next(x) {
        console.log(x)
        return x
      },
      error(err) {
        console.error('something wrong occurred: ' + err)
      },
      complete() {
        console.log('done')
      },
    })
    return 'Hello World printed'
  }
}
