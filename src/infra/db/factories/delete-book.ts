import { DbDeleteBook } from '../../../data/usecases/delete-book'
import { DeleteBook } from '../../../domain/usecases/delete-book'
import { BookMongoRepository } from '../mongodb/book-mongo-repository'

export const makeDbDeleteBook = (): DeleteBook => {
  const bookMongoRepository = new BookMongoRepository()
  return new DbDeleteBook(bookMongoRepository)
}
