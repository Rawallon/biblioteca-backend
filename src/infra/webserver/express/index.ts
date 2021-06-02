import express from 'express'
import { Server } from 'http'
import SetupMiddlewares from './setup/middlewares'
import SetupRoutes from './setup/routes'

const app = express()
SetupMiddlewares(app)
SetupRoutes(app)

export default (port: string | number): Server => {
  return app.listen(port)
}
