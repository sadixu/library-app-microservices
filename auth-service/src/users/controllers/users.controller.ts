import { Controller, Inject, Get, Post, Res, Body, HttpStatus } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { UserService } from '../services/user.service'
import { CreateUserDTO } from '../dtos/create-user.dto'

const { SERVICE_NAME } = process.env

@Controller()
export class UsersController {
  constructor(@Inject(SERVICE_NAME) private readonly client: ClientProxy, private userService: UserService) {
    console.log('im created')
  }

  @Post('/create')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    console.log('im called')
    const user = await this.userService.addUser(createUserDTO)
    
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      user,
    })
  }

  @Get()
  getHello() {
    console.log('test')
    this.client.emit<any>('message_printed', { text: 'test text' })
    return 'Hello World printed'
  }
}
