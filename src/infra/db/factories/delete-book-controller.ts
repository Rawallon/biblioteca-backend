import { Controller } from '../../../presentation/protocols/controller'
import { makeDbGetBookById } from './get-by-id-book'
import { DeleteBookController } from '../../../presentation/controllers/delete-book'
import { makeDbDeleteBook } from './delete-book'

export const makeDeleteBookController = (): Controller => {
  const controller = new DeleteBookController(
    makeDbGetBookById(),
    makeDbDeleteBook()
  )
  return controller
}
