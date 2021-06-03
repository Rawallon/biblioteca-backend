export interface DeleteBook {
  delete(bookId: string): Promise<void>
}
