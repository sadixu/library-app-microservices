import * as EmailValidator from 'email-validator'

export class Email {
  static createEmail(email: string) {
    if (!email) {
      throw new Error('Email cannot be set to null.')
    }

    if (!EmailValidator.validate(email)) {
      throw new Error('Email must be set to correct format')
    }

    return email
  }
}
