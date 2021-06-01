import { BookModel } from '../../domain/models/book'
import { GetBooks } from '../../domain/usecases/get-books'
import { ServerError } from '../errors/server-error'
import { GetBookController } from './get-books'

const fakeCorrectData = {
  id: 'valid-id',
  title: 'valid-title',
  editor: 'valid-editor',
  picture: 'valid-picture',
  authors: ['valid', 'author']
}

const makeLoadBooks = () => {
  class LoadBooksStub implements GetBooks {
    async getBooks (): Promise<BookModel[]> {
      return Promise.resolve(Array(2).fill(fakeCorrectData))
    }
  }
  return new LoadBooksStub()
}

const makeSut = () => {
  const loadBooksStub = makeLoadBooks()
  const sut = new GetBookController(loadBooksStub)
  return { sut, loadBooksStub }
}
describe('Get Book Controller', () => {
  test('should call getBooks function in LoadBooks', async () => {
    const { sut, loadBooksStub } = makeSut()
    const getAllSpy = jest.spyOn(loadBooksStub, 'getBooks')
    await sut.handle()
    expect(getAllSpy).toHaveBeenCalled()
  })
  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResult = await sut.handle()
    expect(httpResult.statusCode).toBe(200)
    expect(httpResult.body).toEqual(Array(2).fill(fakeCorrectData))
  })
  test('should throw if LoadBooks throws', async () => {
    const { sut, loadBooksStub } = makeSut()
    jest.spyOn(loadBooksStub, 'getBooks').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResult = await sut.handle()
    expect(httpResult.statusCode).toBe(500)
    expect(httpResult.body).toEqual(new ServerError())
  })
})
