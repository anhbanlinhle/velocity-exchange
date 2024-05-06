import pool from "../../config/database";
const imgbbUploader = require("imgbb-uploader");

let registCar = async (req, res) => {
  let userId = req.body.userId;
  let currentOwner = req.body.currentOwner;
  let brand = req.body.brand;
  let modelCode = req.body.model;
  let color = req.body.color;
  let carClass = req.body.class;
  let door = req.body.door;
  let seat = req.body.seat;
  let layout = req.body.layout;
  let transmission = req.body.transmission;
  let cylinder = req.body.cylinder;
  let capacity = req.body.capacity;
  let image = req.body.image;
  let location = req.body.location;
  let storageStatus = req.body.status;
  let fuel = req.body.fuel;
  let odometer = req.body.odometer;

  try {
    // Upload image to imgbb and get the URL
    const options = {
      apiKey: "4b5afd5caf4c66ab6f10a723d2e48cbe", // MANDATORY
      base64string: image,
      // OPTIONAL: pass base64-encoded image (max 32Mb)
    };

    let imageURL;
    await imgbbUploader(options)
      .then((response) => (imageURL = response.image.url))
      .catch((error) => console.error(error));
    // Insert payment data
    let paymentQuery = `
      INSERT INTO payment (user_id, transaction_id, amount)
      VALUES (?, 'aeae3b66-f314-458f-a531-bba563358714', 163000000);
    `;

    let [paymentRows] = await pool.query(paymentQuery, [userId]);
    let paymentId = paymentRows.insertId;

    // Insert car data
    let carQuery = `
      INSERT INTO car (current_owner, brand, model_code, color, class, door, seat, layout, transmission, engine_cylinders, engine_capacity, fuel, odometer, image, location, status_in_storage)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    let [carRows] = await pool.query(carQuery, [
      currentOwner,
      brand,
      modelCode,
      color,
      carClass,
      door,
      seat,
      layout,
      transmission,
      cylinder,
      capacity,
      fuel,
      odometer,
      imageURL, // Use the image URL obtained from imgbb
      location,
      storageStatus,
    ]);
    let carId = carRows.insertId;

    // Insert verification request data
    let verificationRequestQuery = `
      INSERT INTO verification_request (seller_id, car_id, status, time, payment_id)
      VALUES (?, ?, 'PENDING', NOW(), ?);
    `;

    await pool.query(verificationRequestQuery, [userId, carId, paymentId]);

    // Send success response
    return res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ ErrorCode: "ER_INTERNAL_SERVER_ERROR" });
  }
};

module.exports = {
  registCar,
};
