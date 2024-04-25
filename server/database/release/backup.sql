-- MySQL dump 10.13  Distrib 8.2.0, for macos13 (x86_64)
--
-- Host: 127.0.0.1    Database: velocity_exchange
-- ------------------------------------------------------
-- Server version	8.2.0

DROP DATABASE IF EXISTS `velocity_exchange`;
CREATE DATABASE `velocity_exchange`;
USE `velocity_exchange`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `dob` date DEFAULT NULL,
  `phone_num` varchar(10) DEFAULT NULL,
  `is_admin` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auction`
--

DROP TABLE IF EXISTS `auction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `host_id` int NOT NULL,
  `car_id` int NOT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_started` datetime DEFAULT NULL,
  `date_expired` datetime DEFAULT NULL,
  `status` varchar(64) DEFAULT 'INCOMING',
  `winner_id` int DEFAULT NULL,
  `bid_step` double NOT NULL,
  `initial_price` double NOT NULL,
  `deposit_price` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_account_auction_1` (`host_id`),
  KEY `fk_account_auction_2` (`winner_id`),
  KEY `fk_car_auction` (`car_id`),
  CONSTRAINT `fk_account_auction_1` FOREIGN KEY (`host_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_account_auction_2` FOREIGN KEY (`winner_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_car_auction` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction`
--

LOCK TABLES `auction` WRITE;
/*!40000 ALTER TABLE `auction` DISABLE KEYS */;
/*!40000 ALTER TABLE `auction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auction_registration`
--

DROP TABLE IF EXISTS `auction_registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auction_registration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auction_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `payment_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_auction_auction_registration` (`auction_id`),
  KEY `fk_account_auction_registration` (`customer_id`),
  KEY `fk_payment_auction_registration` (`payment_id`),
  CONSTRAINT `fk_account_auction_registration` FOREIGN KEY (`customer_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_auction_auction_registration` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`),
  CONSTRAINT `fk_payment_auction_registration` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction_registration`
--

LOCK TABLES `auction_registration` WRITE;
/*!40000 ALTER TABLE `auction_registration` DISABLE KEYS */;
/*!40000 ALTER TABLE `auction_registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auction_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `timestamp` datetime NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_auction_bid_1` (`auction_id`),
  KEY `fk_account_bid_2` (`customer_id`),
  CONSTRAINT `fk_account_bid_2` FOREIGN KEY (`customer_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_auction_bid_1` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bid_winner`
--

DROP TABLE IF EXISTS `bid_winner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid_winner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pay_status` tinyint NOT NULL DEFAULT '0',
  `payment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_account_bid_winner` (`user_id`),
  KEY `fk_payment_bid_winner` (`payment_id`),
  CONSTRAINT `fk_account_bid_winner` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_payment_bid_winner` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid_winner`
--

LOCK TABLES `bid_winner` WRITE;
/*!40000 ALTER TABLE `bid_winner` DISABLE KEYS */;
/*!40000 ALTER TABLE `bid_winner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `id` int NOT NULL AUTO_INCREMENT,
  `current_owner` varchar(64) NOT NULL,
  `brand` varchar(64) NOT NULL,
  `model_code` varchar(64) DEFAULT NULL,
  `color` varchar(64) DEFAULT NULL,
  `class` varchar(64) DEFAULT NULL,
  `door` int DEFAULT NULL,
  `seat` int DEFAULT NULL,
  `layout` varchar(64) DEFAULT NULL,
  `transmission` varchar(64) DEFAULT NULL,
  `engine_cylinders` int DEFAULT NULL,
  `engine_capacity` int DEFAULT NULL,
  `image` varchar(64) DEFAULT NULL,
  `location` varchar(64) DEFAULT NULL,
  `status_in_storage` varchar(45) DEFAULT NULL,
  `fuel` varchar(64) DEFAULT NULL,
  `odometer` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `transaction_id` varchar(64) NOT NULL,
  `amount` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_account_payment` (`user_id`),
  CONSTRAINT `fk_account_payment` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_info`
--

DROP TABLE IF EXISTS `payment_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bank_name` varchar(64) NOT NULL,
  `bank_number` varchar(16) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_account_payment_info` (`user_id`),
  CONSTRAINT `fk_account_payment_info` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_info`
--

LOCK TABLES `payment_info` WRITE;
/*!40000 ALTER TABLE `payment_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_request`
--

DROP TABLE IF EXISTS `verification_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_id` int NOT NULL,
  `car_id` int NOT NULL,
  `status` varchar(64) NOT NULL DEFAULT 'PENDING',
  `time` datetime NOT NULL,
  `admin_id` int NOT NULL,
  `payment_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_account_verification_request_1` (`seller_id`),
  KEY `fk_account_verification_request_2` (`admin_id`),
  KEY `fk_car_verification_request` (`car_id`),
  KEY `fk_payment_verification_request` (`payment_id`),
  CONSTRAINT `fk_account_verification_request_1` FOREIGN KEY (`seller_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_account_verification_request_2` FOREIGN KEY (`admin_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_car_verification_request` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`),
  CONSTRAINT `fk_payment_verification_request` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_request`
--

LOCK TABLES `verification_request` WRITE;
/*!40000 ALTER TABLE `verification_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `verification_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-16 11:54:15