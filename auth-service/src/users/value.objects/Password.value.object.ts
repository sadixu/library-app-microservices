import crypto = require('crypto')

const SALT = 'best_salt_2020'

export class Password {
  static createPassword(password: string) {
    return crypto.pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`)
  }
}
