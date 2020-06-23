import { Controller, Inject, Post, Res, Get, Body, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

const { SERVICE_NAME } = process.env

@Controller('rental')
export class RentalsController {
  constructor(
    @Inject(`${SERVICE_NAME}-RENT`) private readonly client: ClientProxy,
    @Inject(`${SERVICE_NAME}-AUTH`) private readonly userClient: ClientProxy,
    @Inject(`${SERVICE_NAME}-BOOK`) private readonly bookClient: ClientProxy,
  ) {
    Logger.log('Gateway for Books is up and fresh.')
  }

  @Post()
  async rentBook(@Res() res, @Body() dto: any) {
    try {
      const userObservable = this.userClient.send<any>('authorize', { ...dto })

      const userPromise = new Promise((resolve) => {
        userObservable.subscribe({
          next(value) {
            resolve(value)
          },
        })
      })

      const userResponse: any = await userPromise

      if (!userResponse.result) {
        return res.send('You are not authorized to make this operation')
      }

      const bookObservable = this.bookClient.send<any>('check-book', { bookId: dto.bookId })

      const bookPromise = new Promise((resolve) => {
        bookObservable.subscribe({
          next(value) {
            resolve(value)
          },
        })
      })

      const bookResponse: any = await bookPromise

      if (!bookResponse.result) {
        return res.send('Book with given ID does not exist')
      }

      
      const messageObservable = this.client.send<any>('rent-book', { bookId: dto.bookId, userId: userResponse.id })

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

  @Get()
  async getRentals(@Res() res, @Body() dto: any) {
    try {
      const userObservable = this.userClient.send<any>('authorize', { ...dto })

      const userPromise = new Promise((resolve) => {
        userObservable.subscribe({
          next(value) {
            resolve(value)
          },
        })
      })

      const userResponse: any = await userPromise

      if (!userResponse.result) {
        return res.send('You are not authorized to make this operation')
      }

      const messageObservable = this.client.send<any>('rent-book', { bookId: dto.bookId, userId: userResponse.id })

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
}
