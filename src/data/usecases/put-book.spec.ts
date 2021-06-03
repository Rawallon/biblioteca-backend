import { BookModel } from '../../domain/models/book'
import { PutBookModel } from '../../domain/usecases/put-book'
import { PutBookRepository } from '../protocols/put-book-repository'
import { DbPutBook } from './put-book'

describe('Put book Data', () => {
  const fakeCorrectData = {
    title: 'new-title',
    editor: 'valid-editor',
    picture: 'valid-picture',
    authors: ['valid', 'author']
  }

  const makePutBookRepositoryStub = (): PutBookRepository => {
    class PutBookRepositoryStub implements PutBookRepository {
      async update (bookId: string, book: PutBookModel): Promise<BookModel> {
        return await Promise.resolve({ id: 'valid-id', ...fakeCorrectData })
      }
    }
    return new PutBookRepositoryStub()
  }

  const makeSut = () => {
    const putBookRepository = makePutBookRepositoryStub()
    const sut = new DbPutBook(putBookRepository)
    return { sut, putBookRepository }
  }
  test('should call PutBookRepository', async () => {
    const { sut, putBookRepository } = makeSut()
    const updateSpy = jest.spyOn(putBookRepository, 'update')
    await sut.update('any-id', { title: 'new-title' })
    expect(updateSpy).toHaveBeenCalled()
  })
  test('should return updated object', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.update('any-id', { title: 'new-title' })
    expect(httpResponse).toEqual({ id: 'valid-id', ...fakeCorrectData })
  })
  test('should throw if putBookRepository throws ', async () => {
    const { sut, putBookRepository } = makeSut()
    jest
      .spyOn(putBookRepository, 'update')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = sut.update('any-id', { title: 'new-title' })
    await expect(httpResponse).rejects.toThrow()
  })
})
