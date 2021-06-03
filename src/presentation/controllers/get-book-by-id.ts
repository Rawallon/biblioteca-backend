import { GetBookById } from '../../domain/usecases/get-book-by-id'
import { MissingFieldError } from '../errors/missing-field'
import { ServerError } from '../errors/server-error'
import { sendError, sendOk } from '../helper/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class GetBookByIdController implements Controller {
  constructor (private readonly GetBookById: GetBookById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      if (!id) {
        return sendError(400, new MissingFieldError('bookId'))
      }
      const fetchBook = await this.GetBookById.getBookById(id)
      if (!fetchBook) {
        return sendOk(null)
      }
      return sendOk(fetchBook)
    } catch (error) {
      return sendError(500, new ServerError())
    }
  }
}
