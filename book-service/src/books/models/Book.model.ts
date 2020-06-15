import { AggregateRoot } from '@nestjs/cqrs'

export class Book extends AggregateRoot {
  constructor(public title: string, public author: string, public year: number, public ISBN: string) {
    super()

    this.createBook(title, author, year, ISBN)
  }

  createBook(title: string, author: string, year: number, ISBN: string) {
    this.title = this.createTitle(title)
    this.author = this.createAuthor(author)
    this.year = this.createYear(year)
    this.ISBN = this.createISBN(ISBN)
  }

  createTitle(title: string): string {
    return title
  }

  createAuthor(author: string): string {
    return author
  }

  createYear(year: number): number {
    return year
  }

  createISBN(ISBN: string): string {
    return ISBN
  }
}
