import { BookModel } from '../../domain/models/book'
import { DeleteBook } from '../../domain/usecases/delete-book'
import { GetBookById } from '../../domain/usecases/get-book-by-id'
import { MissingFieldError } from '../errors/missing-field'
import { ServerError } from '../errors/server-error'
import { sendOk } from '../helper/http-helper'
import { DeleteBookController } from './delete-book'

const fakeCorrectData = {
  title: 'valid-title',
  editor: 'valid-editor',
  picture: 'valid-picture',
  authors: ['valid', 'author']
}

describe('Delete Book Controller', () => {
  const makeGetBookById = (): GetBookById => {
    class GetBookByIdStub implements GetBookById {
      async getBookById (bookId: string): Promise<BookModel | null> {
        return { id: 'valid-id', ...fakeCorrectData }
      }
    }
    return new GetBookByIdStub()
  }
  const DeleteBook = (): DeleteBook => {
    class DeleteBookStub implements DeleteBook {
      async delete (bookId: string): Promise<void> {
        return Promise.resolve()
      }
    }
    return new DeleteBookStub()
  }
  const makeSut = () => {
    const getBookByIdStub = makeGetBookById()
    const deleteBookStub = DeleteBook()
    const sut = new DeleteBookController(getBookByIdStub, deleteBookStub)
    return { sut, deleteBookStub, getBookByIdStub }
  }

  test('should return 400 if no id provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ params: {} })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('bookId'))
  })

  test('should return 404 if a bad id is provided', async () => {
    const { sut, getBookByIdStub } = makeSut()
    jest
      .spyOn(getBookByIdStub, 'getBookById')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ params: { id: 'bad-id' } })
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual(new MissingFieldError('bookId'))
  })

  test('should return 500 if GetBookById throws', async () => {
    const { sut, getBookByIdStub } = makeSut()
    jest.spyOn(getBookByIdStub, 'getBookById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ params: { id: 'any-id' } })
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 500 if deleteBookStub throws', async () => {
    const { sut, deleteBookStub } = makeSut()
    jest.spyOn(deleteBookStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ params: { id: 'any-id' } })
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
