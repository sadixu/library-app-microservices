import { IsNotEmpty, Min, Max } from 'class-validator'

export class CheckBookDTO {
  @IsNotEmpty()
  readonly bookId: string
}
