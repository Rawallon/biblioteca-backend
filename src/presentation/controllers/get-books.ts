import { sendError, sendOk } from '../helper/http-helper'
import { GetBooks } from '../../domain/usecases/get-books'
import { ServerError } from '../errors/server-error'
import { Controller } from '../protocols/controller'
import { HttpResponse } from '../protocols/http'

export class GetBookController implements Controller {
  constructor (private readonly GetBooks: GetBooks) {}

  async handle (): Promise<HttpResponse> {
    try {
      const allBooks = await this.GetBooks.getBooks()
      return sendOk(allBooks)
    } catch (error) {
      return sendError(500, new ServerError())
    }
  }
}
