import { Controller, Inject, Post, Res, Body, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

const { SERVICE_NAME } = process.env

@Controller('book')
export class BooksController {
  constructor(@Inject(`${SERVICE_NAME}-BOOK`) private readonly client: ClientProxy) {
    Logger.log('Gateway for Books is up and fresh.')
  }

  @Post()
  async createBook(@Res() res, @Body() dto: any) {
    try {
      const messageObservable = this.client.send<any>('create-book', { ...dto })

      const messagePromise = new Promise((resolve) => {
        messageObservable.subscribe({
          next(value) {
            resolve(value)
          },
        })
      })

      const messageResponse = await messagePromise

      return res.send(messageResponse)
    } catch (error) {
      return res.send(error.message)
    }
  }
}
