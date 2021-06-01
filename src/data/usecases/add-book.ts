import { BookModel } from '../../domain/models/book'
import { AddBook, AddBookModel } from '../../domain/usecases/add-book'
import { AddBookRepository } from '../protocols/add-book-repository'

export class DbAddBook implements AddBook {
  constructor (private readonly addBookRepository: AddBookRepository) {}

  async add (bookData: AddBookModel): Promise<BookModel> {
    const book = await this.addBookRepository.add(bookData)
    return book
  }
}
