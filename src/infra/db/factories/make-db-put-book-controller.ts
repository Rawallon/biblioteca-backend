import { DbPutBook } from '../../../data/usecases/put-book'
import { PutBook } from '../../../domain/usecases/put-book'
import { BookMongoRepository } from '../mongodb/book-mongo-repository'

export const makeDbPutBook = (): PutBook => {
  const bookMongoRepository = new BookMongoRepository()
  return new DbPutBook(bookMongoRepository)
}
