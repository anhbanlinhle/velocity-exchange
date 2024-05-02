CREATE TABLE `velocity_exchange`.`payment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `transaction_id` VARCHAR(45) NOT NULL,
  `amount` DOUBLE NOT NULL,
  PRIMARY KEY (`id`));
