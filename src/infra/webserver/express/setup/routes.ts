import { Express, Router } from 'express'
import obrasRoute from '../routes/obras-routes'

export default function SetupRoutes (app: Express): void {
  const router = Router()
  app.use('/api', router)
  obrasRoute(router)
}
