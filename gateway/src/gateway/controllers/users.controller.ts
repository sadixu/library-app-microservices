import { Controller, Inject, Get, Post, Res, Body, Logger } from '@nestjs/common'
import { EventPattern, ClientProxy, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'

const { SERVICE_NAME } = process.env

@Controller('user')
export class UsersController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy) {
    Logger.log('Gateway is up and fresh.')
  }

  @Post()
  async registerUser(@Res() res, @Body() dto: any) {
    const messageObservable = this.client.send<any>('register-user', { ...dto })

    const messagePromise = new Promise((resolve, reject) => {
      messageObservable.subscribe({
        next(value) {
          resolve(value)
        },
      })
    })

    const messageResponse = await messagePromise

    return res.send(messageResponse)
  }

  @Post('/session')
  async loginUser(@Res() res, @Body() dto: any) {
    const messageObservable = this.client.send<any>('login', { ...dto })

    const messagePromise = new Promise((resolve, reject) => {
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
