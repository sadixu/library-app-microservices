import { Controller, Inject, Get, Post, Res, Body, Logger } from '@nestjs/common'
import { EventPattern, ClientProxy, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'

import { UserService } from '../services/user.service'

const { SERVICE_NAME } = process.env

@Controller('user')
export class UsersController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy, private readonly service: UserService) {
    Logger.log('User controller is up and fresh.')
  }

  @MessagePattern('register-user')
  async registerUserEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)

    try {
      const result = await this.service.registerUser(data)

      return { result }
    } catch (error) {
      return { error }
    }
  }

  @MessagePattern('login')
  async loginUser(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)

    try {
      const result = await this.service.login(data)

      return { result }
    } catch (error) {
      return { error }
    }
  }
}
