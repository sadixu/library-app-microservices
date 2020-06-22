import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { UserRepository } from '../../repositories/user.repository'
import { AuthorizeQuery } from '../impl/authorize.query'
import { User } from '../../models/User.model'

@QueryHandler(AuthorizeQuery)
export class AuthorizeHandler implements IQueryHandler<AuthorizeQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: any) {
    const user = await this.repository.findByToken(query.authorizationToken)

    if (!user) {
      return 0
    }

    const userObject = new User(
      user.firstname,
      user.lastname,
      user.age,
      user.password,
      user.email,
      false,
      user.accessToken,
      user.refreshToken,
    )

    const result = await userObject.confirmAuthorization()

    return { id: user._id, ...result}
  }
}
