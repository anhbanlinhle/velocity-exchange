CREATE TABLE `velocity_exchange`.`auction` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `host_id` INT NOT NULL,
  `car_id` INT NOT NULL,
  `date_created` DATETIME NULL,
  `date_started` DATETIME NULL,
  `date_expired` DATETIME NULL,
  `status` VARCHAR(45) NULL DEFAULT 'INCOMING',
  `winner_id` INT NULL,
  `bid_step` DOUBLE NOT NULL,
  `initial_price` DOUBLE NOT NULL,
  `deposit_price` DOUBLE NOT NULL,
  PRIMARY KEY (`id`));
