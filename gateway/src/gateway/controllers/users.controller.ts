import { Controller, Inject, Post, Res, Body, Logger, Delete, Get } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

const { SERVICE_NAME } = process.env

@Controller('user')
export class UsersController {
  constructor(@Inject(`${SERVICE_NAME}-AUTH`) private readonly client: ClientProxy) {
    Logger.log('Gateway for Users is up and fresh.')
  }

  @Post()
  async registerUser(@Res() res, @Body() dto: any) {
    try {
      const messageObservable = this.client.send<any>('register-user', { ...dto })

      const messagePromise = new Promise((resolve) => {
        messageObservable.subscribe({
          next(value) {
            resolve(value)
          },
        })
      })

      const messageResponse = await messagePromise

      return res.send(messageResponse)
    } catch (err) {
      return res.send(err)
    }
  }

  @Post('/session')
  async loginUser(@Res() res, @Body() dto: any) {
    try {
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
    } catch (err) {
      return res.send(err)
    }
  }

  @Get('/auth')
  async authorizeUser(@Res() res, @Body() dto: any) {
    const messageObservable = this.client.send<any>('authorize', { ...dto })

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

  @Delete('/session')
  async logoutUser(@Res() res, @Body() dto: any) {
    const messageObservable = this.client.send<any>('logout', { ...dto })

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
