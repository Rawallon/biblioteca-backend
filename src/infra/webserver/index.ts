import env from './config/env'
import { MongoHelper } from '../db/mongodb/mongo-helper'
import expressServer from './express'

export default async function createServer (): Promise<string | number> {
  await MongoHelper.connect(env.mongoUrl)
  expressServer(env.port)
  return env.port
}
