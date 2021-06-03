import { Router } from 'express'
import { makeAddBookController } from '../../../db/factories/add-book-controller'
import { makeDeleteBookController } from '../../../db/factories/delete-book-controller'
import { makeGetBooksController } from '../../../db/factories/get-books-controller'
import { makeGetBookByIdController } from '../../../db/factories/get-by-id-book-controller'
import { makePutBookController } from '../../../db/factories/put-book-controller'
import { adaptRoute } from '../adapter/route-adpter'

export default function obrasRoute (router: Router): void {
  router.get('/obras', adaptRoute(makeGetBooksController()))
  router.post('/obras', adaptRoute(makeAddBookController()))
  router.put('/obras/:id', adaptRoute(makePutBookController()))
  router.delete('/obras/:id', adaptRoute(makeDeleteBookController()))
}
