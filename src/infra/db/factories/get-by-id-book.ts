import { DbGetBookById } from '../../../data/usecases/get-book-by-id'
import { GetBookById } from '../../../domain/usecases/get-book-by-id'
import { BookMongoRepository } from '../mongodb/book-mongo-repository'

export const makeDbGetBookById = (): GetBookById => {
  const bookMongoRepository = new BookMongoRepository()
  return new DbGetBookById(bookMongoRepository)
}
