import jwt = require('jsonwebtoken')

const SECRET = 'secret'

class Tokens {
  accessToken: string
  refreshToken: string
}

export class Token {
  static create(email: string, firstname: string, lastname: string): Tokens {
    const accessToken = this.createToken(email, firstname, lastname, 1)

    const refreshToken = this.createToken(email, firstname, lastname, 24)

    return { accessToken, refreshToken }
  }

  private static createToken(email: string, firstname: string, lastname: string, time: number): string {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * time,
        data: {
          email,
          firstname,
          lastname,
        },
      },
      SECRET,
    )
  }
}
