CREATE TABLE `velocity_exchange`.`bid_winner` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `pay_status` TINYINT NOT NULL DEFAULT 0,
  `payment_id` INT NULL,
  PRIMARY KEY (`id`));
