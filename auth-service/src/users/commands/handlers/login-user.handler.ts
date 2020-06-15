import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs'
import { HttpException, HttpStatus } from '@nestjs/common'

import { UserRepository } from '../../repositories/user.repository'
import { LoginUserCommand } from '../impl/login-user.command'
import { User } from '../../models/User.model'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private readonly repository: UserRepository, private readonly publisher: EventPublisher) {}

  async execute(command: LoginUserCommand) {
    try {
      const user = await this.repository.findByEmail(command.email)

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'User does not exist in database',
          },
          HttpStatus.BAD_REQUEST,
        )
      }

      const userObject = new User(user.firstname, user.lastname, user.age, user.password, user.email, false)

      const { accessToken, refreshToken } = userObject.login(command.password)

      return this.repository.updateUser(user._id, { accessToken, refreshToken })
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }
}
