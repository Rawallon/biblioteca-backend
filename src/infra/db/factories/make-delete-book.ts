import { Controller } from '../../../presentation/protocols/controller'
import { makeDbGetBookById } from './make-db-get-by-id-book-controller'
import { DeleteBookController } from '../../../presentation/controllers/delete-book'
import { makeDbDeleteBook } from './make-db-delete-book-controller'

export const makeDeleteBookController = (): Controller => {
  const controller = new DeleteBookController(
    makeDbGetBookById(),
    makeDbDeleteBook()
  )
  return controller
}
