import { BookModel } from '../../domain/models/book'
import { DbGetBook } from './get-book'

const fakeCorrectData = {
  title: 'valid-title',
  editor: 'valid-editor',
  picture: 'valid-picture',
  authors: ['valid', 'author']
}

const makeGetBookRepositoryStub = () => {
  class GetBookRepository implements GetBookRepository {
    async listAll (): Promise<BookModel[]> {
      return Promise.resolve([{ id: 'valid-id', ...fakeCorrectData }])
    }
  }
  return new GetBookRepository()
}

const makeSut = () => {
  const getBookRepositoryStub = makeGetBookRepositoryStub()
  const sut = new DbGetBook(getBookRepositoryStub)
  return { sut, getBookRepositoryStub }
}

describe('Get Book Data', () => {
  test('should call repository', async () => {
    const { sut, getBookRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getBookRepositoryStub, 'listAll')
    await sut.getBooks()
    expect(getSpy).toHaveBeenCalled()
  })
  test('should return 200', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.getBooks()
    expect(httpResponse).toEqual([{ id: 'valid-id', ...fakeCorrectData }])
  })
  test('should throw if getBookRepository throws', async () => {
    const { sut, getBookRepositoryStub } = makeSut()
    jest
      .spyOn(getBookRepositoryStub, 'listAll')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = sut.getBooks()
    await expect(httpResponse).rejects.toThrow()
  })
})
