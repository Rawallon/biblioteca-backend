import { BookModel } from '../../domain/models/book'

export interface GetBookRepository {
  listAll(): Promise<BookModel[]>
}
