import program from 'commander'
import { argv } from 'process'
import { MongoHelper } from '../../db/mongodb/mongo-helper'
import env from '../../webserver/config/env'
import { addBook, getBooks, putBook, removeBook } from './commands'

MongoHelper.connect(env.mongoUrl)
program.version('0.0.1').description('Sistema de gerenciamento de biblioteca')

program
  .command('add')
  .alias('adc')
  .alias('a')
  .description('Adicionar uma obra')
  .action(() => {
    addBook()
  })

program
  .command('list')
  .alias('l')
  .description('Listar todas obras')
  .action(() => {
    getBooks()
  })

program
  .command('remove')
  .alias('r')
  .alias('rem')
  .description('Remove uma por id')
  .action(() => {
    removeBook()
  })

program
  .command('update')
  .alias('u')
  .alias('put')
  .alias('p')
  .description('Atualizar informações de uma obra por id')
  .action(() => {
    putBook()
  })

program.parse(argv)
