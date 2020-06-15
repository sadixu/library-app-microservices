import { IsEmail, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty()
  readonly author: string

  @IsNotEmpty()
  readonly title: string

  @IsNotEmpty()
  readonly ISBN: string

  @IsNotEmpty()
  @Min(1900)
  @Max(2021)
  readonly year: number
}
