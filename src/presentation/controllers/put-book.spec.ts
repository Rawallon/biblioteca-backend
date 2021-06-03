import { BookModel } from '../../domain/models/book'
import { AddBookModel } from '../../domain/usecases/add-book'
import { GetBookById } from '../../domain/usecases/get-book-by-id'
import { PutBook } from '../../domain/usecases/put-book'
import { MissingFieldError } from '../errors/missing-field'
import { ServerError } from '../errors/server-error'
import { PutBookController } from './put-book'

const fakeCorrectData = {
  title: 'valid-title',
  editor: 'valid-editor',
  picture: 'valid-picture',
  authors: ['valid', 'author']
}

describe('Put Book Controller', () => {
  const makeGetBookById = (): GetBookById => {
    class GetBookByIdStub implements GetBookById {
      async getBookById (bookId: string): Promise<BookModel | null> {
        return { id: 'valid-id', ...fakeCorrectData }
      }
    }
    return new GetBookByIdStub()
  }
  const makePutBook = (): PutBook => {
    class PutBookStub implements PutBook {
      async update (bookId: string, book: AddBookModel): Promise<BookModel> {
        return Promise.resolve({ id: 'valid-id', ...fakeCorrectData })
      }
    }
    return new PutBookStub()
  }
  const makeSut = () => {
    const getBookByIdStub = makeGetBookById()
    const putBookStub = makePutBook()
    const sut = new PutBookController(getBookByIdStub, putBookStub)
    return { sut, putBookStub, getBookByIdStub }
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

  test('should return 500 if putBookStub throws', async () => {
    const { sut, putBookStub } = makeSut()
    jest.spyOn(putBookStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ params: { id: 'any-id' } })
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
