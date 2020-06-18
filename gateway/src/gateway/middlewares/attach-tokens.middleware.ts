import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class AttachTokensMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    req.body.authorizationToken = req.headers.authorization

    next()
  }
}
