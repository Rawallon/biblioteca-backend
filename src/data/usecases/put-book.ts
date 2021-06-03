import { BookModel } from '../../domain/models/book'
import { PutBook, PutBookModel } from '../../domain/usecases/put-book'
import { PutBookRepository } from '../protocols/put-book-repository'

export class DbPutBook implements PutBook {
  constructor (private readonly PutBookRepository: PutBookRepository) {}
  async update (bookId: string, book: PutBookModel): Promise<BookModel> {
    return await this.PutBookRepository.update(bookId, book)
  }
}
