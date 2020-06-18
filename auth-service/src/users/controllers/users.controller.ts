import { Controller, Inject, Get, Post, Res, Body, Logger } from '@nestjs/common'
import { EventPattern, ClientProxy, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'

import { CreateUserDTO } from '../dtos/create-user.dto'
import { LoginUserDTO } from '../dtos/login-user.dto'
import { UserService } from '../services/user.service'
import { CommandHandlerNotFoundException } from '@nestjs/cqrs'

const { SERVICE_NAME } = process.env

@Controller('user')
export class UsersController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy, private readonly service: UserService) {
    Logger.log('User controller is up and fresh.')
  }

  @Post()
  async registerUser(@Res() res, @Body() dto: CreateUserDTO) {
    const result = await this.service.registerUser(dto)

    return res.send(result)
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

  @EventPattern('message_printed')
  async getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('4. dostalem message, ', data.text)

    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)
    console.log('5. zrobilem acknowledge')
    return 112
  }

  @EventPattern('message_printed2')
  async getNotifications2(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('4. dostalem message, ', data.text)

    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)
    console.log('5. zrobilem acknowledge')
    return 113
  }
}
