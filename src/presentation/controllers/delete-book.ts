import { GetBookById } from '../../domain/usecases/get-book-by-id'
import { DeleteBook } from '../../domain/usecases/delete-book'
import { MissingFieldError } from '../errors/missing-field'
import { ServerError } from '../errors/server-error'
import { sendError, sendOk } from '../helper/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class DeleteBookController implements Controller {
  constructor (
    private readonly GetBookById: GetBookById,
    private readonly DeleteBook: DeleteBook
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      if (!id) {
        return sendError(400, new MissingFieldError('bookId'))
      }
      const exists = await this.GetBookById.getBookById(id)
      if (!exists) {
        return sendError(404, new MissingFieldError('bookId'))
      }
      return sendOk(await this.DeleteBook.delete(id))
    } catch (error) {
      return sendError(500, new ServerError())
    }
  }
}
