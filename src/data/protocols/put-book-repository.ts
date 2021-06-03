import { BookModel } from '../../domain/models/book'
import { PutBookModel } from '../../domain/usecases/put-book'

export interface PutBookRepository {
  update(bookId: string, book: PutBookModel): Promise<BookModel>
}
