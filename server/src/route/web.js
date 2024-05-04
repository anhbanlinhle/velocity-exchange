import express from 'express'
import { verifyToken } from '../controller/utility/verifyToken'

import homeController from '../controller/homeController'
import authController from '../controller/authController'
import adminController from '../controller/adminController'

let router = express.Router()

const initWebRoute = (app) => {
  // section - homepage 
  router.get('/', homeController.homepage)

  // section - health 
  router.get('/health/db', homeController.dbHealth)

  // section - authenticate
  router.post('/auth/sign-up', authController.signUp)
  router.post('/auth/login', authController.login)

  // section - admin
  router.get('/admin/pendingList', adminController.pendingList)
  router.get('/admin/verification_request_details', adminController.verificationRequestDetails)
  router.post('/admin/approval_request', adminController.approvalRequest)


  return app.use('/', router)
}

export default initWebRoute