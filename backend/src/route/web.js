import express from 'express'
import homeController from '../controller/homeController'
let router = express.Router()

const initWebRoute = (app) => {
  // section - homepage 
  router.get('/', homeController.homepage)

  // section - health 
  router.get('/health/db', homeController.dbHealth)

  return app.use('/', router)
}

export default initWebRoute