import crypto = require('crypto')

const SALT = 'best_salt_2020'

export class Password {
  static createPassword(password: string) {
    if (!password) {
      throw new Error('Password cannot be set to null.')
    }

    return crypto.pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`)
  }
}
