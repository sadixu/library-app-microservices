import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { HttpException, HttpStatus } from '@nestjs/common'

import { UserRepository } from '../repositories/user.repository'

import { RegisterUserCommand } from '../commands/impl/register-user.command'
import { CreateUserDTO } from '../dtos/create-user.dto'

import { LoginUserCommand } from '../commands/impl/login-user.command'
import { LoginUserDTO } from '../dtos/login-user.dto'

import { AuthorizeQuery } from '../queries/impl/authorize.query'
import { AuthorizeDTO } from '../dtos/authorize.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly repository: UserRepository,
  ) {}

  async registerUser(dto: CreateUserDTO) {
    const user = await this.repository.findByEmail(dto.email)

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User with this email already exists within the database.',
        },
        HttpStatus.FORBIDDEN,
      )
    }

    return this.commandBus.execute(
      new RegisterUserCommand(dto.firstname, dto.lastname, dto.email, dto.age, dto.password),
    )
  }

  async login(dto: LoginUserDTO) {
    return this.commandBus.execute(new LoginUserCommand(dto.email, dto.password))
  }

  async authorizeUser(dto: AuthorizeDTO) {
    return this.queryBus.execute(new AuthorizeQuery(dto.authorizationToken))
  }
}
