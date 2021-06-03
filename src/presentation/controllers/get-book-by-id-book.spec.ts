import { BookModel } from '../../domain/models/book'
import { GetBookById } from '../../domain/usecases/get-book-by-id'
import { MissingFieldError } from '../errors/missing-field'
import { GetBookByIdController } from './get-book-by-id'

describe('Get Book by Id Controller', () => {
  const fakeCorrectData = {
    title: 'valid-title',
    editor: 'valid-editor',
    picture: 'valid-picture',
    authors: ['valid', 'author']
  }
  const GetBookByIdStub = (): GetBookById => {
    class GetBookByIdStub implements GetBookById {
      async getBookById (bookId: string): Promise<BookModel | null> {
        return { id: 'valid-id', ...fakeCorrectData }
      }
    }
    return new GetBookByIdStub()
  }
  const makeSut = () => {
    const getBookById = GetBookByIdStub()
    const sut = new GetBookByIdController(getBookById)
    return { sut, getBookById }
  }

  test('should return 400 if no id provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ params: {} })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('bookId'))
  })

  test('should return null if a bad id is provided', async () => {
    const { sut, getBookById } = makeSut()
    jest
      .spyOn(getBookById, 'getBookById')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ params: { id: 'bad-id' } })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(null)
  })

  test('should throw if GetBookById throws', async () => {
    const { sut, getBookById } = makeSut()
    jest.spyOn(getBookById, 'getBookById').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ params: { id: 'any-id' } })
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return fetched book', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ params: { id: 'valid-id' } })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ id: 'valid-id', ...fakeCorrectData })
  })
})
