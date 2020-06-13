import * as EmailValidator from 'email-validator'

export class Email {
  static createEmail(email: string) {
    if (!EmailValidator.validate(email)) {
      throw new Error('Email must be set to correct format')
    }

    return email
  }
}
