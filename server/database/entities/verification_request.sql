CREATE TABLE `velocity_exchange`.`verification_request` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `seller_id` INT NOT NULL,
  `car_id` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'PENDING',
  `time` DATETIME NOT NULL,
  `admin_id` INT NOT NULL,
  `payment_id` INT NOT NULL,
  PRIMARY KEY (`id`));
