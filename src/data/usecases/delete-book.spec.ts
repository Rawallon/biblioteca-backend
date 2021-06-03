import { DeleteBookRepository } from '../protocols/delete-book-repository'
import { DbDeleteBook } from './delete-book'

describe('Put book Data', () => {
  const fakeCorrectData = {
    title: 'new-title',
    editor: 'valid-editor',
    picture: 'valid-picture',
    authors: ['valid', 'author']
  }

  const makeDeleteBookRepositoryStub = (): DeleteBookRepository => {
    class DeleteBookRepositoryStub implements DeleteBookRepository {
      async delete (bookId: string): Promise<void> {
        return await Promise.resolve()
      }
    }
    return new DeleteBookRepositoryStub()
  }

  const makeSut = () => {
    const deleteBookRepository = makeDeleteBookRepositoryStub()
    const sut = new DbDeleteBook(deleteBookRepository)
    return { sut, deleteBookRepository }
  }
  test('should call deleteBookRepository', async () => {
    const { sut, deleteBookRepository } = makeSut()
    const updateSpy = jest.spyOn(deleteBookRepository, 'delete')
    await sut.delete('any-id')
    expect(updateSpy).toHaveBeenCalled()
  })
  test('should not return anything', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.delete('any-id')
    expect(httpResponse).toEqual(undefined)
  })
  test('should throw if deleteBookRepository throws ', async () => {
    const { sut, deleteBookRepository } = makeSut()
    jest
      .spyOn(deleteBookRepository, 'delete')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = sut.delete('any-id')
    await expect(httpResponse).rejects.toThrow()
  })
})
