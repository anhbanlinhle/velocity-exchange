CREATE TABLE `velocity_exchange`.`payment_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bank_name` VARCHAR(45) NOT NULL,
  `bank_number` VARCHAR(45) NOT NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`id`));
