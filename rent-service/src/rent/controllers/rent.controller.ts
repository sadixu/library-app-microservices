import { Controller, Inject, Get } from '@nestjs/common'
import { EventPattern, ClientProxy, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'
const { SERVICE_NAME } = process.env

@Controller('rental')
export class RentController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy) {}

  @Get()
  async getHello() {
    const messagePromise = this.client.send<any>('message_printed', { text: 'test text' })

    const chybaZadziala = new Promise((resolve) => {
      messagePromise.subscribe({
        next(consumerResponse) {
          resolve(consumerResponse)
        },
      })
    })

    const zobaczmyWiec = await chybaZadziala
    console.log('zobaczmyWiec is')
    console.log(zobaczmyWiec)

    return zobaczmyWiec
  }
}
