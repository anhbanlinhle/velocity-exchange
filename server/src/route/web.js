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
  router.post('/home', homeController.homepage)

  // section - health 
  router.get('/health/db', homeController.dbHealth)

  // section - authenticate
  router.post('/auth/sign-up', authController.signUp)
  router.post('/auth/login', authController.login)

  // section - auction 
  router.post('/auction/detail', auctionController.auctionDetail)
  router.post('/auction/create', auctionController.createAuction)
  router.post('/auction/filter', auctionController.filterAuction)

  // section - car 
  router.post('/car/regist', verifyToken, carController.registCar)

  // section - admin 
  router.post('/admin/request', adminController.pendingList)
  router.post('/admin/request/detail', adminController.verificationRequestDetails)
  router.post('/admin/request/handle', adminController.approvalRequest)


  return app.use('/', router)
}

export default initWebRoute