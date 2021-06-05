import readline from 'readline'
import { MongoHelper } from '../../db/mongodb/mongo-helper'
import env from '../../webserver/config/env'
import { addBook, getBooks, putBook, removeBook } from './commands'

MongoHelper.connect(env.mongoUrl)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let shouldLoop = true

const question = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    rl.question(
      `
a - Add\n
l - List\n
p - Update\n
d - Delete\n
q - Quit\n\n`,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async answer => {
        switch (answer) {
          case 'u':
          case 'p':
            await putBook(rl)
            resolve()
            break
          case 'r':
          case 'd':
            await removeBook(rl)
            resolve()
            break
          case 'a':
            await addBook(rl)
            resolve()
            break
          case 'l':
          case 'g':
            await getBooks(rl)
            resolve()
            break
          case 'q':
          case 'exit':
            shouldLoop = false
            resolve()
            break
          default:
            console.log('Bad command, try again! \n')
            break
        }
      }
    )
  })
}

const main = async (): Promise<void> => {
  while (shouldLoop) {
    await question()
  }
  rl.close()
  process.exit(0)
}

main()
