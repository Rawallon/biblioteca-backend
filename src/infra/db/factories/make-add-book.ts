import { AddBookController } from '../../../presentation/controllers/add-book'
import { Controller } from '../../../presentation/protocols/controller'
import { makeDbAddBook } from './make-db-add-book-controller'

export const makeAddBookController = (): Controller => {
  const controller = new AddBookController(makeDbAddBook())
  return controller
}
