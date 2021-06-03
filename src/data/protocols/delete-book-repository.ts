export interface DeleteBookRepository {
  delete(bookId: string): Promise<void>
}
