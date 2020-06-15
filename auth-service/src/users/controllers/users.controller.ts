import { Controller, Inject, Get, Post, Res, Body, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { CreateUserDTO } from '../dtos/create-user.dto'
import { LoginUserDTO } from '../dtos/login-user.dto'
import { UserService } from '../services/user.service'

const { SERVICE_NAME } = process.env

@Controller('user')
export class UsersController {
  constructor(
    @Inject(SERVICE_NAME) private readonly client: ClientProxy,
    private readonly service: UserService,
  ) {
    Logger.log('User controller is up and fresh.')
  }

  @Post()
  async registerUser(@Res() res, @Body() dto: CreateUserDTO) {
    const result = await this.service.registerUser(dto)

    return res.send(result)
  }

  @Post('/session')
  async loginUser(@Res() res, @Body() dto: LoginUserDTO) {
    const result = await this.service.login(dto)

    return res.send(result)
  }

  @Get()
  getHello() {
    console.log('test')
    this.client.emit<any>('message_printed', { text: 'test text' })
    return 'Hello World printed'
  }
}
