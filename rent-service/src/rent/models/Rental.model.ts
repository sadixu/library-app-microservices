import { AggregateRoot } from '@nestjs/cqrs'

export class Rental extends AggregateRoot {
  constructor(public bookId: string, public userId: string, public active?: boolean) {
    super()

    this.createRental(bookId, userId)
  }

  createRental(bookId: string, userId: string) {
    this.bookId = this.associateBook(bookId)
    this.userId = this.associateUser(userId)
    this.active = true
  }

  associateBook(bookId: string) {
    if (!bookId) {
      throw new Error('Book ID cannot be empty')
    }

    return bookId
  }

  associateUser(userId: string) {
    if (!userId) {
      throw new Error('User ID cannot be empty')
    }

    return userId
  }

  returnBook() {
    this.active = false
  }
}
