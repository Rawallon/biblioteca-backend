import { sendError, sendOk } from '../helper/http-helper'
import { AddBook } from '../../domain/usecases/add-book'
import { MissingFieldError } from '../errors/missing-field'
import { ServerError } from '../errors/server-error'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class AddBookController implements Controller {
  constructor (private readonly AddBook: AddBook) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['title', 'editor', 'picture', 'authors']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return sendError(400, new MissingFieldError(field))
        }
      }
      const { title, editor, picture, authors } = httpRequest.body
      const addedBook = await this.AddBook.add({
        title,
        editor,
        picture,
        authors
      })
      return sendOk(addedBook)
    } catch (error) {
      return sendError(500, new ServerError())
    }
  }
}
