import { BookModel } from '../models/book'

export interface GetBooks {
  getBooks(): Promise<BookModel[]>
}
