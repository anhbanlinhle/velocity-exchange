CREATE TABLE `velocity_exchange`.`bid` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `auction_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `price` DOUBLE NOT NULL,
  PRIMARY KEY (`id`));
