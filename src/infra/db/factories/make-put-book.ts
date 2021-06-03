import { PutBookController } from '../../../presentation/controllers/put-book'
import { Controller } from '../../../presentation/protocols/controller'
import { makeDbPutBook } from './make-db-put-book-controller'
import { makeDbGetBookById } from './make-db-get-by-id-book-controller'

export const makePutBookController = (): Controller => {
  const controller = new PutBookController(makeDbGetBookById(), makeDbPutBook())
  return controller
}
