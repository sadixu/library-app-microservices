import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Book } from '../interfaces/book.interface'
import { CreateBookDTO } from '../dtos/create-book.dto'

@Injectable()
export class BookRepository {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async getAllUser(): Promise<Book[]> {
    const books = await this.bookModel.find().exec()

    return books
  }

  async findOne(bookID: string): Promise<Book> {
    console.log(bookID)

    const book = await this.bookModel.findById(bookID).exec()

    return book
  }

  async addBook(createBookDTO: CreateBookDTO): Promise<Book> {
    const newBook = await this.bookModel(createBookDTO)
    const book = newBook.save()

    return book
  }

  async deleteBook(bookID: string): Promise<any> {
    const deletedBook = await this.bookModel.findByIdAndRemove(bookID)
    return deletedBook
  }
}
