import { IsEmail, IsNotEmpty, Min, Max } from 'class-validator'

export class UpdateUserDTO {
  @IsNotEmpty()
  readonly firstname?: string

  @IsNotEmpty()
  readonly lastname?: string

  @IsNotEmpty()
  @IsEmail()
  readonly email?: string

  @IsNotEmpty()
  @Min(14)
  @Max(120)
  readonly age?: number

  @IsNotEmpty()
  readonly password?: string

  @IsNotEmpty()
  readonly accessToken?: string

  @IsNotEmpty()
  readonly refreshToken?: string
}
