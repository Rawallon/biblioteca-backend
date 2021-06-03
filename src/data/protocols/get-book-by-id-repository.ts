import { BookModel } from '../../domain/models/book'

export interface GetBookByIdRepository {
  getBookById(bookId: string): Promise<BookModel | null>
}
