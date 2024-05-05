import pool from "../../config/database"

let registCar = async (req, res) => {
  let userId = req.body.userId
  let currentOwner = req.body.currentOwner
  let brand = req.body.brand
  let model = req.body.model
  let color = req.body.color
  let year = req.body.year
  let carClass = req.body.class
  let door = req.body.door
  let seat = req.body.seat
  let layout = req.body.layout
  let transmission = req.body.transmission
  let cylinder = req.body.cylinder
  let capacity = req.body.capacity
  let image = req.body.image
  let location = req.body.location
  let storageStatus = req.body.status
  let fuel = req.body.fuel
  let odometer = req.body.odometer

  // e an xu ly not nhe

}

module.exports = {
  registCar
}