import { IsNotEmpty } from 'class-validator'

export class AuthorizeDTO {
  @IsNotEmpty()
  readonly authorizationToken: string
}
