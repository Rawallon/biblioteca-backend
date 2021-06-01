import { BookModel } from '../../domain/models/book'
import { AddBookModel } from '../../domain/usecases/add-book'

export interface AddBookRepository {
  add(book: AddBookModel): Promise<BookModel>
}
