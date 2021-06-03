import { DbGetBook } from '../../../data/usecases/get-book'
import { GetBooks } from '../../../domain/usecases/get-books'
import { BookMongoRepository } from '../mongodb/book-mongo-repository'

export const makeDbGetBooks = (): GetBooks => {
  const bookMongoRepository = new BookMongoRepository()
  return new DbGetBook(bookMongoRepository)
}
