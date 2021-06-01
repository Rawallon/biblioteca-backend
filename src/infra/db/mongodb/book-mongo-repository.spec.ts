import { BookMongoRepository } from './book-mongo-repository'
import { MongoHelper } from './mongo-helper'

describe('Book Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  const makeSut = (): BookMongoRepository => {
    const sut = new BookMongoRepository()
    return sut
  }
  test('should return an book on success', async () => {
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
})
