CREATE TABLE `velocity_exchange`.`account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `dob` DATETIME NULL,
  `phone_num` VARCHAR(15) NULL,
  `is_admin` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`));
