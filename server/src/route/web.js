import express from 'express'
import { verifyToken } from '../controller/utility/verifyToken'
import { updateDB } from '../controller/utility/updateDB'

import homeController from '../controller/homeController'
import authController from '../controller/authController'
import auctionController from '../controller/auctionController'
import carController from '../controller/carController'
import adminController from '../controller/adminController'

let router = express.Router()

const initWebRoute = (app) => {
  // section - homepage 
  router.get('/', homeController.root)
  router.post('/home', updateDB, homeController.homepage)

  // section - health 
  router.get('/health/db', homeController.dbHealth)

  // section - authenticate
  router.post('/auth/sign-up', authController.signUp)
  router.post('/auth/login', authController.login)

  // section - auction 
  router.post('/auction/detail', updateDB, auctionController.auctionDetail)
  router.post('/auction/create', updateDB, auctionController.createAuction)
  router.post('/auction/filter', updateDB, auctionController.filterAuction)
  router.post('/auction/regist', updateDB, auctionController.registAuction)
  router.post('/auction/unregist', updateDB, auctionController.unregistAuction)
  router.post('/auction/bid', updateDB, auctionController.makeBid)

  // section - car 
  router.post('/car/regist', carController.registCar)
  router.post('/car/inventory', updateDB, carController.inventoryRequest)

  // section - admin 
  router.post('/admin/request', adminController.requestList)
  router.post('/admin/request/detail', adminController.requestDetail)
  router.post('/admin/request/handle', adminController.handleRequest)
  router.post('/admin/request/filter', adminController.requestFilter)


  return app.use('/', router)
}

export default initWebRoute