import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { HttpException, HttpStatus } from '@nestjs/common'

import { UserRepository } from '../../repositories/user.repository'
import { LoginUserQuery } from '../impl/login-user.query'
import { User } from '../../models/User.model'

@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: LoginUserQuery) {
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

    const isPasswordCorrect = User.checkPassword(query.password, user.password)

    if (!isPasswordCorrect) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Incorrect password.',
        },
        HttpStatus.FORBIDDEN,
      )
    }
    
    //if no, error
    //if yes, new event
    return 'test'
  }
}
