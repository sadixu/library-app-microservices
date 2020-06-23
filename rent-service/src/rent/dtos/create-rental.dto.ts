import { IsNotEmpty } from 'class-validator'

export class CreateRentalDTO {
  @IsNotEmpty()
  readonly bookId: string

  @IsNotEmpty()
  readonly userId: string
}
