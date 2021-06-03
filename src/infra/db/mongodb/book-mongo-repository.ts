import { ObjectId } from 'bson'
import { AddBookRepository } from '../../../data/protocols/add-book-repository'
import { GetBookByIdRepository } from '../../../data/protocols/get-book-by-id-repository'
import { GetBookRepository } from '../../../data/protocols/get-book-repository'
import { PutBookRepository } from '../../../data/protocols/put-book-repository'
import { BookModel } from '../../../domain/models/book'
import { AddBookModel } from '../../../domain/usecases/add-book'
import { PutBookModel } from '../../../domain/usecases/put-book'
import { MongoHelper } from './mongo-helper'

export class BookMongoRepository
  implements
    AddBookRepository,
    GetBookRepository,
    PutBookRepository,
    GetBookByIdRepository {
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

  async update (bookId: string, book: PutBookModel): Promise<any> {
    const bookCollection = await MongoHelper.getCollection('books')
    const selectedBook = await bookCollection.findOneAndUpdate(
      { _id: new ObjectId(bookId) },
      { $set: { ...book } },
      {
        upsert: false,
        returnDocument: 'after'
      }
    )
    return selectedBook.value
  }

  async getBookById (bookId: string): Promise<BookModel | null> {
    const bookCollection = await MongoHelper.getCollection('books')
    return await bookCollection.findOne({ _id: new ObjectId(bookId) })
  }
}
