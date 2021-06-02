import { DbAddBook } from '../../../data/usecases/add-book'
import { AddBook } from '../../../domain/usecases/add-book'
import { BookMongoRepository } from '../mongodb/book-mongo-repository'

export const makeDbAddBook = (): AddBook => {
  const bookMongoRepository = new BookMongoRepository()
  return new DbAddBook(bookMongoRepository)
}
