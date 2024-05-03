import express from 'express'
import { verifyToken } from '../controller/utility/verifyToken'

import homeController from '../controller/homeController'
import authController from '../controller/authController'

let router = express.Router()

const initWebRoute = (app) => {
  // section - homepage 
  router.get('/', homeController.homepage)

  // section - health 
  router.get('/health/db', homeController.dbHealth)

  // section - authenticate
  router.post('/auth/sign-up', authController.signUp)
  router.post('/auth/login', authController.login)

  return app.use('/', router)
}

export default initWebRoute