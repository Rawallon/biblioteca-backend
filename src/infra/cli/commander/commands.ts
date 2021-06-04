import { prompt } from 'inquirer'
import { makeAddBookController } from '../../db/factories/add-book-controller'
import { makeDeleteBookController } from '../../db/factories/delete-book-controller'
import { makeGetBooksController } from '../../db/factories/get-books-controller'
import { makePutBookController } from '../../db/factories/put-book-controller'
import { adaptRoute } from './adapter/adapter'

export const getBooks = () => adaptRoute(makeGetBooksController())

const addBookModelQuestions = [
  {
    type: 'input',
    name: 'title',
    message: 'Book title'
  },
  {
    type: 'input',
    name: 'editor',
    message: 'Book editor'
  },
  {
    type: 'input',
    name: 'picture',
    message: 'Book picture'
  },
  {
    type: 'input',
    name: 'authors',
    message: 'Book authors (separated by a comma)'
  }
]

export const addBook = () => {
  prompt(addBookModelQuestions)
    .then(async answers => await adaptRoute(makeAddBookController(), answers))
    .catch(err => console.log(err))
}

const putBookQuestion = [
  {
    type: 'input',
    name: 'bookId',
    message: 'Book ID',
    default () {
      return '60b99f7c7a2b240cd0cd3727'
    }
  },
  {
    type: 'input',
    name: 'title',
    message: 'Book title'
  },
  {
    type: 'input',
    name: 'editor',
    message: 'Book editor'
  },
  {
    type: 'input',
    name: 'picture',
    message: 'Book picture'
  },
  {
    type: 'input',
    name: 'authors',
    message: 'Book authors (separated by a comma)'
  }
]

export const putBook = () => {
  prompt(putBookQuestion)
    .then(
      async answers =>
        await adaptRoute(makePutBookController(), answers, {
          id: String(answers.bookId)
        })
    )
    .catch(err => console.log(err))
}

const removeQuestion = [
  {
    type: 'input',
    name: 'bookId',
    message: 'Book ID',
    default () {
      return '60b99e8d89b1533394a46b9f'
    }
  }
]

export const removeBook = async () => {
  const answer = await prompt(removeQuestion)
  await adaptRoute(makeDeleteBookController(), null, {
    id: String(answer.bookId)
  })
}
