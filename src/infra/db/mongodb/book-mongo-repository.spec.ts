import { BookMongoRepository } from './book-mongo-repository'
import { MongoHelper } from './mongo-helper'

describe('Book Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  // beforeEach(async () => {
  //   const accountCollection = await MongoHelper.getCollection('books')
  //   await accountCollection.deleteMany({})
  // })
  const makeSut = (): BookMongoRepository => {
    const sut = new BookMongoRepository()
    return sut
  }
  test('should return a book on successfully adding a book', async () => {
    const sut = makeSut()
    const httpResponse = await sut.add({
      title: 'valid-title',
      editor: 'valid-editor',
      picture: 'valid-picture',
      authors: ['valid', 'author']
    })
    expect(httpResponse.title).toBe('valid-title')
    expect(httpResponse.editor).toBe('valid-editor')
    expect(httpResponse.picture).toBe('valid-picture')
  })
  test('should return a book on successfully adding a book', async () => {
    const sut = makeSut()
    const httpResponse = await sut.add({
      title: 'valid-title',
      editor: 'valid-editor',
      picture: 'valid-picture',
      authors: ['valid', 'author']
    })
    expect(httpResponse.title).toBe('valid-title')
    expect(httpResponse.editor).toBe('valid-editor')
    expect(httpResponse.picture).toBe('valid-picture')
  })
  test('should successfully fetch added book', async () => {
    const sut = makeSut()
    const httpResponse = await sut.listAll()
    expect(httpResponse.length).toBeGreaterThan(0)
    expect(httpResponse[0].title).toBe('valid-title')
    expect(httpResponse[0].editor).toBe('valid-editor')
    expect(httpResponse[0].picture).toBe('valid-picture')
  })
  test('should successfully update book', async () => {
    const sut = makeSut()
    const fetchBooks = await sut.listAll()
    const update = await sut.update(fetchBooks[0].id, { title: 'new-title' })
    expect(update.title).toBe('new-title')
  })
})
