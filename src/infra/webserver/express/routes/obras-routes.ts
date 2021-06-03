import { Router } from 'express'
import { makeAddBookController } from '../../../db/factories/make-add-book'
import { makeGetBooksController } from '../../../db/factories/make-get-books-controller'
import { makePutBookController } from '../../../db/factories/make-put-book'
import { adaptRoute } from '../adapter/route-adpter'

export default function obrasRoute (router: Router): void {
  router.get('/obras', adaptRoute(makeGetBooksController()))
  router.post('/obras', adaptRoute(makeAddBookController()))
  router.put('/obras/:id', adaptRoute(makePutBookController()))
}
