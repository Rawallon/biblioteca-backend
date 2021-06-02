import { AddBookRepository } from '../../../data/protocols/add-book-repository'
import { BookModel } from '../../../domain/models/book'
import { AddBookModel } from '../../../domain/usecases/add-book'
import { MongoHelper } from './mongo-helper'

export class BookMongoRepository implements AddBookRepository {
  async add (book: AddBookModel): Promise<BookModel> {
    const bookCollection = await MongoHelper.getCollection('books')
    const insertResult = await bookCollection.insertOne(book)
    return MongoHelper.mapId(insertResult.ops[0])
  }

  async listAll (): Promise<BookModel[]> {
    const bookCollection = await MongoHelper.getCollection('books')
    const allBooks = await MongoHelper.toArray(bookCollection)
    const parseId = allBooks.map(book => MongoHelper.mapId(book))
    return parseId
  }
}
