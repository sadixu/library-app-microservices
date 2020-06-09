import { Controller, Inject, Get, Post, Res, Body, HttpStatus } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'

import { CreateUserDTO } from '../dtos/create-user.dto'
import { RegisterUserCommand } from '../commands/impl/register-user.command'
const { SERVICE_NAME } = process.env

@Controller('user')
export class UsersController {
  constructor(
    @Inject(SERVICE_NAME) private readonly client: ClientProxy,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    Logger.log('User controller is up and fresh.')
  }

  @Post()
  async registerUser(@Res() res, @Body() dto: CreateUserDTO) {
    const result = await this.commandBus.execute(
      new RegisterUserCommand(dto.firstname, dto.lastname, dto.email, dto.age, dto.password),
    )

    return res.send(result)
  }

  @Get()
  getHello() {
    console.log('test')
    this.client.emit<any>('message_printed', { text: 'test text' })
    return 'Hello World printed'
  }
}
