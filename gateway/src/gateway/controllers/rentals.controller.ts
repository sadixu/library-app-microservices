import { Controller, Inject, Post, Res, Get, Body, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

const { SERVICE_NAME } = process.env

@Controller('rental')
export class RentalsController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy) {
    Logger.log('Gateway for Books is up and fresh.')
  }

  @Post()
  async rentBook(@Res() res, @Body() dto: any) {
      console.log(dto)
      return res.send('siema tutaj rentBook')
    const messageObservable = this.client.send<any>('rent-book', { ...dto })

    const messagePromise = new Promise((resolve) => {
      messageObservable.subscribe({
        next(value) {
          resolve(value)
        },
      })
    })

    const messageResponse = await messagePromise

    return res.send(messageResponse)
  }

  @Get()
  async getRentals(@Res() res, @Body() dto: any) {
    return res.send('siema tutaj getRentals')

    const messageObservable = this.client.send<any>('get-rentals', { ...dto })

    const messagePromise = new Promise((resolve) => {
      messageObservable.subscribe({
        next(value) {
          resolve(value)
        },
      })
    })

    const messageResponse = await messagePromise

    return res.send(messageResponse)
  }
}
