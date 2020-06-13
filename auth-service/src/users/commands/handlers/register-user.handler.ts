import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { HttpException, HttpStatus } from '@nestjs/common'

import { UserRepository } from '../../repositories/user.repository'
import { RegisterUserCommand } from '../impl/register-user.command'
import { User } from '../../models/User.model'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(private readonly repository: UserRepository, private readonly publisher: EventPublisher) {}

  async execute(command: RegisterUserCommand) {
    try {
      const { firstname, lastname, email, age, password } = command

      const userObject = new User(firstname, lastname, age, password, email)

      const user = await this.repository.addUser({
        firstname: userObject.firstname,
        lastname: userObject.lastname,
        email: userObject.email,
        age: userObject.age,
        password: userObject.password,
      })

      return user
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }
}
