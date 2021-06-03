import { AddBookController } from '../../../presentation/controllers/add-book'
import { Controller } from '../../../presentation/protocols/controller'
import { makeDbAddBook } from './add-book'

export const makeAddBookController = (): Controller => {
  const controller = new AddBookController(makeDbAddBook())
  return controller
}
