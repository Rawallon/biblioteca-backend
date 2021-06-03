import { BookModel } from '../../domain/models/book'
import { GetBookById } from '../../domain/usecases/get-book-by-id'
import { DbGetBookById } from './get-book-by-id'

describe('Get Book By Id Data', () => {
  const fakeCorrectData = {
    title: 'valid-title',
    editor: 'valid-editor',
    picture: 'valid-picture',
    authors: ['valid', 'author']
  }
  const makeGetBookByIdRepositoryStub = (): GetBookById => {
    class GetBookByIdRepositoryStub implements GetBookById {
      async getBookById (bookId: string): Promise<BookModel | null> {
        return { id: 'valid-id', ...fakeCorrectData }
      }
    }
    return new GetBookByIdRepositoryStub()
  }
  const makeSut = () => {
    const getBookByIdRepository = makeGetBookByIdRepositoryStub()
    const sut = new DbGetBookById(getBookByIdRepository)
    return { sut, getBookByIdRepository }
  }
  test('should call repository ', async () => {
    const { sut, getBookByIdRepository } = makeSut()
    const getBookByIdSpy = jest.spyOn(getBookByIdRepository, 'getBookById')
    await sut.getBookById('valid-id')
    expect(getBookByIdSpy).toHaveBeenCalled()
  })
  test('should return an book ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.getBookById('valid-id')
    expect(httpResponse).toEqual({ id: 'valid-id', ...fakeCorrectData })
  })
  test('should return null if no book is found', async () => {
    const { sut, getBookByIdRepository } = makeSut()
    jest
      .spyOn(getBookByIdRepository, 'getBookById')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.getBookById('invalid-id')
    expect(httpResponse).toEqual(null)
  })
})
