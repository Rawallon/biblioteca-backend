import { BookModel } from '../../domain/models/book'
import { GetBookById } from '../../domain/usecases/get-book-by-id'
import { GetBookByIdRepository } from '../protocols/get-book-by-id-repository'

export class DbGetBookById implements GetBookById {
  constructor (private readonly GetBookByIdRepository: GetBookByIdRepository) {}

  async getBookById (bookId: string): Promise<BookModel | null> {
    return await this.GetBookByIdRepository.getBookById(bookId)
  }
}
