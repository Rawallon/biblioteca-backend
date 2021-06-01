import { BookModel } from '../../domain/models/book'
import { AddBookModel } from '../../domain/usecases/add-book'
import { DbAddBook } from './add-book'

const fakeCorrectData = {
  title: 'valid-title',
  editor: 'valid-editor',
  picture: 'valid-picture',
  authors: ['valid', 'author']
}

const makeAddBookRepositoryStub = () => {
  class AddBookRepository {
    async add (bookModel: AddBookModel): Promise<BookModel> {
      return Promise.resolve({ id: 'valid-id', ...fakeCorrectData })
    }
  }
  return new AddBookRepository()
}

const makeSut = () => {
  const addBookRepositoryStub = makeAddBookRepositoryStub()
  const sut = new DbAddBook(addBookRepositoryStub)
  return { sut, addBookRepositoryStub }
}

describe('Add Book Data', () => {
  test('should call repository', async () => {
    const { sut, addBookRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addBookRepositoryStub, 'add')
    await sut.add(fakeCorrectData)
    expect(addSpy).toHaveBeenCalled()
  })
  test('should return 200', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.add(fakeCorrectData)
    expect(httpResponse).toEqual({ id: 'valid-id', ...fakeCorrectData })
  })
  test('should throw if addBookRepository throws', async () => {
    const { sut, addBookRepositoryStub } = makeSut()
    jest
      .spyOn(addBookRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = sut.add(fakeCorrectData)
    await expect(httpResponse).rejects.toThrow()
  })
})
