export class RegisterUserCommand {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly age: number,
    public readonly password: string,
  ) {}
}
