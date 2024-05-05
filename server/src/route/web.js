import express from 'express'
import { verifyToken } from '../controller/utility/verifyToken'

import homeController from '../controller/homeController'
import authController from '../controller/authController'
import auctionController from '../controller/auctionController'
import carController from '../controller/carController'
import adminController from '../controller/adminController'

let router = express.Router()

const initWebRoute = (app) => {
  // section - homepage 
  router.get('/', homeController.root)
  router.get('/home', homeController.homepage)

  // section - health 
  router.get('/health/db', homeController.dbHealth)

  // section - authenticate
  router.post('/auth/sign-up', authController.signUp)
  router.post('/auth/login', authController.login)

  // section - auction 
  router.post('/auction/detail', auctionController.auctionDetail)

  // section - car
  router.post('/car/regist', verifyToken, carController.registCar)
  // section - admin
  router.get('/admin/pendingList', adminController.pendingList)
  router.get('/admin/verification_request_details', adminController.verificationRequestDetails)
  router.post('/admin/approval_request', adminController.approvalRequest)


  return app.use('/', router)
}

export default initWebRoute