export class CreateBookCommand {
  constructor(
    public readonly author: string,
    public readonly title: string,
    public readonly ISBN: string,
    public readonly year: number,
  ) {}
}
