import { Controller, Inject, Post, Res, Body, Logger, Get } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import axios from 'axios'

const { SERVICE_NAME } = process.env

@Controller('commerce')
export class CommerceController {
  constructor(@Inject(`${SERVICE_NAME}-BOOK`) private readonly client: ClientProxy) {
    Logger.log('Gateway for Commerce is up and fresh.')
  }

  @Get('/shipment')
  async getShipments(@Res() res, @Body() dto: any) {
    try {
      
    } catch (error) {
      return res.send(error.message)
    }
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
