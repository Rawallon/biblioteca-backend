import { DeleteBook } from '../../domain/usecases/delete-book'
import { DeleteBookRepository } from '../protocols/delete-book-repository'

export class DbDeleteBook implements DeleteBook {
  constructor (private readonly DeleteBookRepository: DeleteBookRepository) {}
  async delete (bookId: string): Promise<void> {
    return await this.DeleteBookRepository.delete(bookId)
  }
}
