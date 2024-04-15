CREATE TABLE `velocity_exchange`.`auction_registration` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `auction_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `payment_id` INT NOT NULL,
  PRIMARY KEY (`id`));
