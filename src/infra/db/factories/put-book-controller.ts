import { PutBookController } from '../../../presentation/controllers/put-book'
import { Controller } from '../../../presentation/protocols/controller'
import { makeDbPutBook } from './put-book'
import { makeDbGetBookById } from './get-by-id-book'

export const makePutBookController = (): Controller => {
  const controller = new PutBookController(makeDbGetBookById(), makeDbPutBook())
  return controller
}
