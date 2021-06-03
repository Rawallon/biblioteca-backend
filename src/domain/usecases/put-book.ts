import { BookModel } from '../models/book'

export interface PutBookModel {
  title?: string
  editor?: string
  picture?: string
  authors?: string[]
}

export interface PutBook {
  update(bookId: string, book: PutBookModel): Promise<BookModel>
}
