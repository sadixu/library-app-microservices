import jwt = require('jsonwebtoken')

const SECRET = 'secret'

class Tokens {
  accessToken: string
  refreshToken: string
}

export class Token {
  static create(email: string, firstname: string, lastname: string): Tokens {
    const accessToken = this.createToken(email, firstname, lastname, 10)

    const refreshToken = this.createToken(email, firstname, lastname, 240)

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

  static checkAuthorization(accessToken: string) {
    const decoded = jwt.verify(accessToken, SECRET)
    const now = Math.floor(Date.now() / 1000) + 60 * 60

    if (decoded.exp < now) {
      return 0
    }

    return { result: 1, ...decoded}
  }
}
