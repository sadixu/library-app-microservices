import { AggregateRoot } from '@nestjs/cqrs'

import { Password } from '../value.objects/Password.value.object'
import { Email } from '../value.objects/Email.value.object'
import { Token } from '../value.objects/Token.value-object'

export class User extends AggregateRoot {
  constructor(
    public firstname: string,
    public lastname: string,
    public age: number,
    public password: string,
    public email: string,
    public register: boolean,
    public accessToken?: string,
    public refreshToken?: string,
  ) {
    super()

    this.createUser(firstname, lastname, age, password, email, register, accessToken, refreshToken)
  }

  createUser(
    firstname: string,
    lastname: string,
    age: number,
    password: string,
    email: string,
    register: boolean,
    accessToken?: string,
    refreshToken?: string,
  ) {
    this.firstname = this.createFirstname(firstname)
    this.lastname = this.createLastname(lastname)
    this.age = this.createAge(age)
    this.password = register ? Password.createPassword(password) : password
    this.email = Email.createEmail(email)
    if (!accessToken && !refreshToken) {
      this.accessToken = null
      this.refreshToken = null
    }
  }

  createFirstname(firstname: string): string {
    return firstname
  }

  createLastname(lastname: string): string {
    return lastname
  }

  createAge(age: number): number {
    return age
  }

  login(enteredPassword: string): { accessToken: string; refreshToken: string } {
    const isPasswordValid = Password.checkPassword(enteredPassword, this.password)

    if (!isPasswordValid) {
      throw new Error('Invalid password passed.')
    }

    return Token.create(this.email, this.firstname, this.lastname)
  }

  confirmAuthorization() {
    return Token.checkAuthorization(this.accessToken)
  }

  static checkPassword(enteredPassword: string, password: string): boolean {
    return Password.checkPassword(enteredPassword, password)
  }
}
