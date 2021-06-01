import { BookModel } from '../../domain/models/book'
import { AddBook, AddBookModel } from '../../domain/usecases/add-book'
import { MissingFieldError } from '../errors/missing-field'
import { ServerError } from '../errors/server-error'
import { AddBookController } from './add-book'

const fakeCorrectData = {
  title: 'valid-title',
  editor: 'valid-editor',
  picture: 'valid-picture',
  authors: ['valid', 'author']
}

const makeAddBook = (): AddBook => {
  class AddBookStub implements AddBook {
    async add (book: AddBookModel): Promise<BookModel> {
      return Promise.resolve({ id: 'valid-id', ...fakeCorrectData })
    }
  }
  return new AddBookStub()
}

const makeSut = () => {
  const addBookStub = makeAddBook()
  const sut = new AddBookController(addBookStub)
  return { sut, addBookStub }
}
describe('Add book Controller', () => {
  test('should return 400 if no title is provided', async () => {
    const { sut } = makeSut()
    const fakeData = {
      // title: "any-title"
      editor: 'any-editor',
      picture: 'any-picture',
      authors: ['any', 'author']
    }
    const httpResponse = await sut.handle({ body: fakeData })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('title'))
  })
  test('should return 400 if no editor is provided', async () => {
    const { sut } = makeSut()
    const fakeData = {
      title: 'any-title',
      //      editor: 'any-editor',
      picture: 'any-picture',
      authors: ['any', 'author']
    }
    const httpResponse = await sut.handle({ body: fakeData })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('editor'))
  })
  test('should return 400 if no picture is provided', async () => {
    const { sut } = makeSut()
    const fakeData = {
      title: 'any-title',
      editor: 'any-editor',
      // picture: 'any-picture',
      authors: ['any', 'author']
    }
    const httpResponse = await sut.handle({ body: fakeData })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('picture'))
  })
  test('should return 400 if no authors is provided', async () => {
    const { sut } = makeSut()
    const fakeData = {
      title: 'any-title',
      editor: 'any-editor',
      picture: 'any-picture'
      // authors: ['any', 'author']
    }
    const httpResponse = await sut.handle({ body: fakeData })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('authors'))
  })
  test('should call AddBook with correct values', async () => {
    const { sut, addBookStub } = makeSut()
    const addBookSpy = jest.spyOn(addBookStub, 'add')
    await sut.handle({ body: fakeCorrectData })
    expect(addBookSpy).toHaveBeenCalledWith(fakeCorrectData)
  })
  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: fakeCorrectData })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ id: 'valid-id', ...fakeCorrectData })
  })
  test('should return 500 if addBook throws', async () => {
    const { sut, addBookStub } = makeSut()
    jest.spyOn(addBookStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({ body: fakeCorrectData })
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
