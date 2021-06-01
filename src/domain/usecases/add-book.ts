import { BookModel } from '../models/book'

export interface AddBookModel {
  title: string
  editor: string
  picture: string
  authors: string[]
}

export interface AddBook {
  add(book: AddBookModel): Promise<BookModel>
}
