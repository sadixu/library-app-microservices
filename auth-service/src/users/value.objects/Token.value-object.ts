import jwt = require('jsonwebtoken')

const SECRET = 'secret'

export class Token {
  static create(email, firstname, lastname) {
    const accessToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          email,
          firstname,
          lastname,
        },
      },
      SECRET,
    )

    const refreshToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 10000) + 60 * 60,
        data: {
          email,
          firstname,
          lastname,
        },
      },
      SECRET,
    )

    return { accessToken, refreshToken }
  }
}
