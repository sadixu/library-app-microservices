import { IQueryHandler, QueryHandler, EventPublisher } from '@nestjs/cqrs'
import { HttpException, HttpStatus } from '@nestjs/common'

import { UserRepository } from '../../repositories/user.repository'
import { LoginUserQuery } from '../impl/login-user.query'
import { User } from '../../models/User.model'

@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: LoginUserQuery) {
    try {
      const user = await this.repository.findByEmail(query.email)

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

      return userObject.login(query.password)
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
