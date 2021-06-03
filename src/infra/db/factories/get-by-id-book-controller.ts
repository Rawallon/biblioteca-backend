import { Controller } from '../../../presentation/protocols/controller'
import { makeDbGetBookById } from './get-by-id-book'
import { GetBookByIdController } from '../../../presentation/controllers/get-book-by-id'

export const makeGetBookByIdController = (): Controller => {
  const controller = new GetBookByIdController(makeDbGetBookById())
  return controller
}
