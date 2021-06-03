import { GetBookController } from '../../../presentation/controllers/get-books'
import { Controller } from '../../../presentation/protocols/controller'
import { makeDbGetBooks } from './get-books'

export const makeGetBooksController = (): Controller => {
  const controller = new GetBookController(makeDbGetBooks())
  return controller
}
