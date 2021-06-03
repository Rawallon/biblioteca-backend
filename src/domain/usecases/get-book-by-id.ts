import { BookModel } from '../models/book'

export interface GetBookById {
  getBookById(bookId: string): Promise<BookModel | null>
}
