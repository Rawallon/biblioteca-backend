import { BookModel } from '../../domain/models/book'
import { GetBooks } from '../../domain/usecases/get-books'
import { GetBookRepository } from '../protocols/get-book-repository'

export class DbGetBook implements GetBooks {
  constructor (private readonly getBookRepository: GetBookRepository) {}

  async getBooks (): Promise<BookModel[]> {
    const allBooks = await this.getBookRepository.listAll()
    return allBooks
  }
}
