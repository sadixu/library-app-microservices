import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class CreateBookMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (req.headers.customauth !== 'enabled') {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'You are not allowed to make this operation.',
        },
        HttpStatus.FORBIDDEN,
      )
    }
    next()
  }
}
