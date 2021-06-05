/* eslint-disable @typescript-eslint/no-floating-promises */
import { AddBookModel } from '../../../domain/usecases/add-book'
import { makeAddBookController } from '../../db/factories/add-book-controller'
import { makeDeleteBookController } from '../../db/factories/delete-book-controller'
import { makeGetBooksController } from '../../db/factories/get-books-controller'
import { makePutBookController } from '../../db/factories/put-book-controller'
import { adaptRoute } from './adapter/adapter'

export const getBooks = async (rl: any): Promise<void> => {
  return await new Promise(resolve => {
    adaptRoute(makeGetBooksController()).then(() => {
      rl.question('Press Enter to return', () => {
        console.clear()
        resolve()
      })
    })
  })
}

export const addBook = async (rl: any): Promise<void> => {
  const answers: AddBookModel = {
    authors: [''],
    editor: '',
    picture: '',
    title: ''
  }
  return await new Promise(resolve => {
    rl.question('Book title:', (answer: string) => {
      answers.title = answer.trim()
      rl.question('Book editor:', (answer: string) => {
        answers.editor = answer.trim()
        rl.question('Book picture URL:', (answer: string) => {
          answers.picture = answer.trim()
          rl.question(
            'Book authors: (separated by a comma, without space)',
            (answer: string) => {
              answers.authors = answer.split(',').map(author => author.trim())
              adaptRoute(makeAddBookController(), answers).then(() => {
                console.clear()
                resolve()
              })
            }
          )
        })
      })
    })
  })
}

export const putBook = async (rl: any): Promise<void> => {
  let bookId: string
  const answers: AddBookModel = {
    authors: [''],
    editor: '',
    picture: '',
    title: ''
  }
  return await new Promise(resolve => {
    rl.question('Book Id:', (answer: string) => {
      bookId = answer.trim()
      rl.question('Book title:', (answer: string) => {
        answers.title = answer.trim()
        rl.question('Book editor:', (answer: string) => {
          answers.editor = answer.trim()
          rl.question('Book picture URL:', (answer: string) => {
            answers.picture = answer.trim()
            rl.question(
              'Book authors: (separated by a comma, without space)',
              (answer: string) => {
                answers.authors = answer.split(',').map(author => author.trim())
                adaptRoute(makePutBookController(), answers, {
                  id: String(bookId)
                }).then(() => {
                  console.clear()
                  resolve()
                })
              }
            )
          })
        })
      })
    })
  })
}

export const removeBook = async (rl: any): Promise<void> => {
  return await new Promise(resolve => {
    rl.question('Book ID:', (answer: string) => {
      adaptRoute(makeDeleteBookController(), null, {
        id: String(answer)
      }).then(() => {
        console.clear()
        resolve()
      })
    })
  })
}
