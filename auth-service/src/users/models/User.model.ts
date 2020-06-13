import { AggregateRoot } from '@nestjs/cqrs'

import { Password } from '../value.objects/Password.value.object'
import { Email } from '../value.objects/Email.value.object'

export class User extends AggregateRoot {
  constructor(
    public firstname: string,
    public lastname: string,
    public age: number,
    public password: string,
    public email: string,
  ) {
    super()

    this.createUser(firstname, lastname, age, password, email)
  }

  createUser(firstname: string, lastname: string, age: number, password: string, email: string) {
    this.firstname = this.createFirstname(firstname)
    this.lastname = this.createLastname(lastname)
    this.age = this.createAge(age)
    this.password = Password.createPassword(password)
    this.email = Email.createEmail(email)
  }

  createFirstname(firstname: string): string {
    if (!firstname) {
      throw new Error('Firstname cannot be empty when creating new user')
    }

    return firstname
  }

  createLastname(lastname: string): string {
    if (!lastname) {
      throw new Error('Lastname cannot be empty when creating new user')
    }

    return lastname
  }

  createAge(age: number): number {
    if (age < 14) {
      throw new Error('Age must be bigger than 14')
    }

    return age
  }
}
