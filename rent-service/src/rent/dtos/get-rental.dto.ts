import { IsNotEmpty } from 'class-validator'

export class GetRentalsDTO {
  @IsNotEmpty()
  readonly userId: string
}
