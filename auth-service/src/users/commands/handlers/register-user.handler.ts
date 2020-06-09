import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { UserRepository } from '../../repositories/user.repository'

import { RegisterUserCommand } from '../impl/register-user.command'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(private readonly repository: UserRepository, private readonly publisher: EventPublisher) {}

  async execute(command: RegisterUserCommand) {
    console.log('registering user')
    const { firstname, lastname, email, age, password } = command

    const user = await this.repository.addUser({ firstname, lastname, email, age, password })

    return user
    /*
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly age: number,
    public readonly password: string,
    */
    // const hero = this.publisher.mergeObjectContext(await this.repository.findOneById(+heroId))
    // hero.killEnemy(dragonId)
    // hero.commit()
  }
}
