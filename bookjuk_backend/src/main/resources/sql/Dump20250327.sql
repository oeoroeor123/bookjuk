CREATE DATABASE  IF NOT EXISTS `db_final` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_final`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 43.201.0.203    Database: db_final
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_attatch`
--

DROP TABLE IF EXISTS `tbl_attatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_attatch` (
  `attatch_id` int NOT NULL AUTO_INCREMENT COMMENT '첨부 고유 ID',
  `file_path` varchar(300) NOT NULL COMMENT '첨부 파일의 저장 경로',
  `original_filename` varchar(300) DEFAULT NULL COMMENT '첨부 파일의 원래 이름',
  `filesystem_name` varchar(40) DEFAULT NULL COMMENT '첨부 파일의 저장 이름',
  `product_id` int NOT NULL COMMENT '상품 고유 ID',
  PRIMARY KEY (`attatch_id`),
  KEY `fk_attatch_product` (`product_id`),
  CONSTRAINT `fk_attatch_product` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='첨부 파일 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_attatch`
--

LOCK TABLES `tbl_attatch` WRITE;
/*!40000 ALTER TABLE `tbl_attatch` DISABLE KEYS */;
INSERT INTO `tbl_attatch` VALUES (1,'/uploads/product1','image1.jpg','product1_image.jpg',1),(2,'/uploads/product2','image2.jpg','product2_image.jpg',2),(3,'/uploads/product3','image3.jpg','product3_image.jpg',3),(29,'2025/03/27','2025/03/27/45e0d901-d73a-4f67-bc5c-3e9feff5cc55.jpg','45e0d901-d73a-4f67-bc5c-3e9feff5cc55.jpg',76),(30,'2025/03/27','2025/03/27/2ce71ed2-1ae9-4a41-9834-cb90123edecb.png','2ce71ed2-1ae9-4a41-9834-cb90123edecb.png',76),(31,'2025/03/27','2025/03/27/79596e72-e53c-44ea-a1bf-52db7ccbb40b.png','79596e72-e53c-44ea-a1bf-52db7ccbb40b.png',76),(32,'2025/03/27','2025/03/27/2948c27a-ad2e-4dcb-9fd6-37bede215a4a.png','2948c27a-ad2e-4dcb-9fd6-37bede215a4a.png',76),(33,'2025/03/27','2025/03/27/1c4ea0d4-6044-4689-a24a-bc9377543b26.jpg','1c4ea0d4-6044-4689-a24a-bc9377543b26.jpg',76),(34,'2025/03/27','2025/03/27/2ea66795-6c44-4859-9f8b-a4ecc2118726.jpg','2ea66795-6c44-4859-9f8b-a4ecc2118726.jpg',76),(35,'2025/03/27','2025/03/27/a862cc71-f60c-4c9b-9336-f332fbb0f8c5.jpg','a862cc71-f60c-4c9b-9336-f332fbb0f8c5.jpg',76);
/*!40000 ALTER TABLE `tbl_attatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_author`
--

DROP TABLE IF EXISTS `tbl_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_author` (
  `author_id` int NOT NULL AUTO_INCREMENT COMMENT '작가 고유 ID',
  `author_name` varchar(20) NOT NULL COMMENT '작가 이름',
  `author_birth` date DEFAULT NULL COMMENT '작가 생년월일',
  `biography` text COMMENT '작가의 간단한 소개',
  `major_works` text COMMENT '작가의 주요작품',
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='작가 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_author`
--

LOCK TABLES `tbl_author` WRITE;
/*!40000 ALTER TABLE `tbl_author` DISABLE KEYS */;
INSERT INTO `tbl_author` VALUES (1,'김영하','1968-07-11','한국의 소설가이자 영화감독.','살인자의 기억법, 너의 목소리가 들려'),(2,'한강','1970-11-27','한국의 소설가로, 채식주의자로 유명.','채식주의자, 흰'),(3,'조정래','1943-08-21','한국의 대표적인 역사 소설가.','태백산맥, 아리랑'),(4,'공지영','1963-01-31','한국의 소설가이자 여성운동가.','우리들의 행복한 시간, 고등어'),(5,'김훈','1948-01-05','한국의 소설가이자 칼럼니스트.','칼의 노래, 남한산성'),(6,'은희경','1959-01-20','한국의 소설가로, 현대문학의 대표 작가.','빈처, 아내의 상자'),(7,'박완서','1931-10-20','한국의 소설가로, 전쟁과 가족을 주제로 한 작품이 많음.','그 많던 싱아는 누가 다 먹었을까, 미망'),(8,'김연수','1970-05-25','한국의 소설가로, 현대적인 감성을 담은 작품이 특징.','사랑을 놓치다, 빛의 제국'),(9,'정유정','1966-07-26','한국의 소설가로, 스릴러와 미스터리 작품이 유명.','내 인생의 스프링캠프, 28'),(10,'이외수','1946-05-05','한국의 소설가이자 화가.','천년의 사랑, 깃발없는 기수'),(11,'김성율','1999-02-17','김성율이다','김성율회고록'),(12,'얀 마텔',NULL,NULL,NULL),(16,'이우혁',NULL,NULL,NULL),(17,'무라카미 하루키','1949-01-12','일바의 유명 소설가','노르웨이의 숲(상실의 시대), 1Q84, 기사단장 죽이기, 해변의 카프카, 태엽 감는 새'),(18,'미야베 미유키',NULL,NULL,NULL),(20,'미아키 스가루',NULL,NULL,NULL),(22,'피터터친','1957-03-08','1957년 모스크바에서 태어났으나 1977년 소련에서 추방된 아버지와 함께 미국으로 이주했다. 뉴욕 대학교에서 생물학을 전공한 후 듀크 대학교에서 동물학으로 박사 학위를 받았다.',''),(23,'이치조 미사키',NULL,NULL,NULL),(24,'김지훤','2025-01-15','초등학교 교사','내가 나라서 정말 좋아'),(25,'박해영','2022-03-15','드라마 나의 아저씨 작가','나의 아저씨'),(26,'브렛 슬라킨','2020-10-30','파이썬','파이썬'),(27,'남궁성','2019-12-31','자바','자바'),(28,'사이토 가쓰히로','2025-03-27','사이토 가쓰히로','사이토 가쓰히로'),(29,'유물시선','2025-03-12','유물시선','유물시선'),(30,'강창훈','2025-03-07','강창훈','강창훈'),(31,'정관스님','2025-03-27','정관스님','정관스님'),(32,'강민구','2025-03-10','강민구','강민구'),(33,'이정기','2023-12-06','에이든 국내여행 가이드북','에이든 국내여행 가이드북'),(34,'브라이언 콕스','2025-03-27','브라이언 콕스','브라이언 콕스'),(35,'북적북적','2025-03-11','북적북적','북적'),(36,'작가',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbl_author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_cancel_definition`
--

DROP TABLE IF EXISTS `tbl_cancel_definition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cancel_definition` (
  `cancel_definition_id` int NOT NULL AUTO_INCREMENT COMMENT '취소정의고유 ID',
  `cancel_reason_definition` varchar(50) DEFAULT NULL COMMENT '취소 사유 이름(예: 고객 변심, 재고 부족 등)',
  PRIMARY KEY (`cancel_definition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='취소 사유 정의 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cancel_definition`
--

LOCK TABLES `tbl_cancel_definition` WRITE;
/*!40000 ALTER TABLE `tbl_cancel_definition` DISABLE KEYS */;
INSERT INTO `tbl_cancel_definition` VALUES (1,'고객 변심'),(2,'재고 부족'),(3,'배송 지연');
/*!40000 ALTER TABLE `tbl_cancel_definition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_cancel_reason`
--

DROP TABLE IF EXISTS `tbl_cancel_reason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cancel_reason` (
  `cancel_reason_id` int NOT NULL AUTO_INCREMENT COMMENT '취소 사유 고유 ID',
  `cancel_definition_id` int DEFAULT NULL COMMENT '주문 상태(취소 정의) 고유 ID',
  `order_item_id` int NOT NULL COMMENT '주문 상세 항목 고유 ID',
  `quantity` int DEFAULT NULL COMMENT '취소신청 상품수량',
  `cancel_reason` varchar(255) DEFAULT NULL COMMENT '취소 사유 상세 설명',
  `return_reason` varchar(255) DEFAULT NULL COMMENT '거부, 반려에 대한 상세 설명',
  `cancel_status_id` int DEFAULT NULL COMMENT '취소 상태 고유 ID (예: 요청, 승인, 거절, 환불완료)',
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '취소신청일시',
  `modify_dt` datetime DEFAULT NULL COMMENT '취소수정일시(취소완료,취소거부)',
  PRIMARY KEY (`cancel_reason_id`),
  KEY `fk_cancelreason_definition` (`cancel_definition_id`),
  KEY `fk_cancelreason_orderitem` (`order_item_id`),
  KEY `fk_cancelreason_status` (`cancel_status_id`),
  CONSTRAINT `fk_cancelreason_definition` FOREIGN KEY (`cancel_definition_id`) REFERENCES `tbl_cancel_definition` (`cancel_definition_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_cancelreason_orderitem` FOREIGN KEY (`order_item_id`) REFERENCES `tbl_order_item` (`order_item_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cancelreason_status` FOREIGN KEY (`cancel_status_id`) REFERENCES `tbl_cancel_status` (`cancel_status_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='취소 사유 상세 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cancel_reason`
--

LOCK TABLES `tbl_cancel_reason` WRITE;
/*!40000 ALTER TABLE `tbl_cancel_reason` DISABLE KEYS */;
INSERT INTO `tbl_cancel_reason` VALUES (1,1,1,1,'고객 변심','',4,'2025-03-26 00:07:22','2025-03-26 00:23:31'),(2,2,2,1,'재고 부족','',2,'2025-03-26 00:07:22','2025-03-26 00:07:22'),(3,3,3,1,'배송 지연','배송출발',3,'2025-03-26 00:07:22','2025-03-26 00:07:22'),(14,2,4,0,'지금7',NULL,4,'2025-03-26 16:31:28','2025-03-26 20:12:53'),(15,1,9,3,'ㅇ',NULL,4,'2025-03-26 16:38:58','2025-03-26 16:42:02'),(16,1,10,5,'s',NULL,4,'2025-03-26 16:42:10','2025-03-26 17:38:31'),(17,2,16,1,'dddd',NULL,4,'2025-03-26 17:54:04','2025-03-26 20:12:24'),(18,2,15,1,'dddd',NULL,4,'2025-03-26 17:54:04','2025-03-26 17:54:16'),(19,2,13,2,NULL,'dd',1,'2025-03-26 17:54:05','2025-03-26 17:54:45'),(20,1,15,1,'dd',NULL,4,'2025-03-26 20:12:18','2025-03-26 20:12:39'),(21,1,16,1,'df',NULL,4,'2025-03-26 20:13:29','2025-03-26 21:49:35'),(22,1,15,1,'df',NULL,4,'2025-03-26 20:13:29','2025-03-26 20:33:20'),(23,1,15,1,'ㄴ',NULL,4,'2025-03-26 20:33:31','2025-03-26 22:58:34'),(24,2,16,1,'ㅌㅍ',NULL,4,'2025-03-26 22:56:27','2025-03-26 22:56:36'),(25,1,16,1,'ㄴㅇㄹ',NULL,4,'2025-03-26 22:56:41','2025-03-26 22:58:18'),(26,3,15,1,NULL,'ㄴㄴㅇ',1,'2025-03-26 22:58:54','2025-03-26 23:04:09'),(27,2,16,1,'ㄴㅇ',NULL,2,'2025-03-26 23:02:34','2025-03-26 23:02:34'),(28,3,18,1,'ㅇㄴㅇ',NULL,2,'2025-03-26 23:02:50','2025-03-26 23:02:50'),(29,1,21,1,'필요없음',NULL,4,'2025-03-27 01:31:06','2025-03-27 10:12:31'),(30,1,24,3,NULL,'배송됨',3,'2025-03-27 11:38:41','2025-03-27 11:39:17'),(31,2,22,1,'asdf',NULL,4,'2025-03-27 13:16:55','2025-03-27 13:16:58');
/*!40000 ALTER TABLE `tbl_cancel_reason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_cancel_status`
--

DROP TABLE IF EXISTS `tbl_cancel_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cancel_status` (
  `cancel_status_id` int NOT NULL AUTO_INCREMENT COMMENT '취소상태고유ID',
  `status_name` varchar(50) DEFAULT NULL COMMENT '취소 진행 상태 (예: 취소요청, 취소완료, 취소거부 등)',
  PRIMARY KEY (`cancel_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='취소 진행 상태 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cancel_status`
--

LOCK TABLES `tbl_cancel_status` WRITE;
/*!40000 ALTER TABLE `tbl_cancel_status` DISABLE KEYS */;
INSERT INTO `tbl_cancel_status` VALUES (1,'취소완료'),(2,'취소요청'),(3,'취소거부'),(4,'취소철회');
/*!40000 ALTER TABLE `tbl_cancel_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_cart`
--

DROP TABLE IF EXISTS `tbl_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT COMMENT '장바구니 고유 ID',
  `user_id` int NOT NULL COMMENT '회원 아이디',
  `cart_created_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '장바구니 생성일',
  `cart_updated_dt` datetime DEFAULT NULL COMMENT '장바구니 수정일',
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `uq_tbl_cart_user` (`user_id`),
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='회원별 장바구니 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cart`
--

LOCK TABLES `tbl_cart` WRITE;
/*!40000 ALTER TABLE `tbl_cart` DISABLE KEYS */;
INSERT INTO `tbl_cart` VALUES (1,1,'2025-03-26 00:07:21',NULL),(2,2,'2025-03-26 00:07:21',NULL),(3,3,'2025-03-26 00:07:21',NULL),(4,4,'2025-03-26 00:07:21',NULL),(5,5,'2025-03-26 00:07:21',NULL),(6,6,'2025-03-26 00:07:21',NULL),(7,7,'2025-03-26 00:07:21',NULL),(9,9,'2025-03-26 00:07:21',NULL),(18,18,'2025-03-27 10:37:45',NULL),(19,19,'2025-03-27 10:52:23',NULL),(20,20,'2025-03-27 11:20:32',NULL),(21,21,'2025-03-27 11:24:31',NULL),(23,23,'2025-03-27 12:44:23',NULL),(28,28,'2025-03-27 15:32:47',NULL),(29,29,'2025-03-27 15:36:29',NULL),(30,30,'2025-03-27 15:45:33',NULL);
/*!40000 ALTER TABLE `tbl_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_cart_item`
--

DROP TABLE IF EXISTS `tbl_cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cart_item` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT COMMENT '장바구니 항목 고유 ID',
  `cart_id` int NOT NULL COMMENT '장바구니 고유 ID',
  `product_id` int NOT NULL COMMENT '상품 고유 ID',
  `product_quantity` int DEFAULT NULL COMMENT '장바구니에 담긴 상품 개수',
  `cart_item_created_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '장바구니 항목 등록일',
  `cart_item_updated_dt` datetime DEFAULT NULL COMMENT '장바구니 항목 수정일',
  PRIMARY KEY (`cart_item_id`),
  KEY `fk_cart_item_cart` (`cart_id`),
  KEY `fk_cart_item_product` (`product_id`),
  CONSTRAINT `fk_cart_item_cart` FOREIGN KEY (`cart_id`) REFERENCES `tbl_cart` (`cart_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cart_item_product` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='장바구니 항목 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cart_item`
--

LOCK TABLES `tbl_cart_item` WRITE;
/*!40000 ALTER TABLE `tbl_cart_item` DISABLE KEYS */;
INSERT INTO `tbl_cart_item` VALUES (3,2,3,2,'2025-03-26 00:07:22','2025-03-26 00:07:22'),(8,5,12,1,'2025-03-13 01:16:49','2025-03-13 01:16:49'),(36,5,76,3,'2025-03-27 11:18:23','2025-03-27 11:28:38'),(50,20,15,1,'2025-03-27 16:26:51','2025-03-27 16:26:51'),(52,20,4,1,'2025-03-27 16:27:09','2025-03-27 16:27:09'),(53,20,1,1,'2025-03-27 16:27:10','2025-03-27 16:27:10'),(54,20,18,1,'2025-03-27 16:27:14','2025-03-27 16:27:14');
/*!40000 ALTER TABLE `tbl_cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_delete_user_log`
--

DROP TABLE IF EXISTS `tbl_delete_user_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_delete_user_log` (
  `delete_log_id` int NOT NULL AUTO_INCREMENT COMMENT '탈퇴 로그 아이디',
  `user_id` int NOT NULL COMMENT '회원 아이디',
  `user_name` varchar(30) DEFAULT NULL COMMENT '회원이름',
  `user_nickname` varchar(50) DEFAULT NULL COMMENT '회원닉네임',
  `user_email` varchar(50) DEFAULT NULL COMMENT '회원이메일',
  `withdrawal_reason` varchar(300) DEFAULT NULL COMMENT '탈퇴사유',
  `delete_dt` datetime DEFAULT NULL COMMENT '탈퇴일자',
  PRIMARY KEY (`delete_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='탈퇴 회원 로그 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_delete_user_log`
--

LOCK TABLES `tbl_delete_user_log` WRITE;
/*!40000 ALTER TABLE `tbl_delete_user_log` DISABLE KEYS */;
INSERT INTO `tbl_delete_user_log` VALUES (1,1,'홍길동','길동이','user1@example.com','서비스 불만','2025-03-26 00:07:23'),(2,2,'김철수','철수','user2@example.com','개인 사정','2025-03-26 00:07:23'),(3,3,'관리자','admin','admin@example.com','계정 통합','2025-03-26 00:07:23'),(4,10,'dddd','dddd','dddd','사용자 탈퇴','2025-03-13 15:28:42'),(5,11,'ffff','ffffff','ffff','사용자 탈퇴','2025-03-13 15:28:45'),(6,8,'홍길동','cccc','cccc','사용자 탈퇴','2025-03-26 21:52:55'),(11,15,'짠짠','도적단임','chan1@naver.com','사용자 탈퇴','2025-03-27 12:42:55'),(14,10,'찬관리자','로그인담당','chan@naver.com','사용자 탈퇴','2025-03-27 12:43:21'),(15,22,'chanchan','통촉하여주시옵소','chan1234@naver.com','사용자 탈퇴','2025-03-27 12:43:21'),(16,24,NULL,'김재찬','rla1995cks@naver.com','사용자 탈퇴','2025-03-27 14:20:20'),(17,25,'','도적단','Jae@naver.com','사용자 탈퇴','2025-03-27 14:24:18'),(18,26,'홍길동','cccc','jae@naver.com','사용자 탈퇴','2025-03-27 14:26:11'),(19,27,'관리자','도적단','jae@naver.com','사용자 탈퇴','2025-03-27 14:30:05');
/*!40000 ALTER TABLE `tbl_delete_user_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_delivery_address`
--

DROP TABLE IF EXISTS `tbl_delivery_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_delivery_address` (
  `addr_id` int NOT NULL AUTO_INCREMENT COMMENT '배송지 고유 ID',
  `user_id` int DEFAULT NULL COMMENT '회원 아이디',
  `road_address` varchar(255) DEFAULT NULL COMMENT '도로명주소',
  `jibun_address` varchar(255) DEFAULT NULL COMMENT '지번주소',
  `detail_address` varchar(255) DEFAULT NULL COMMENT '상세주소',
  `extra_address` varchar(255) DEFAULT NULL COMMENT '추가 주소 정보 (예: 동/층/호 등)',
  `postcode` varchar(15) DEFAULT NULL COMMENT '우편번호',
  `addr_name` varchar(50) DEFAULT NULL COMMENT '배송지(수취인) 이름',
  `receiver_phone` varchar(15) DEFAULT NULL COMMENT '수취인전화번호',
  `primary_addr` tinyint(1) DEFAULT NULL COMMENT '대표배송지 여부',
  `delivery_request` varchar(255) DEFAULT NULL COMMENT '배송요청사항',
  PRIMARY KEY (`addr_id`),
  KEY `fk_deladdr_user` (`user_id`),
  CONSTRAINT `fk_deladdr_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='배송지 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_delivery_address`
--

LOCK TABLES `tbl_delivery_address` WRITE;
/*!40000 ALTER TABLE `tbl_delivery_address` DISABLE KEYS */;
INSERT INTO `tbl_delivery_address` VALUES (2,2,'경기도 수원시 팔달구','888-888','202동 202호','현관비번 2222','16423','김철수','01087654321',1,'초인종금지'),(4,5,'서울 강남구 테헤란로 127','','123',' (역삼동)','06133','관리자','010-1234-5678',0,'524호로 부탁합니다'),(5,5,'서울 서초구 나루터로 15','서울 서초구 잠원동 54-5','2',' (잠원동)','06517','학원','010-9999-9999',0,'교장실로 부탁합니다'),(6,19,'경기 군포시 금정로45번길 36','경기 군포시 금정동 725-21','303',' (금정동, 골든트리)','15813','집','01011112222',0,''),(7,18,'서울 강남구 테헤란로 101','','524호',' (역삼동)','06134','그린컴퓨터','01012341234',0,'전화주세요');
/*!40000 ALTER TABLE `tbl_delivery_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_faq`
--

DROP TABLE IF EXISTS `tbl_faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_faq` (
  `faq_id` int NOT NULL AUTO_INCREMENT COMMENT 'FAQ 아이디',
  `user_id` int NOT NULL COMMENT '작성자(회원 아이디)',
  `faq_title` varchar(100) NOT NULL COMMENT 'FAQ 제목',
  `faq_content` text COMMENT 'FAQ 내용',
  `faq_create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'FAQ 작성일자',
  `faq_update_dt` datetime DEFAULT NULL COMMENT 'FAQ 수정일자',
  PRIMARY KEY (`faq_id`),
  KEY `fk_faq_user` (`user_id`),
  CONSTRAINT `fk_faq_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='FAQ 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_faq`
--

LOCK TABLES `tbl_faq` WRITE;
/*!40000 ALTER TABLE `tbl_faq` DISABLE KEYS */;
INSERT INTO `tbl_faq` VALUES (1,1,'Q. 회원가입은 어떻게 하나요?','<p>A. 우측 상단의 회원가입을 누르고 인내에 때라 가입절차를 진행하시면 됩니다.</p>','2025-03-26 00:07:23','2025-03-27 09:51:33'),(2,2,'Q: 결제는 어떻게 하나요?','<p>A: 결제 방법은 KG이니시스와 카카오페이를 지원하고있습니다.</p>','2025-03-26 00:07:23','2025-03-26 18:46:17'),(3,3,'Q: 배송 기간은 얼마나 걸리나요?','<p>A: 배송 기간은 평일 기준 2~3일정도 소요됩니다.</p>','2025-03-26 00:07:23','2025-03-26 18:46:05'),(5,1,'Q: 계정을 삭제하고 싶어요. 어떻게 하나요? ','<p>A: 마이페이지 &gt; 내정보 메뉴에서 비밀번호 입력 후 회원탈퇴 버튼을 누르시면 계정을 삭제할 수 있습니다.&nbsp;</p><p>&nbsp;&nbsp;계정을 삭제하면 모든 데이터가 영구적으로 삭제되므로 신중히 결정해주세요.</p>','2025-03-26 18:45:34','2025-03-27 10:47:14'),(6,1,'Q: 내 개인정보는 안전한가요?','<p>A: 모든 개인정보는 암호화되어 안전하게 저장됩니다. </p><p>    개인정보 보호를 위해 최신 보안 기술을 사용하고 있습니다.</p>','2025-03-26 19:38:03','2025-03-26 19:38:03');
/*!40000 ALTER TABLE `tbl_faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_genre`
--

DROP TABLE IF EXISTS `tbl_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_genre` (
  `genre_id` int NOT NULL AUTO_INCREMENT COMMENT '상품 장르 아이디',
  `genre_name` varchar(20) NOT NULL COMMENT '도서 장르 이름',
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='장르 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_genre`
--

LOCK TABLES `tbl_genre` WRITE;
/*!40000 ALTER TABLE `tbl_genre` DISABLE KEYS */;
INSERT INTO `tbl_genre` VALUES (1,'문학'),(2,'자기계발'),(3,'사회역사'),(4,'여행'),(5,'요리'),(6,'어린이'),(7,'예술'),(8,'과학'),(9,'경제'),(10,'IT');
/*!40000 ALTER TABLE `tbl_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_like`
--

DROP TABLE IF EXISTS `tbl_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_like` (
  `like_id` int NOT NULL AUTO_INCREMENT COMMENT '좋아요 ID',
  `user_id` int DEFAULT NULL COMMENT '회원 아이디',
  `product_id` int NOT NULL COMMENT '도서 고유 ID',
  PRIMARY KEY (`like_id`),
  KEY `fk_like_user` (`user_id`),
  KEY `fk_like_product` (`product_id`),
  CONSTRAINT `fk_like_product` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_like_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='좋아요 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_like`
--

LOCK TABLES `tbl_like` WRITE;
/*!40000 ALTER TABLE `tbl_like` DISABLE KEYS */;
INSERT INTO `tbl_like` VALUES (1,1,1),(3,3,3),(4,4,4),(6,3,24),(7,4,19),(8,1,24),(9,3,19),(11,4,6),(12,2,21),(14,4,19),(15,4,22),(16,4,2),(17,2,6),(18,3,15),(19,4,20),(20,1,12),(21,4,3),(22,3,11),(23,4,13),(24,3,20),(25,4,23),(26,1,11),(27,1,1),(29,2,9),(30,1,5),(32,3,2),(33,2,3),(34,1,2),(35,1,7),(65,1,84),(66,1,90),(67,1,91);
/*!40000 ALTER TABLE `tbl_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_login_log`
--

DROP TABLE IF EXISTS `tbl_login_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_login_log` (
  `login_log_id` int NOT NULL AUTO_INCREMENT COMMENT '로그인 로그 아이디',
  `user_id` int NOT NULL COMMENT '회원 아이디',
  `login_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '로그인 날짜',
  `login_browser` varchar(300) DEFAULT NULL COMMENT '로그인 브라우저 정보',
  `ip_addr` varchar(50) DEFAULT NULL COMMENT '로그인 아이피',
  PRIMARY KEY (`login_log_id`),
  KEY `fk_loginlog_user` (`user_id`),
  CONSTRAINT `fk_loginlog_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='사용자 로그인 로그 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_login_log`
--

LOCK TABLES `tbl_login_log` WRITE;
/*!40000 ALTER TABLE `tbl_login_log` DISABLE KEYS */;
INSERT INTO `tbl_login_log` VALUES (4,5,'2025-03-13 15:20:31','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(5,5,'2025-03-13 15:30:05','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(10,1,'2025-03-26 00:07:26','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.0.27'),(11,1,'2025-03-26 00:23:19','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.0.27'),(12,1,'2025-03-26 00:27:36','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.0.27'),(13,1,'2025-03-26 00:44:33','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','RY-Lenovo/192.168.56.1'),(14,1,'2025-03-26 09:35:40','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(15,1,'2025-03-26 10:36:46','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(16,5,'2025-03-26 10:43:35','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(17,7,'2025-03-26 10:59:03','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(18,7,'2025-03-26 10:59:41','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(19,5,'2025-03-26 10:59:53','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(20,5,'2025-03-26 11:08:52','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(21,1,'2025-03-26 11:27:40','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(22,9,'2025-03-26 11:57:21','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(25,1,'2025-03-26 12:20:18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(26,1,'2025-03-26 12:35:17','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(27,1,'2025-03-26 12:36:04','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(28,1,'2025-03-26 12:36:11','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(29,5,'2025-03-26 12:36:18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(30,5,'2025-03-26 12:36:28','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(31,5,'2025-03-26 12:39:00','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(32,5,'2025-03-26 12:39:27','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(33,5,'2025-03-26 12:40:25','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(34,5,'2025-03-26 12:40:32','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(36,1,'2025-03-26 12:40:38','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(37,1,'2025-03-26 12:42:09','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(38,7,'2025-03-26 12:44:44','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(39,5,'2025-03-26 12:45:13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(40,1,'2025-03-26 12:46:14','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(41,5,'2025-03-26 12:46:21','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(42,5,'2025-03-26 12:46:53','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(43,5,'2025-03-26 12:49:22','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(44,1,'2025-03-26 12:49:53','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(46,7,'2025-03-26 13:14:32','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(47,5,'2025-03-26 13:14:56','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(48,5,'2025-03-26 13:24:26','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(49,7,'2025-03-26 13:45:12','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(51,5,'2025-03-26 14:13:06','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(52,1,'2025-03-26 14:17:11','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(54,5,'2025-03-26 15:03:24','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(55,7,'2025-03-26 15:06:52','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(56,1,'2025-03-26 15:23:52','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(57,1,'2025-03-26 15:39:08','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(59,5,'2025-03-26 15:46:22','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(60,1,'2025-03-26 15:58:37','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(62,5,'2025-03-26 16:03:01','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(63,1,'2025-03-26 16:04:36','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(65,1,'2025-03-26 16:25:08','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(66,1,'2025-03-26 16:36:39','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(67,9,'2025-03-26 16:56:06','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(70,5,'2025-03-26 17:01:05','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(71,5,'2025-03-26 17:09:58','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(72,1,'2025-03-26 17:10:02','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(73,7,'2025-03-26 17:11:02','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(74,7,'2025-03-26 17:29:20','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(75,1,'2025-03-26 17:30:04','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(76,9,'2025-03-26 17:39:28','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(78,1,'2025-03-26 17:45:10','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(80,1,'2025-03-26 17:53:51','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(81,1,'2025-03-26 17:55:41','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(82,7,'2025-03-26 17:57:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(83,1,'2025-03-26 17:58:44','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(84,1,'2025-03-26 18:04:22','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(86,1,'2025-03-26 18:41:04','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(90,1,'2025-03-26 19:12:54','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(91,5,'2025-03-26 19:13:51','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(92,1,'2025-03-26 19:20:35','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(93,5,'2025-03-26 19:27:32','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(94,7,'2025-03-26 19:29:20','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(95,5,'2025-03-26 19:32:28','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(96,9,'2025-03-26 19:35:50','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(97,1,'2025-03-26 19:36:12','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(98,7,'2025-03-26 19:41:53','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(99,7,'2025-03-26 20:13:29','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(100,9,'2025-03-26 20:26:11','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(101,1,'2025-03-26 20:34:25','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(102,1,'2025-03-26 21:03:02','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(104,7,'2025-03-26 21:30:12','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(109,1,'2025-03-26 22:16:54','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.0.27'),(110,1,'2025-03-26 23:03:33','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.0.27'),(111,1,'2025-03-26 23:07:04','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.0.27'),(112,5,'2025-03-27 00:12:50','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/172.30.1.47'),(113,1,'2025-03-27 00:15:48','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.0.27'),(114,1,'2025-03-27 01:21:02','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.0.27'),(115,1,'2025-03-27 02:23:53','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','RY-Lenovo/192.168.56.1'),(116,1,'2025-03-27 02:45:04','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','RY-Lenovo/192.168.56.1'),(117,1,'2025-03-27 03:26:38','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','RY-Lenovo/192.168.56.1'),(118,1,'2025-03-27 09:38:32','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(119,1,'2025-03-27 09:50:37','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(121,1,'2025-03-27 10:03:34','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(124,5,'2025-03-27 10:36:57','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(125,18,'2025-03-27 10:37:51','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(126,5,'2025-03-27 10:39:18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(127,18,'2025-03-27 10:40:17','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(129,1,'2025-03-27 10:49:40','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(130,1,'2025-03-27 10:52:35','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(131,19,'2025-03-27 10:53:38','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(132,1,'2025-03-27 10:54:54','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(133,7,'2025-03-27 10:55:04','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(134,5,'2025-03-27 10:55:29','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(135,19,'2025-03-27 10:56:49','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(136,5,'2025-03-27 11:07:14','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(137,5,'2025-03-27 11:08:22','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(138,5,'2025-03-27 11:08:50','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(139,1,'2025-03-27 11:15:05','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(140,19,'2025-03-27 11:16:45','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(141,1,'2025-03-27 11:17:26','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(142,1,'2025-03-27 11:19:05','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(143,5,'2025-03-27 11:19:22','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(144,5,'2025-03-27 11:20:10','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(145,7,'2025-03-27 11:20:25','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(146,20,'2025-03-27 11:20:45','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(147,7,'2025-03-27 11:22:18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(148,5,'2025-03-27 11:22:30','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(149,5,'2025-03-27 11:22:44','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(150,1,'2025-03-27 11:23:49','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(151,21,'2025-03-27 11:24:44','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(152,1,'2025-03-27 11:27:35','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(153,5,'2025-03-27 11:28:20','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(154,20,'2025-03-27 11:28:21','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(155,5,'2025-03-27 11:29:48','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(156,1,'2025-03-27 11:32:18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(157,21,'2025-03-27 11:32:45','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(158,1,'2025-03-27 11:33:50','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(159,19,'2025-03-27 11:34:32','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(160,1,'2025-03-27 11:34:36','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(161,1,'2025-03-27 11:34:36','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(162,1,'2025-03-27 11:34:58','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(163,5,'2025-03-27 11:37:01','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(164,1,'2025-03-27 11:37:39','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(165,5,'2025-03-27 11:39:46','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(166,18,'2025-03-27 11:42:29','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(167,5,'2025-03-27 11:47:21','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(168,1,'2025-03-27 11:47:34','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(169,5,'2025-03-27 11:48:38','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(170,1,'2025-03-27 11:52:44','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(171,1,'2025-03-27 11:54:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(172,5,'2025-03-27 11:54:19','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(173,1,'2025-03-27 11:57:46','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(174,5,'2025-03-27 12:00:48','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(175,5,'2025-03-27 12:01:33','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','DESKTOP-55PEL1V/192.168.94.198'),(176,5,'2025-03-27 12:03:03','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(177,5,'2025-03-27 12:04:11','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(178,5,'2025-03-27 12:05:21','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(179,5,'2025-03-27 12:07:05','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(180,5,'2025-03-27 12:08:19','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(181,18,'2025-03-27 12:13:48','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(182,1,'2025-03-27 12:14:12','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(183,1,'2025-03-27 12:14:13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(184,5,'2025-03-27 12:17:10','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(185,1,'2025-03-27 12:18:39','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(186,6,'2025-03-27 12:22:06','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(187,5,'2025-03-27 12:22:19','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(188,7,'2025-03-27 12:23:22','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(189,5,'2025-03-27 12:44:29','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(190,23,'2025-03-27 12:45:00','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(191,5,'2025-03-27 12:45:28','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(192,5,'2025-03-27 12:47:30','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(193,5,'2025-03-27 12:51:18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(194,23,'2025-03-27 12:55:08','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(195,1,'2025-03-27 13:12:06','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(196,1,'2025-03-27 13:15:34','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(197,1,'2025-03-27 13:15:56','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(198,1,'2025-03-27 13:16:01','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(199,1,'2025-03-27 13:16:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(200,1,'2025-03-27 13:16:32','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(201,1,'2025-03-27 13:16:47','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(202,1,'2025-03-27 13:19:52','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(203,23,'2025-03-27 13:22:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(204,23,'2025-03-27 13:40:10','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024GIKUBN/192.168.10.113'),(205,7,'2025-03-27 14:11:52','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(206,7,'2025-03-27 14:13:04','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(207,7,'2025-03-27 14:13:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(208,7,'2025-03-27 14:18:50','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(209,1,'2025-03-27 14:20:18','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(210,7,'2025-03-27 14:27:09','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(211,23,'2025-03-27 14:27:12','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(212,7,'2025-03-27 14:27:37','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(213,7,'2025-03-27 14:27:47','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(215,7,'2025-03-27 14:29:41','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(216,1,'2025-03-27 14:31:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(217,6,'2025-03-27 14:45:50','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(218,5,'2025-03-27 14:47:12','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(219,1,'2025-03-27 14:48:34','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(220,5,'2025-03-27 14:48:47','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(221,5,'2025-03-27 14:53:33','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(222,1,'2025-03-27 15:18:22','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(223,1,'2025-03-27 15:21:49','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(224,7,'2025-03-27 15:29:30','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(225,7,'2025-03-27 15:31:00','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(226,7,'2025-03-27 15:31:24','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(227,28,'2025-03-27 15:33:02','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(228,1,'2025-03-27 15:34:37','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(229,5,'2025-03-27 15:35:08','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(230,1,'2025-03-27 15:37:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(231,5,'2025-03-27 15:40:00','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(232,7,'2025-03-27 15:40:12','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(233,5,'2025-03-27 15:40:51','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ESJHXX/192.168.10.118'),(234,20,'2025-03-27 15:48:05','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024BMBQGR/192.168.10.117'),(235,1,'2025-03-27 15:51:05','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(236,7,'2025-03-27 16:07:36','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','User-2024ANSXYP/192.168.56.1'),(237,20,'2025-03-27 16:15:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199'),(238,1,'2025-03-27 16:27:49','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36','hee02/192.168.94.199');
/*!40000 ALTER TABLE `tbl_login_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_notice`
--

DROP TABLE IF EXISTS `tbl_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_notice` (
  `notice_id` int NOT NULL AUTO_INCREMENT COMMENT '공지사항 아이디',
  `user_id` int NOT NULL COMMENT '작성자 (회원 아이디)',
  `notice_title` varchar(100) NOT NULL COMMENT '공지사항 제목',
  `notice_content` text COMMENT '공지사항 내용',
  `notice_create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '공지사항 작성일자',
  `notice_update_dt` datetime DEFAULT NULL COMMENT '공지사항 수정일자',
  PRIMARY KEY (`notice_id`),
  KEY `fk_notice_user` (`user_id`),
  CONSTRAINT `fk_notice_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='공지사항 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_notice`
--

LOCK TABLES `tbl_notice` WRITE;
/*!40000 ALTER TABLE `tbl_notice` DISABLE KEYS */;
INSERT INTO `tbl_notice` VALUES (1,1,'시스템 점검 안내','<p>4월 1일 새벽 2시 ~ 4시 점검 예정입니다.</p><p>참고해주시기 바랍니다.</p><p>감사합니다.</p><p>  ※ 내부사정에 따라 점검시간은 조기오픈/변경될 수 있습니다.</p>','2025-03-26 00:07:22','2025-03-27 10:46:15'),(2,2,'배송 지연 안내','<p>현재 예상보다 많은 주문이 몰리고 있어, 일부 지역에서 배송 지연이 발생하고 있음을 안내드립니다.</p><p>고객님께서 주문하신 상품은 최대한 빠른 시일 내에 배송될 수 있도록 최선을 다하고 있으니 양해 부탁드립니다.</p><p>감사합니다.</p>','2025-03-26 00:07:22','2025-03-27 10:46:31'),(3,3,'4월 이벤트 안내','<p>4월 한 달 간 할인 이벤트 진행합니다.</p><ul><li>기간 : 4/1 ~ 4/30</li><li>※ 일부 상품은 할인이 제외 될 수 있습니다.</li></ul>','2025-03-26 00:07:23','2025-03-26 17:34:23');
/*!40000 ALTER TABLE `tbl_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_order`
--

DROP TABLE IF EXISTS `tbl_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_order` (
  `order_id` int NOT NULL AUTO_INCREMENT COMMENT '주문 고유 식별자',
  `user_id` int DEFAULT NULL COMMENT '주문한 사용자 (회원)',
  `addr_id` int DEFAULT NULL COMMENT '배송지 고유 ID',
  `total_price` int DEFAULT NULL COMMENT '주문의 총 금액',
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '주문 생성 날짜',
  `modify_dt` datetime DEFAULT NULL COMMENT '주문 상태 변경 날짜',
  PRIMARY KEY (`order_id`),
  KEY `fk_order_user` (`user_id`),
  KEY `fk_order_delivery` (`addr_id`),
  CONSTRAINT `fk_order_delivery` FOREIGN KEY (`addr_id`) REFERENCES `tbl_delivery_address` (`addr_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='주문 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_order`
--

LOCK TABLES `tbl_order` WRITE;
/*!40000 ALTER TABLE `tbl_order` DISABLE KEYS */;
INSERT INTO `tbl_order` VALUES (1,1,NULL,30000,'2025-02-18 15:36:33',NULL),(2,2,2,45000,'2025-03-18 15:36:33',NULL),(3,1,NULL,20000,'2025-03-26 00:07:21',NULL),(4,1,NULL,170000,'2025-03-26 00:28:13','2025-03-26 01:06:21'),(5,1,NULL,73100,'2025-03-26 13:11:34','2025-03-26 13:11:34'),(6,5,4,44,'2025-03-26 15:03:51','2025-03-26 15:03:51'),(7,1,NULL,0,'2025-03-26 15:24:44','2025-03-26 15:25:48'),(8,1,NULL,11101,'2025-03-26 17:16:45','2025-03-26 23:04:09'),(9,1,NULL,27000,'2025-03-27 01:21:54','2025-03-27 01:21:54'),(12,1,NULL,1000,'2025-03-27 09:52:24','2025-03-27 09:52:24'),(14,1,NULL,14000,'2025-03-27 09:59:15','2025-03-27 09:59:15'),(17,1,NULL,60000,'2025-03-27 11:38:11','2025-03-27 11:38:11'),(18,19,6,36110,'2025-03-27 11:44:23','2025-03-27 11:44:23'),(19,18,7,120,'2025-03-27 11:44:14','2025-03-27 11:44:14'),(20,19,6,110,'2025-03-27 11:45:27','2025-03-27 11:45:27'),(21,18,7,23000,'2025-03-27 11:45:26','2025-03-27 11:45:26'),(22,19,6,16000,'2025-03-27 11:46:18','2025-03-27 11:46:18'),(23,5,4,32000,'2025-03-27 11:47:54','2025-03-27 11:47:54');
/*!40000 ALTER TABLE `tbl_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_order_item`
--

DROP TABLE IF EXISTS `tbl_order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_order_item` (
  `order_item_id` int NOT NULL AUTO_INCREMENT COMMENT '주문 상세 항목 고유 ID',
  `order_id` int DEFAULT NULL COMMENT '주문 고유 식별자',
  `product_id` int DEFAULT NULL COMMENT '주문한 상품 (tbl_product.product_id)',
  `order_status_id` int DEFAULT NULL COMMENT '주문 상태 고유 ID',
  `quantity` int DEFAULT NULL COMMENT '주문한 상품 개수',
  `price` int DEFAULT NULL COMMENT '개별 상품 가격',
  `modify_dt` datetime DEFAULT NULL COMMENT '주문 상세 수정 날짜',
  PRIMARY KEY (`order_item_id`),
  KEY `fk_orderitem_order` (`order_id`),
  KEY `fk_orderitem_product` (`product_id`),
  KEY `fk_orderitem_status` (`order_status_id`),
  CONSTRAINT `fk_orderitem_order` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orderitem_product` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orderitem_status` FOREIGN KEY (`order_status_id`) REFERENCES `tbl_order_status` (`order_status_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='주문 상세 항목 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_order_item`
--

LOCK TABLES `tbl_order_item` WRITE;
/*!40000 ALTER TABLE `tbl_order_item` DISABLE KEYS */;
INSERT INTO `tbl_order_item` VALUES (1,1,1,1,1,100,'2025-03-26 00:07:22'),(2,2,2,2,2,110,'2025-03-26 00:07:22'),(3,3,3,3,1,120,'2025-03-26 00:07:22'),(4,4,2,1,0,110,'2025-03-26 01:06:21'),(5,4,5,1,4,16000,'2025-03-26 00:28:13'),(6,4,7,1,6,15000,'2025-03-26 00:28:13'),(7,4,15,1,1,16000,'2025-03-26 00:28:13'),(8,5,1,4,1,100,'2025-03-26 16:03:37'),(9,5,4,1,3,1000,'2025-03-26 13:11:34'),(10,5,6,1,5,14000,'2025-03-26 13:11:34'),(12,7,24,4,0,13000,'2025-03-26 15:40:15'),(13,8,15,4,0,16000,'2025-03-26 17:54:45'),(15,8,9,4,0,11000,'2025-03-26 23:04:09'),(16,8,1,1,1,100,'2025-03-26 17:16:45'),(17,8,4,2,1,1000,'2025-03-26 17:58:37'),(18,8,25,1,1,10000,'2025-03-26 17:16:45'),(19,9,15,2,1,16000,'2025-03-27 01:22:55'),(20,9,4,3,1,1000,'2025-03-27 01:23:04'),(21,9,25,1,1,10000,'2025-03-27 01:21:54'),(22,12,4,1,1,1000,'2025-03-27 09:52:24'),(23,14,13,3,1,14000,'2025-03-27 11:32:34'),(24,17,76,3,3,20000,'2025-03-27 11:39:17'),(25,18,76,1,1,23000,'2025-03-27 11:44:23'),(26,18,2,1,1,110,'2025-03-27 11:44:23'),(27,18,19,1,1,13000,'2025-03-27 11:44:23'),(28,19,3,1,1,120,'2025-03-27 11:44:14'),(29,20,2,1,1,110,'2025-03-27 11:45:27'),(30,21,76,1,1,23000,'2025-03-27 11:45:26'),(31,22,15,1,1,16000,'2025-03-27 11:46:18'),(32,23,15,3,2,16000,'2025-03-27 11:48:40');
/*!40000 ALTER TABLE `tbl_order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_order_status`
--

DROP TABLE IF EXISTS `tbl_order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_order_status` (
  `order_status_id` int NOT NULL AUTO_INCREMENT COMMENT '주문 상태 고유 ID',
  `status_name` varchar(50) DEFAULT NULL COMMENT '주문 진행 상태 (결제완료, 배송완료, 취소접수 등)',
  PRIMARY KEY (`order_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='주문 상태 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_order_status`
--

LOCK TABLES `tbl_order_status` WRITE;
/*!40000 ALTER TABLE `tbl_order_status` DISABLE KEYS */;
INSERT INTO `tbl_order_status` VALUES (1,'결제완료'),(2,'배송중'),(3,'배송완료'),(4,'환불완료');
/*!40000 ALTER TABLE `tbl_order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pay`
--

DROP TABLE IF EXISTS `tbl_pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pay` (
  `pay_id` int NOT NULL AUTO_INCREMENT COMMENT '결제 정보 고유 ID',
  `order_id` int DEFAULT NULL COMMENT '주문 고유 ID',
  `imp_uid` varchar(50) DEFAULT NULL COMMENT '아임포트 결제 식별 ID',
  `amount` int DEFAULT NULL COMMENT '실제 결제 금액',
  `pay_status` varchar(20) DEFAULT NULL COMMENT '결제 상태(결제 완료, 결제 취소 등)',
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '결제 발생 날짜',
  `modify_dt` datetime DEFAULT NULL COMMENT '결제 상태 변경 날짜',
  PRIMARY KEY (`pay_id`),
  KEY `fk_pay_order` (`order_id`),
  CONSTRAINT `fk_pay_order` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`order_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='결제 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pay`
--

LOCK TABLES `tbl_pay` WRITE;
/*!40000 ALTER TABLE `tbl_pay` DISABLE KEYS */;
INSERT INTO `tbl_pay` VALUES (1,1,'imp_123456',30000,'결제완료','2025-03-26 00:07:21','2025-03-26 00:07:21'),(2,2,'imp_654321',45000,'결제완료','2025-03-26 00:07:21','2025-03-26 00:07:21'),(3,3,'imp_987654',20000,'결제완료','2025-03-26 00:07:21','2025-03-26 00:07:21'),(22,7,'1925d0fe12e5cebb',0,'결제완료','2025-03-26 15:24:45',NULL),(23,8,'9899655403ec20b9',11101,'결제완료','2025-03-26 17:16:46',NULL),(24,9,'ba72d4cc46475059',27000,'결제완료','2025-03-27 01:21:55',NULL),(25,12,'868a1bfd44beeacd',1000,'결제완료','2025-03-27 09:52:24',NULL),(26,14,'d25415cc86f8d4e3',14000,'결제완료','2025-03-27 09:59:16',NULL),(27,17,'31bc6439b8241a59',60000,'결제완료','2025-03-27 11:38:12',NULL),(28,18,'cec954146816e5f9',36110,'결제완료','2025-03-27 11:44:22',NULL),(29,19,'67365711dcaba1dd',120,'결제완료','2025-03-27 11:44:26',NULL),(30,20,'4e32df1f0a119690',110,'결제완료','2025-03-27 11:45:27',NULL),(31,21,'83c9fb33f1dac459',23000,'결제완료','2025-03-27 11:45:38',NULL),(32,22,'d9386d0eb2acd497',16000,'결제완료','2025-03-27 11:46:18',NULL),(33,23,'d152b013d1015b03',32000,'결제완료','2025-03-27 11:48:06',NULL);
/*!40000 ALTER TABLE `tbl_pay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_product` (
  `product_id` int NOT NULL AUTO_INCREMENT COMMENT '도서 고유 ID',
  `user_id` int DEFAULT NULL COMMENT '상품 등록자 아이디',
  `genre_id` int NOT NULL COMMENT '상품 장르 아이디',
  `publisher_id` int NOT NULL COMMENT '출판사 고유 ID',
  `author_id` int NOT NULL COMMENT '작가 고유 ID',
  `product_name` varchar(100) NOT NULL COMMENT '도서 이름',
  `product_image` varchar(300) DEFAULT NULL COMMENT '도서 이미지',
  `description` text COMMENT '도서 설명',
  `product_price` int NOT NULL COMMENT '도서 가격',
  `stock` int DEFAULT NULL COMMENT '도서 재고',
  `create_dt` datetime NOT NULL COMMENT '도서상품 등록일',
  `publication_date` date DEFAULT NULL COMMENT '도서상품 발매일',
  `total_pages` int DEFAULT NULL COMMENT '전체 페이지 수',
  `sales_yn` char(1) NOT NULL DEFAULT 'Y' COMMENT '판매 가능 여부 (Y/N)',
  PRIMARY KEY (`product_id`),
  KEY `fk_product_user` (`user_id`),
  KEY `fk_product_genre` (`genre_id`),
  KEY `fk_product_publisher` (`publisher_id`),
  KEY `fk_product_author` (`author_id`),
  CONSTRAINT `fk_product_author` FOREIGN KEY (`author_id`) REFERENCES `tbl_author` (`author_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_product_genre` FOREIGN KEY (`genre_id`) REFERENCES `tbl_genre` (`genre_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_product_publisher` FOREIGN KEY (`publisher_id`) REFERENCES `tbl_publisher` (`publisher_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_product_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='상품(도서) 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product`
--

LOCK TABLES `tbl_product` WRITE;
/*!40000 ALTER TABLE `tbl_product` DISABLE KEYS */;
INSERT INTO `tbl_product` VALUES (1,1,1,1,1,'살인자의 기억법','https://i.ibb.co/F4Rd57HK/murderer-memory.jpg','김영하 작가의 소설로, 기억을 잃은 살인자의 이야기.',100,48,'2025-03-26 00:07:21','2013-08-30',288,'Y'),(2,1,2,2,2,'채식주의자','https://i.ibb.co/Kjmk2DWz/vegetarian.jpg','한강 작가의 소설로, 채식주의를 선택한 여성의 삶을 그린 작품.',110,56,'2025-03-26 00:07:21','2007-10-20',176,'Y'),(3,1,3,3,3,'태백산맥','https://i.ibb.co/jSPJCsL/taebaek-mountains.jpg','조정래 작가의 대하소설로, 한국 현대사를 배경으로 한 작품.',120,29,'2025-03-26 00:07:21','1989-01-01',1500,'Y'),(4,1,1,4,4,'우리들의 행복한 시간','https://i.ibb.co/HLvyMkN1/happy-time.jpg','공지영 작가의 소설로, 사형수와 여성의 특별한 만남.',1000,34,'2025-03-26 00:07:21','2005-08-25',320,'Y'),(5,1,2,5,5,'칼의 노래','https://i.ibb.co/1YtFVLR8/song-of-sword.jpg','김훈 작가의 소설로, 이순신 장군의 삶을 그린 역사 소설.',16000,16,'2025-03-26 00:07:21','2001-05-10',400,'Y'),(6,1,2,2,2,'아몬드','https://i.ibb.co/n8gZ1nWn/almond.jpg','손원평 작가의 소설로, 감정을 느끼지 못하는 소년의 성장 이야기.',14000,75,'2025-03-26 00:07:21','2017-03-31',280,'N'),(7,1,2,5,5,'피프티 피플','https://i.ibb.co/FkR5YSh3/fifty-people.jpg','정세랑 작가의 소설로, 50명의 인물을 통해 본 인간 군상.',15000,54,'2025-03-26 00:07:21','2016-05-20',400,'Y'),(8,2,3,6,6,'타워','https://i.ibb.co/tPQ7MzCw/tower.jpg','배명훈 작가의 SF 소설로, 초고층 빌딩에서 벌어지는 이야기.',16000,50,'2025-03-26 00:07:21','2009-07-15',480,'Y'),(9,1,1,7,7,'죽고 싶지만 떡볶이는 먹고 싶어','https://i.ibb.co/Cp33mfQ8/tteokbokki.jpg','백세희 작가의 에세이로, 삶의 고민과 위로를 담은 책.',11000,119,'2025-03-26 00:07:21','2018-06-22',240,'N'),(10,1,2,8,8,'완전한 행복','https://i.ibb.co/rG3gghxz/perfect-happiness.jpg','정유정 작가의 소설로, 가족의 비밀을 파헤치는 이야기.',14500,85,'2025-03-26 00:07:21','2020-09-10',360,'Y'),(11,1,3,9,9,'파과','https://i.ibb.co/pvMLH4Vx/pagwa.jpg','구병모 작가의 소설로, 인간의 욕망과 파괴를 그린 작품.',15500,75,'2025-03-26 00:07:21','2016-11-25',300,'Y'),(12,2,1,10,10,'작별하지 않는다','https://i.ibb.co/NHJQDMr/no-goodbye.jpg','한강 작가의 소설로, 사랑과 이별을 담은 이야기.',12500,95,'2025-03-26 00:07:21','2021-07-30',200,'N'),(13,1,2,1,2,'불편한 편의점','https://i.ibb.co/hRrFrc8b/inconvenient-store.jpg','김호연 작가의 소설로, 편의점에서 벌어지는 따뜻한 이야기.',14000,107,'2025-03-26 00:07:21','2021-04-12',280,'Y'),(14,1,3,2,3,'달러구트 꿈 백화점','https://i.ibb.co/8g0YqZcz/dream-store.jpg','이미예 작가의 소설로, 꿈을 파는 백화점의 판타지 이야기.',15000,65,'2025-03-26 00:07:21','2020-07-08',320,'Y'),(15,1,1,3,4,'미드나잇 라이브러리','https://i.ibb.co/VWk638b7/midnight-library.jpg','매트 헤이그 작가의 소설로, 인생의 선택을 다룬 이야기.',16000,47,'2025-03-26 00:07:21','2020-09-29',288,'Y'),(18,1,1,6,7,'데미안','https://i.ibb.co/ymHfsdbg/demian.jpg','헤르만 헤세의 성장 소설.',11000,85,'2025-03-26 00:07:21','1919-01-01',176,'Y'),(19,2,2,7,8,'노르웨이의 숲','https://i.ibb.co/3973rS12/norwegian-wood.jpg','무라카미 하루키의 사랑과 상실의 이야기.',13000,73,'2025-03-26 00:07:21','1987-09-04',400,'Y'),(20,1,3,8,9,'백년 동안의 고독','https://i.ibb.co/C5hDJx0N/one-hundred-years.jpg','가브리엘 가르시아 마르케스의 마술적 리얼리즘 소설.',14000,65,'2025-03-26 00:07:21','1967-05-30',448,'Y'),(21,1,1,9,10,'파우스트','https://i.ibb.co/20H3fRPc/faust.jpg','요한 볼프강 폰 괴테의 희곡.',12000,95,'2025-03-26 00:07:21','1808-01-01',320,'Y'),(22,1,3,1,2,'오만과 편견','https://i.ibb.co/XkLfgMrg/pride-prejudice.jpg','제인 오스틴의 로맨스 소설.',11500,90,'2025-03-26 00:07:21','1813-01-28',279,'N'),(23,2,1,2,3,'위대한 개츠비','https://i.ibb.co/zVCJCtXQ/great-gatsby.jpg','F. 스콧 피츠제럴드의 미국 꿈을 다룬 소설.',12500,80,'2025-03-26 00:07:21','1925-04-10',180,'N'),(24,1,2,3,4,'1984','https://i.ibb.co/9ktdy3zB/1984.jpg','조지 오웰의 디스토피아 소설.',13000,69,'2025-03-26 00:07:21','1949-06-08',328,'Y'),(25,1,1,5,6,'동물농장','https://i.ibb.co/twCCR8VG/animal-farm.jpg','조지 오웰의 풍자 소설.',10000,103,'2025-03-26 00:07:21','1945-08-17',112,'N'),(76,NULL,9,20,22,'국가는 어떻게 무너지는가','https://i.ibb.co/nN6rxFGN/56d04971-ca08-415a-b9cd-d47332af72b6.jpg','<p><img src=\"http://localhost:8080/image/2025/03/27/a862cc71-f60c-4c9b-9336-f332fbb0f8c5.jpg\"></p>',23000,298,'2025-03-27 00:00:00','2025-03-24',424,'Y'),(78,NULL,2,3,24,'내가 나라서 정말 좋아','https://i.ibb.co/WNMd7Qbs/8efe7490-29a1-4541-89ca-186dfe3d9a73.jpg','<p><br></p><p>누적 조회 5,800만, 부모들을 감동시킨 화제의 릴스!</p><p>24만 독자의 요청 쇄도, 마침내 종이책 출간</p><p><br></p><p>초등 교사 김지훤의 ‘단단한 마음을 만드는 다정한 말’</p><p><br></p><p>“우리 아이도 이런 선생님을 만나면 참 행복하겠구나 싶어요.” “이 말을 어렸을 때 들었더라면 내 삶이 달라졌을 것 같아요.” “아이에게도 어른에게도 꼭 필요한 이야기!” 아침 조회 시간에 반 아이들에게 들려준 김지훤 선생님의 이야기는 단숨에 조회 수 500만 뷰를 돌파하며 수많은 부모와 교사들 사이에 화제를 모았습니다. 어른의 마음까지 안아주는 따뜻한 이야기에 독자들의 출간 요청이 빗발쳤고, 그 감동의 순간을 아이와 함께 나눌 수 있도록 포근한 일러스트를 더해 그림책으로 엮었습니다. 저자는 스스로에게 해 준 따뜻하고 다정한 말들이 쌓여 지금의 단단한 어른으로 성장할 수 있었다고 말하며, 이 책을 읽는 어린이들이 나를 먼저 아끼고 사랑하는 연습을 해 보길, 더 나아가 다정한 마음을 나눌 줄 아는 멋진 어른으로 자라길 응원하는 마음으로 책을 썼습니다. 기쁘거나 슬플 때, 속상하고 짜증 날 때 등 삶의 순간마다 아이들 스스로가 자기감정을 위로하고 현명하게 표현하며 삶을 건강하게 꾸려 나가길 바랍니다.</p><p><br></p><p>“삶의 모든 순간마다 나에게 꼭 필요한 말이 있어요.”</p><p><br></p><p><br></p>',15120,99,'2025-03-27 00:00:00','2025-01-15',104,'Y'),(79,NULL,1,23,25,'나의 아저씨 세트','https://i.ibb.co/Q362s823/46feacb6-66df-43d2-b93d-5f7d09adec8d.jpg','<p><br></p><p>인생 드라마, 인생 책으로 돌아오다!</p><p>백상예술대상 작품상, 극본상 수상작</p><p>한국방송작가상 드라마 부문 수상작</p><p>파울로 코엘료, 류이치 사카모토 등 세계적인 거장들의 극찬!</p><p>종영 후에도 3년 연속 넷플릭스 드라마 TOP 10</p><p><br></p><p>수많은 사람의 인생드라마가 또다시 누군가의 인생책이 되다</p><p>인간의 외로움을 가장 담담하고 묵직하게 어루만지는 이야기</p><p><br></p><p>『나의 아저씨』의 무삭제 대본이 작품집으로 출간되었다. 종영 후 현재까지도 끊임없이 회자되며 누군가의 인생에 크고 작은 의미들을 남긴 이 드라마는 영상뿐 아니라 대본 역시 견고히 세워진 건물처럼 내력의 단단함을 글로써 증명하고 있다. 이야기 속 공기마저 살아 있는 것처럼 세밀히 쓰인 지문과 대사는 이 대본이 인간의 삶과 가장 가깝고도 자연스러운 것들을 모아 얼마나 좋은 글을 쌓아 올렸는지 여실히 보여준다. 드라마 대본은 소설처럼 인물의 속내를 다 묘사할 수 없고, 오로지 영상으로 표현 가능한 대사와 행동 등으로만 담아내야 하는 글이다. 그런데도 『나의 아저씨』 대본은 말수 없는 주인공들의 마음을 소설처럼, 영상처럼 오롯이 헤아릴 수 있을 만큼 깊게 쓰여 있다. 문학 작품을 즐겨 읽는 독자에게도 도움이 될 것이다.</p><p><br></p>',49500,1000,'2025-03-27 00:00:00','2022-03-15',808,'Y'),(80,NULL,10,3,26,'파이썬 코딩의 기술','https://i.ibb.co/xKMNz5yb/198bb063-6198-4ad5-8856-277d67731396.png','<p><br></p><p>아마존 파이썬 프로그래밍 분야 베스트셀러, [Effective Python] 전면 개정 증보판!</p><p>파이썬의 매력과 강점을 이용해 강력하고 우수한 성능의 코드를 작성하는 90가지 방법!</p><p><br></p><p>파이썬다운 방식으로 프로그램을 작성하는 방법, 파이썬을 사용하는 가장 좋은 방법에 대한 통찰을 담았다! 2판에서는 파이썬 3.8까지 이르는 파이썬 3에만 초점을 맞췄으며, 1판의 모든 내용을 검토하고 대부분의 내용을 수정하고 갱신했다. 또한, 파이썬 3의 새로운 기능에 대한 내용을 충분히 보강했다. 책 속에 담긴 90가지 Better way를 통해 무엇을 하고 무엇을 하지 말아야 할지, 이 방법이 왜 최선인지 자신의 코드를 향상시킬 수 있는 방법을 습득하자!</p><p><br></p>',28800,50,'2025-03-27 00:00:00','2020-10-30',640,'Y'),(81,NULL,10,24,27,'자바의 정석','https://i.ibb.co/sJskchZR/c5c7fa6a-e79a-4cac-9609-112afbad98a0.jpg','<p><br></p><p>교육현장에서 뒤쳐지는 학생들을 위해 쓰고, 학생들에게 직접 검증받고 호평받은 책. 코딩을 처음 배우는 사람도 자바를 쉽게 배울수 있게 도와준다.</p><p><br></p><p><br></p>',22500,50,'2025-03-27 00:00:00','2019-12-31',700,'Y'),(82,NULL,3,25,28,'세계사를 바꾼 12가지 물질','https://i.ibb.co/WWMWG4Y9/f0b67b14-3844-4175-9f94-0163be853079.jpg','<p><br></p><p>물질은 어떻게 인류의 역사를 움직였을까?</p><p>식량, 질병, 기계, 인프라, 에너지, 인공지능이 교차하는 흥미로운 역사 탐험!</p><p><br></p><p>11세기 중국에서 발명돼 유럽의 대항해 시대를 열어준 나침반, 푸른곰팡이에서 우연히 발견돼 수많은 생명을 구한 항생 물질, 일회용품의 상징에서 건축의 미래를 바꿀 물질로 활약 중인 플라스틱까지. 인류와 함께해 온 물질의 과거, 현재, 미래를 보면 수천 년의 역사가 한눈에 보인다! 《세계사를 바꾼 12가지 물질》은 시대에 맞춰 카멜레온처럼 변하고 진화하며 우리 삶을 발전시킨 12가지 물질의 좌충우돌 변천사를 들려준다.</p><p><br></p><p>저자 사이토 가쓰히로는 일본의 기초과학 명문대학인 도호쿠대학교에 진학한 후 50년간 화학 분야를 연구해 왔다. 세상의 모든 것은 화학 물질과 관련되어 있다는 생각으로 전분, 약, 금속, 세라믹, 독, 원자핵 등 인류의 역사를 바꾼 대표 물질 12가지를 선정해 새로운 관점으로 흥미진진하게 소개한다.</p><p><br></p><p>인간이 전분으로 생명을 이어온 과정, 약의 발명으로 질병에서 해방된 역사, 금속이 기계 문명을 탄생시킨 혁명적 사건은 물론 현대 사회를 지탱하는 플라스틱, 미래 에너지원이 될 원자핵, 인공지능 시대를 견인할 자석 등 물질의 미래 가능성까지 해박한 지식으로 역사와 과학을 긴밀하게 연결해 이야기를 펼쳐낸다. 각 물질들이 어떻게 발견됐고 현대 사회에서 어떻게 활용되고 있는지, 인류의 진보에 얼마나 공헌했는지, 역사와 물질의 관련성에 초점을 맞춰 설명해 기초 지식이 없는 사람도 재미있게 읽을 수 있다.</p><p><br></p><p><br></p>',15750,101,'2025-03-27 00:00:00','2025-03-27',260,'N'),(83,NULL,3,26,29,'경복궁 환상 여행','https://i.ibb.co/9m45BWK1/c7c04a10-0ae9-4de3-92cf-c41128ff0d34.jpg','<p><br></p><p>궁궐에 갔을 때 처마 위의 잡상을 보고 \'저게 대체 뭐지?\' 하고 생각한 적이 있을 것이다. 더 나아가, \"저게 어처구니란 건데, 서유기에 나오는 삼장법사와 손오공, 저팔계가 있어\"라고 아는 척해본 사람 정도는 있을 것이다. 그런데 아는가? 사실 경복궁에는 광화문의 해치와 근정전의 28수 별자리 동물을 포함해 100여 마리의 동물이 숨어 있다는 사실을! 이 동물들은 기거하는 장소(방위, 건물 용도, 거주자)에 따라 각기 다른 유래와 세계관을 품고 별스러운 표정과 포즈를 하고 있다.</p><p><br></p><p>예컨대, 광화문을 들어가면 맞닥뜨리는 영제교 밑에는 혓바닥을 날름 내밀고 있는 \'천록\'이 있다. 천록은 상상 속의 동물로, 온몸이 비늘로 뒤덮이고 뿔이 난 노루 모양의 신수인데, 이익의 《성호사설》에서는 천록을 \'뿔 끝에서 오색 광채가 나며 하루에 1만 8000리나 달린다\'고 설명한다. 천록은 외부의 침입과 흉한 기운을 막는 \'벽사\'의 의미로, 보통 문 앞이나 다리 위, 무덤 입구에 두곤 했다. 경복궁 영제교의 천록은 다리와 물길을 건너오는 액운으로부터 궁과 왕을 지키기 위해 놓인 것이다.</p><p><br></p><p>이 책은 다른 궁궐 가이드서와 달리 궐내 전각의 모양이나 내력을 살피지 않는다. 경복궁의 남문 광화문에서 북문 신무문으로 향하면서 다리 밑, 처마 끝, 월대 가장자리, 천장 깊숙한 곳, 굴뚝 밑 돌담까지, 남들이 들여다보지 않는 구석구석을 톺아보며 73마리의 동물을 좇는다. 동물이라는 새로운 키워드로 궁궐을 돌아볼 때, 무심코 지나쳤던 과거의 유물이 생생하게 움직이는 환상적인 체험을 선사한다.</p><p><br></p><p>특히 각 동물 캐릭터의 상세한 표정과 포즈를 구현한 일러스트 덕분에 당시의 철학, 이상세계, 아름다움을 \'시각적\'으로 경험할 수 있다. 우리가 흔히 아는 해치, 봉황, 용, 현무뿐 아니라 불가사리, 귀면, 산예, 공복, 달두꺼비까지, 다양한 동물이 각자의 사연을 품고 어디를 지키고 있는지, 경복궁이 오늘날까지 살아남기를 바라며 과거의 사람들이 어떤 메시지를 남겼는지 찾아가는 새로운 궁궐 역사 가이드서다.</p><p><br></p><p><br></p><p><br></p>',16200,101,'2025-03-27 00:00:00','2025-03-12',220,'Y'),(84,NULL,3,27,30,'새로 쓴 아틀라스 세계사','https://i.ibb.co/8LR35NgR/f90df6cc-727c-49f2-a2a3-9ae3179fb089.jpg','<p><br></p><p>“지도로 역사를 읽으면 세상이 다르게 보인다”</p><p>누적 판매 30만 부 스테디셀러 [아틀라스 역사 시리즈]의 최신 결정판 출간</p><p><br></p><p>지난 25년 동안 국내 역사학계 최고의 학자들이 최신 연구 성과를 집대성하여 지도와 연표, 사진과 설명을 하나로 아우른 [아틀라스 역사 시리즈]의 최신 결정판, 『새로 쓴 아틀라스 세계사』가 완성됐다.</p><p><br></p><p>2004년 처음 출간된 이 시리즈의 시발점인 구판 『아틀라스 세계사』는 1978년 타임스북스가 펴내기 시작한 『타임스 세계사The Times History of the World』의 축쇄판 The Times Complete History of the World의 2001년 개정 7판을 번역한 책이다. 이후 사계절출판사는 이를 바탕으로 삼아 국내 학자를 모으고 편집자, 역사지도 제작자, 아틀라스 역사책 디자이너 등 제작팀을 개발하여 『아틀라스 한국사』(초판 2004, 전면개정판 2022), 『아틀라스 중국사』(초판 2007, 개정증보판 2015), 『아틀라스 일본사』(2011), 『아틀라스 중앙유라시아사』(2016)를 순서대로 출간했다. 그리고 20여 년 만에 그동안 축적한 아틀라스 역사책 집필·편집·제작 기술을 총망라해 오리지널 한국어판 『새로 쓴 아틀라스 세계사』를 내놓는다.</p><p><br></p><p>그 어떤 책보다, 어느 유튜브 교양 채널보다 더 깔끔하고 치밀하게, 그리고 입체적으로 역사를 보여주고 들려주는 이 책을 통해 과거의 시간과 공간이 지도 안에서 되살아나는 장면을 확인하자.</p><p><br></p><p><br></p>',32400,101,'2025-03-27 00:00:00','2025-03-07',272,'Y'),(85,NULL,5,3,31,'정관스님 나의 음식','https://i.ibb.co/MxMPx6VS/669f8316-ea0d-42e9-b744-937dd308aa3b.jpg','<p><br></p><p>“즐겁게 드시라, 걱정도 미움도 본래는 없다.”</p><p><br></p><p>세계에서 가장 유명한 사찰음식 명장</p><p>넷플릭스 다큐멘터리 〈셰프의 테이블〉 화제의 주인공</p><p>정관스님의 삶과 사계절 레시피를 담은 특별한 에세이</p><p><br></p><p>세계에서 가장 유명한 사찰요리의 대가. 정관스님의 첫 번째 에세이가 출간된다. 정관스님이 들려주는 한 그릇 음식에 담긴 지혜와 한땀 한땀 정성스레 정리한 사계절 레시피 58개를 아름다운 사진과 함께 담아냈다. 열일곱 살에 출가하여 스님이 된 이래로 사찰음식을 만들고 연구해온 스님의 정수가 고스란히 담겼다.</p><p><br></p><p>정관스님은 넷플릭스 최고의 화제작 〈셰프의 테이블〉에 출연하며 세계적으로 널리 알려졌다. 이제는 매해 세계 각지의 방문객과 미쉐린 스타 셰프들이 스님의 음식을 맛보고, 배우기 위해 천진암을 찾는다. 이토록 많은 이가 스님의 요리에 열광하는 이유가 무엇일까?</p><p><br></p><p>스님의 음식은 맛만을 추구하는 음식과도, 일반적인 채식과도 다르다. 스님은 사찰음식이 몸과 마음을 건강하게 하고, 고요와 평정을 찾도록 고안된 지혜의 음식이라고 말한다. 그래서일까. 《뉴욕 타임스》는 스님의 요리를 “몸과 마음을 맑히는 세상에서 가장 진귀한 음식”이라 찬사를 보냈다.</p><p><br></p><p>이 책은 정관스님의 레시피를 최초로 공개한다는 점에서 더욱 특별하다. 정관 스님은 더 많은 사람이 자기 부엌에서 스스로 돌보는 요리를 할 수 있도록, 이 책을 위해 처음으로 레시피를 집필했다. 스님의 시그니처 음식 표고버섯 조청 조림부터 여름 토마토장아찌, 가을 우엉 고추장 양념구이, 스님이 자기 음식의 비결로 꼽는 각종 양념장과 청 담그는 방법까지. 자연의 기쁨을 온몸으로 느끼며 각 계절에 가장 영양가가 풍부한 채소를 알고, 식재료 고유의 맛과 풍미를 살리며 몸과 마음에 생기를 불어넣는 법을 배울 수 있다. 스님의 음식은 쉽게 구할 수 있는 재료로 누구나 따라 할 수 있다.</p><p><br></p><p>스님에 따르면 요리도 수행이다. 순간에 집중하며 재료 하나하나에 정성을 다하고, 허영을 없애고, 자꾸만 더하는 게 아니라 덜어내는 일. 스님 말씀처럼 “이렇게 만든 요리는 생에 큰 힘이 된다.” 어쩌면 스님이 우리에게 가르쳐주는 것은 레시피가 아니라 내 삶을 정갈하게 돌보는 일일 것이다.</p><p><br></p>',22320,101,'2025-03-27 00:00:00','2025-03-27',416,'N'),(86,NULL,5,2,32,'장','https://i.ibb.co/x8wJNMmP/11a12f2a-e64d-4381-8ae1-bee5519fa3bf.jpg','<p><br></p><p>밍글스의 강민구 셰프가 알려 주는 장의 모든 것</p><p>『뉴욕타임스』 선정 2024 최고의 쿡북, 번역 출간</p><p><br></p><p>“이 책은 장에게 보내는 나의 러브레터다.”</p><p><br></p><p>한식 파인다이닝 ‘밍글스’의 오너 셰프 강민구가 한식의 핵심인 ‘장’에 대한 깊은 애정을 가득 담아 이 책을 펴냈다. 4년여에 걸친 기획과 촬영, 편집을 거쳐 2024년 봄, 미국 아티장 출판사에서 출간된 《JANG: The Soul of Korean Cooking》은 많은 화제를 불러일으키며 『뉴욕타임스』의 2024년 최고의 쿡북으로 선정되었다. 장에 대한 신뢰, 장의 역사와 장의 명인을 향한 존중을 담은 이 책은 한국의 전통 발효 양념인 간장, 된장, 고추장의 전통에 현대적인 해석으로 한식의 새로운 가능성을 탐구하고자 한 그의 열정을 보여준다.</p><p><br></p><p>뛰어난 셰프이자 탁월한 스토리텔러 강민구</p><p>그의 요리 철학을 담은 레시피</p><p><br></p><p>대두(콩), 물, 소금만을 사용해 전통적인 방법으로 자연에서 발효시켜 만든 양념장인 간장, 된장, 고추장은 한식의 깊이를 더하는 핵심 요소다. 매일 먹는 국과 찌개, 각종 반찬은 물론, 특별한 날 먹기 좋은 일품요리와 심지어 디저트에도 예상치 못한 풍미를 선사한다. 전통 한식에 서양 요리를 더해 장의 새로운 가능성과 한국 요리의 확장성을 탐구해 온 강민구 셰프는 이 책에서 일상에서도 파인다이닝을 경험할 수 있는 60여 개의 레시피를 소개한다. 아울러 전통을 지키며 장을 빚어내는 명인들의 이야기, 장의 역사와 제조 과정 등을 들려주며 장에 대한 이해를 돕는다.</p><p><br></p>',27000,101,'2025-03-27 00:00:00','2025-03-10',216,'N'),(87,NULL,4,13,33,'에이든 국내여행 가이드북','https://i.ibb.co/wNjcCss9/a9b7d122-7b6b-4a1a-8434-8b91064dd7d6.jpg','<p><br></p><p>『에이든 국내여행 가이드북』의 개정증보2판. 예스24 올해의 책 100위 안에도 올랐던 그 책이 524페이지에서 340페이지가 증가한 864페이지로 40% 정도가 증가한 분량으로 국내 전체 여행지를 제대로 다루고 있다. 타블라라사 출판사는 여행가이드북 출판사이면서 여행지도 제작사이기도 하다. 그래서 국내 곳곳의 여행지도 60개를 삽입해 두었다. 지도를 보면 꼼꼼하고 자세하게 여행지 설명부터 맛집, 카페 등지를 올려두었다. 한번 보면 깜짝 놀랄 정도로 컨텐츠를 담아두었다. 여행지도를 직접 제작 출간하는 타블라라사 이기에 가능한 부분이다.</p><p><br></p><p>중구난방 출판되는 여행 도서 속에서 여행 가이드북은 여행자의 든든한 조언자 역할을 해야 한다. 인터넷에서 웬만한 정보는 다 찾을 수 있음에도 불구하고 책을 구입하는 이유는 요약된 정보가 시간을 절약해 주기 때문이다. 정확한 정보를 찾아 알맞게 요점을 정리해 놓은 가이드북은 여행자들의 소중한 시간을 절약해 줄 것이다.</p><p><br></p>',23850,101,'2025-03-27 00:00:00','2023-12-06',864,'Y'),(88,NULL,4,8,11,'리얼 제주','https://i.ibb.co/gZM5Qg4N/5a32b006-13ff-462f-8418-1148e431c69d.jpg','<p><br></p><p>최신 정보로 돌아온 제주 베스트셀러</p><p>『리얼 제주』 2025년 최신 개정판 출간</p><p><br></p><p>제주 여행 베스트셀러 자리를 굳건히 지켜왔던 『리얼 제주』가 2025년 최신 개정판으로 돌아왔다. 국내 여행지 중 가장 이국적인 분위기를 풍기는 제주는 코로나 시대만큼은 아니지만, 여전히 국내 여행의 스테디셀러다. ’제주에 한 번도 안 간 사람은 있지만, 한 번만 간 사람은 없다‘는 말처럼 수많은 여행자가 반복해서 떠난다. 이처럼 N 회차 여행자의 니즈에 맞게 제주에 거주하고 있는 두 베테랑 여행 전문가 저자가 현지에서 지금의 제주를 반영해 개정 작업을 했다. 모든 스폿은 오랜 시간을 들여 전수 조사하고 바뀐 정보를 꼼꼼하게 반영했다. 여기에 전보다 좀 더 나은 곳이 있다면 교체하기도 하고, 남녀노소 누구나 가도 만족할 만한 스폿을 추가했다. 이제는 반복해서 가는 스테디한 여행지 제주, 『리얼 제주』와 함께 떠나고 싶을 때 떠나보자.</p><p><br></p>',18000,50,'2025-03-27 00:00:00','2025-02-28',352,'Y'),(89,NULL,6,6,11,'별에게','https://i.ibb.co/PvWRS7Gc/c01d9cd8-a8d0-467a-9d17-b931f41b8b67.jpg','<p><br></p><p>“네가 와서 집이 참 환해졌지. 우리한테 와 줘서 고마워.”</p><p>내 곁을 밝혀 준 소중한 존재에게</p><p><br></p><p>독보적인 상상력과 따뜻한 감성으로 사랑받아 온 안녕달 작가의 창작 10주년을 빛내는 그림책 『별에게』가 출간되었다. 첫 창작 그림책 『수박 수영장』 이후, 아이들이 마음껏 놀고 기대어 쉴 수 있는 세계를 그리며 독자의 신뢰를 쌓아 온 작가가 선보이는 열두 번째 작품이다.</p><p><br></p><p>하굣길, 아이는 학교 앞에서 작은 ‘별’을 가져온 할머니를 만난다. 별을 조심스레 집으로 데려온 아이는 “달빛을 받아야 잘 자란다”라는 엄마의 말에 따라 매일 밤 별을 데리고 산책을 하며 정성껏 돌본다. 별은 아이가 성장해 독립한 후에도 귤을 따고 낚시를 하는 엄마의 곁을 든든하게 지킨다. 그사이 별은 점점 커지고, 마침내 떠올라 하늘을 향할 준비를 한다.</p><p><br></p><p>예전 학교 앞에서 팔리던 병아리를 떠올리게 하는 ‘별’은, 우리가 그리워하는 모든 것을 상징하는 이름이다. 작가는 모녀와 별이 함께한 시간을 정성스럽게 그리면서 서로를 소중히 여기고 보살피는 마음이 어떻게 깊어지는지를 섬세하게 보여 준다.</p><p><br></p><p>이야기 속 바닷가 마을의 풍경도 생생하게 펼쳐진다. 하늘에서 바다로 떨어진 별을 건져 올리는 해녀, 신선한 해산물을 사는 주민들, 뛰노는 강아지와 어린이까지 부드러운 색연필로 그려진 바닷가 마을의 사계절 속에서 별빛과 밤바다가 어우러진 서정적인 화면이 따뜻한 설렘을 전한다.</p><p><br></p>',15120,50,'2025-03-27 00:00:00','2025-03-25',64,'Y'),(90,NULL,6,6,11,'네 꿈을 응원해, 권투 장갑!','https://i.ibb.co/qYJMJKr5/c1a78124-9ea7-47f6-9411-eb52c0fcb554.jpg','<p><br></p><p>모두 다르고 모두 특별한 우리 아이들 이야기</p><p>유설화 작가의 〈장갑 초등학교〉 시리즈 신작!</p><p>“무엇이든 될 수 있는 너희들의 꿈을 응원해!”</p><p><br></p><p>장갑 초등학교 아이들이 만들기 숙제를 발표하는 시간이다. 발명가를 꿈꾸는 목장갑이 타임머신을 만들었다며 자랑하는데, 갑자기 천둥번개가 치더니 전기가 나가 버린다. 선생님이 무슨 일인지 알아보러 나간 사이에, 말썽꾸러기 쌍둥이 장갑이 그새를 못 참고 타임머신 단추를 꾹 누른다. 그 순간 교실 벽에 커다란 구멍이 생기더니 아이들을 빨아들인다. 목장갑의 타임머신이 진짜로 작동을 한 것이다. 빙글빙글 시간의 터널을 지나 아이들이 도착한 곳은 미래! 아이들은 어른이 된 자신을 찾아 꿈을 이루었는지 알아보기 시작하는데… 어른이 된 권투장갑이 어디에도 보이지 않는다! 권투 장갑은 아이들이 생각한 것처럼 복싱 세계 챔피언이 되었을까? 혹시 남몰래 다른 꿈을 꾸고 있었던 것은 아닐까? 초등 교과서 수록 도서 유설화 작가의 〈장갑 초등학교〉 시리즈 여섯 번째 이야기.</p><p><br></p>',13500,50,'2025-03-27 00:00:00','2025-03-27',48,'Y'),(91,NULL,8,9,34,'블랙홀','https://i.ibb.co/JjhFzyXm/3ac8bac3-2070-42b3-91ba-557562d9acb3.jpg','<p><br></p><p>칼 세이건을 잇는 우리 시대의 물리학자</p><p>브라이언 콕스의 블랙홀 연구 결정판!</p><p>“블랙홀의 아름다움을 느낄 수 있는 책.” 물리학자 김범준 추천</p><p><br></p><p>‘블랙홀’은 누구나 알지만 아무도 모르는 존재다. “블랙홀을 알기 위해서는 물리의 거의 모든 내용을 알아야 한다”고 할 만큼, 블랙홀은 물리학, 천문학 등을 공부할 때 절대 빼놓을 수 없고, 블랙홀을 통하지 않고서는 우주에 진입할 수 없다. BBC 과학 다큐멘터리 〈경이로운 우주〉 〈경이로운 생명〉 등에 출연하면서 유명해진 브라이언 콕스는 과학의 신비를 대중에게 알리는 데 중요한 역할을 하며 “차세대 칼 세이건”이라는 명성을 얻은 물리학자다. 같은 대학에서 입자물리학을 가르치는 제프 포셔와 함께 연구를 진행하며 그간 『퀀텀 유니버스』 『E=mc2 이야기』 등 몇 권의 베스트셀러를 출간했다. 두 물리학자의 연구가 이번에는 블랙홀을 향한다.</p><p><br></p><p>제목에서 알 수 있듯 이 책의 주제는 블랙홀이다. 블랙홀의 정체를 밝히기 위해 고군분투했던 과학자들의 수많은 논쟁과 연구로 책의 서막이 열린다. 호기심에서 시작된 연구는 블랙홀에서 우주의 기원과 시공간의 근본적 특성까지 유추하는 수준에 도달했다. 양자역학, 사건지평선, 일반상대성이론, 특이점, 호킹 복사, 커 블랙홀, 슈바르츠실트 해, 펜로즈 다이어그램 등 블랙홀에 관심 있는 독자라면 한 번쯤 들어봤을 법한 내용으로 가득하다. 첫 페이지를 펼치는 순간 우리는 왜 블랙홀을 안다는 게 어려운 일인지 곧바로 깨닫는다. 블랙홀의 세계로 들어가기 위해서는 양자역학, 상대성이론, 열역학을 알아야 하는데 이는 곧 물리학의 거의 모든 내용을 알아야 한다는 뜻이기 때문이다. 아인슈타인에서 스티븐 호킹 그리고 오늘날 양자역학 연구에 이르기까지 한 세기에 걸친 물리학의 최전선을 향한 과학적 여정은 우리 우주가 거대한 양자 컴퓨터일 수도 있다는 놀라운 결론에 도달한다. 이 책은 결코 쉽지 않지만, 물리학자 김범준 교수의 말처럼, 저자의 친절한 안내에 따라 찬찬히 읽어나가다 보면, 블랙홀의 아름다움을 생생하게 느낄 수 있을 것이다.</p><p><br></p>',29700,101,'2025-03-27 00:00:00','2025-03-27',392,'Y');
/*!40000 ALTER TABLE `tbl_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_product_inq`
--

DROP TABLE IF EXISTS `tbl_product_inq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_product_inq` (
  `inquiry_id` int NOT NULL AUTO_INCREMENT COMMENT '상품 문의 아이디',
  `product_id` int NOT NULL COMMENT '상품 고유 아이디',
  `user_id` int DEFAULT NULL COMMENT '문의글 작성 회원 아이디',
  `inquiry_title` varchar(100) DEFAULT NULL COMMENT '문의 제목',
  `inquiry_content` varchar(800) DEFAULT NULL COMMENT '문의 내용',
  `inquiry_image` varchar(300) DEFAULT NULL COMMENT '문의에 포함된 이미지',
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '문의글 작성일',
  `modify_dt` datetime DEFAULT NULL COMMENT '문의글 수정일',
  `inquiry_reply_yn` char(1) DEFAULT 'N' COMMENT '문의글 답변 여부 (Y/N)',
  PRIMARY KEY (`inquiry_id`),
  KEY `fk_inq_product` (`product_id`),
  KEY `fk_inq_user` (`user_id`),
  CONSTRAINT `fk_inq_product` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_inq_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='상품 문의 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product_inq`
--

LOCK TABLES `tbl_product_inq` WRITE;
/*!40000 ALTER TABLE `tbl_product_inq` DISABLE KEYS */;
INSERT INTO `tbl_product_inq` VALUES (1,1,1,'배송 문의','언제 도착하나요?',NULL,'2025-03-26 00:07:22','2025-03-26 00:07:22','Y'),(2,2,2,'상품 상태 문의','새 상품인가요?',NULL,'2025-03-26 00:07:22','2025-03-26 00:07:22','Y'),(3,3,3,'교환 문의','색상 교환 가능한가요?',NULL,'2025-03-26 00:07:22','2025-03-26 00:07:22','Y'),(4,13,7,'jghj','<p>ghj</p>',NULL,'2025-03-26 19:20:01',NULL,'Y'),(7,1,7,'상품 문의','<p>상품 문의합니다.</p>',NULL,'2025-03-26 19:34:22',NULL,'Y'),(8,6,7,'상품 문의','<p>상품 배송 언제되나요?</p>',NULL,'2025-03-26 19:39:02',NULL,'Y'),(10,2,7,'상품 문의 합니다.','<p>상품 언제 도착하나요?</p>',NULL,'2025-03-26 21:47:24',NULL,'Y'),(11,76,5,'국가는 어떻게 무너지는가 문의','<p>상품 재밌나요?</p>',NULL,'2025-03-27 11:18:41',NULL,'N'),(12,78,5,'상품 도착 예정 시간','<p>상품 얼마나 걸리나요?</p>',NULL,'2025-03-27 11:59:47',NULL,'N'),(13,5,7,'문의합니다','<p>문의 내용</p>',NULL,'2025-03-27 12:23:56',NULL,'N'),(14,1,5,'상품 문의합니다.','<p>ㅇㅇ</p>',NULL,'2025-03-27 14:58:38',NULL,'N'),(15,84,1,'상품 문의','<p>문의</p>',NULL,'2025-03-27 15:53:06',NULL,'N');
/*!40000 ALTER TABLE `tbl_product_inq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_product_inq_reply`
--

DROP TABLE IF EXISTS `tbl_product_inq_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_product_inq_reply` (
  `inquiry_reply_id` int NOT NULL AUTO_INCREMENT COMMENT '상품문의 답변 아이디',
  `user_id` int DEFAULT NULL COMMENT '문의글 답변 작성자 회원 아이디',
  `inquiry_id` int NOT NULL COMMENT '상품 문의 아이디',
  `inquiry_reply_content` varchar(300) DEFAULT NULL COMMENT '상품 문의 답변 내용',
  `inquiry_reply_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '상품 문의 답변 일자',
  PRIMARY KEY (`inquiry_reply_id`),
  KEY `fk_inqreply_user` (`user_id`),
  KEY `fk_inqreply_inq` (`inquiry_id`),
  CONSTRAINT `fk_inqreply_inq` FOREIGN KEY (`inquiry_id`) REFERENCES `tbl_product_inq` (`inquiry_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_inqreply_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='상품 문의 답변 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product_inq_reply`
--

LOCK TABLES `tbl_product_inq_reply` WRITE;
/*!40000 ALTER TABLE `tbl_product_inq_reply` DISABLE KEYS */;
INSERT INTO `tbl_product_inq_reply` VALUES (1,1,1,'2일 내로 도착 예정입니다.','2025-03-26 00:07:22'),(2,1,2,'네, 새 상품입니다.','2025-03-26 00:07:22'),(3,3,3,'ddd','2025-03-26 00:07:22'),(4,3,4,'ddsad','2025-03-26 19:27:42'),(5,3,7,'ㅇㄴㅁㅇㄴㅇ\n','2025-03-26 19:37:32'),(6,3,8,'2일 내 도착 예정','2025-03-26 19:39:09'),(8,3,10,'이번주에는 힘듭니다.','2025-03-27 03:14:50');
/*!40000 ALTER TABLE `tbl_product_inq_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_publisher`
--

DROP TABLE IF EXISTS `tbl_publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_publisher` (
  `publisher_id` int NOT NULL AUTO_INCREMENT COMMENT '출판사 고유 ID',
  `publisher_name` varchar(20) NOT NULL COMMENT '출판사 이름',
  `website` varchar(255) DEFAULT NULL COMMENT '출판사 웹사이트 URL',
  PRIMARY KEY (`publisher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='출판사 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_publisher`
--

LOCK TABLES `tbl_publisher` WRITE;
/*!40000 ALTER TABLE `tbl_publisher` DISABLE KEYS */;
INSERT INTO `tbl_publisher` VALUES (1,'한빛미디어','https://www.hanbit.co.kr'),(2,'위키북스','https://www.wikibook.co.kr'),(3,'길벗','https://www.gilbut.co.kr'),(4,'민음사','https://www.minumsa.com'),(5,'문학동네','https://www.munhak.com'),(6,'창비','https://www.changbi.com'),(7,'웅진지식하우스','https://www.woongjin.com'),(8,'RHK','https://www.rhk.co.kr'),(9,'알에이치코리아','https://www.rhk.co.kr'),(10,'북하우스','https://www.bookhouse.co.kr'),(11,'흐름출판','https://www.flowpress.co.kr'),(12,'클','https://www.kl.kr'),(13,'열린책들','https://www.openbooks.co.kr'),(14,'작가정신',NULL),(17,'들녁',NULL),(19,'노블엔진 팝',NULL),(20,'생각의 힘',''),(21,'데이즈엔터(주)',NULL),(22,'모모',NULL),(23,'세계사','세계사'),(24,'도우출판','도우출판'),(25,'북라이프','북라이프'),(26,'위즈덤하우스','위즈덤하우스'),(27,'사계절','사계절'),(28,'김성율출판사','www.www.www'),(29,'출판사',NULL);
/*!40000 ALTER TABLE `tbl_publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_qna`
--

DROP TABLE IF EXISTS `tbl_qna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_qna` (
  `qna_id` int NOT NULL AUTO_INCREMENT COMMENT 'Q&A 아이디',
  `user_id` int NOT NULL COMMENT '작성자 (회원 아이디)',
  `qna_title` varchar(100) NOT NULL COMMENT 'Q&A 제목',
  `qna_content` text COMMENT 'Q&A 내용',
  `qna_create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Q&A 작성일자',
  `qna_update_dt` datetime DEFAULT NULL COMMENT 'Q&A 수정일자',
  `qna_reply_yn` char(1) DEFAULT 'N' COMMENT 'Q&A 답변 여부 (Y/N)',
  PRIMARY KEY (`qna_id`),
  KEY `fk_qna_user` (`user_id`),
  CONSTRAINT `fk_qna_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Q&A 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_qna`
--

LOCK TABLES `tbl_qna` WRITE;
/*!40000 ALTER TABLE `tbl_qna` DISABLE KEYS */;
INSERT INTO `tbl_qna` VALUES (1,1,'회원가입 문의','회원가입이 안 됩니다.','2025-03-26 00:07:23',NULL,'Y'),(2,2,'결제 문의','결제 오류가 발생했습니다.','2025-03-26 00:07:23',NULL,'Y'),(3,3,'배송 문의','배송지를 변경하고 싶습니다.','2025-03-26 00:07:23','2025-03-26 00:07:23','Y'),(4,4,'배송 문의','배송 언제 되나요?','2025-03-26 00:07:23',NULL,'Y'),(5,4,'제품 문의','찢어진 책이 왔습니다!!!','2025-03-26 00:07:23',NULL,'Y'),(6,2,'제품 문의','신간 도서 언제 들어오나요??','2025-03-26 00:07:23',NULL,'Y'),(7,7,'재고문의 드립니다.','<p>재고가 소진되면 더 이상 도서가 입고되지 않는건가요?</p>','2025-03-26 14:12:39','2025-03-27 10:53:15','N'),(17,19,'결제 취소 관련 문의','<p>결제를 취소하고싶습니다.</p><p>이미 완료된 결제는 어떻게 취소해야하나요??</p>','2025-03-27 10:54:35','2025-03-27 10:54:35','N'),(18,20,'중고상품 문의','<p>중고 상품의 도서 상태는 어떻게 확인할 수 있나요?</p>','2025-03-27 11:32:30','2025-03-27 11:32:30','N'),(19,21,'신간 입고 문의','<p>신간 도서는 언제 입고가 이루어지나요?</p><p>매일매일 들어오는건가요??</p><p>일우일에 한번씩 몰아서 들어오는건가요???</p>','2025-03-27 11:33:40','2025-03-27 11:33:40','N'),(20,20,'등록','<p>문의사항</p>','2025-03-27 16:18:35','2025-03-27 16:18:35','N');
/*!40000 ALTER TABLE `tbl_qna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_qna_reply`
--

DROP TABLE IF EXISTS `tbl_qna_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_qna_reply` (
  `qna_reply_id` int NOT NULL AUTO_INCREMENT COMMENT 'Q&A 답글 아이디',
  `user_id` int NOT NULL COMMENT '작성자 (회원 아이디)',
  `qna_id` int NOT NULL COMMENT 'Q&A 아이디',
  `qna_reply_contents` varchar(300) DEFAULT NULL COMMENT 'Q&A 답글 내용',
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Q&A 답글 작성일',
  PRIMARY KEY (`qna_reply_id`),
  KEY `fk_qna_reply_user` (`user_id`),
  KEY `fk_qnareply_qna` (`qna_id`),
  CONSTRAINT `fk_qna_reply_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_qnareply_qna` FOREIGN KEY (`qna_id`) REFERENCES `tbl_qna` (`qna_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Q&A 답글 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_qna_reply`
--

LOCK TABLES `tbl_qna_reply` WRITE;
/*!40000 ALTER TABLE `tbl_qna_reply` DISABLE KEYS */;
INSERT INTO `tbl_qna_reply` VALUES (1,3,1,'회원가입 문제 해결되었습니다.','2025-03-26 00:07:23'),(2,3,2,'결제 오류 해결 방법을 안내드립니다.','2025-03-26 00:07:23'),(3,3,3,'배송지 변경 방법을 안내드립니다.','2025-03-26 00:07:23'),(7,5,5,'죄송합니다.','2025-03-27 12:13:23'),(8,5,4,'금일 됩니다.','2025-03-27 14:48:39'),(9,1,6,'이번주에 들어옵니다.','2025-03-27 15:20:59');
/*!40000 ALTER TABLE `tbl_qna_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_review`
--

DROP TABLE IF EXISTS `tbl_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_review` (
  `review_id` int NOT NULL AUTO_INCREMENT COMMENT '후기 고유 ID',
  `user_id` int DEFAULT NULL COMMENT '후기 작성자',
  `product_id` int DEFAULT NULL COMMENT '상품 아이디',
  `order_item_id` int DEFAULT NULL COMMENT '주문 상세 항목 고유 ID',
  `review_rating` int DEFAULT NULL COMMENT '1~5점 평점',
  `review_comment` text COMMENT '후기 상세 내용',
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '후기 작성 날짜',
  PRIMARY KEY (`review_id`),
  KEY `fk_review_user` (`user_id`),
  KEY `fk_review_product` (`product_id`),
  KEY `fk_review_orderitem` (`order_item_id`),
  CONSTRAINT `fk_review_orderitem` FOREIGN KEY (`order_item_id`) REFERENCES `tbl_order_item` (`order_item_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_review_product` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`product_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_review_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='후기 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_review`
--

LOCK TABLES `tbl_review` WRITE;
/*!40000 ALTER TABLE `tbl_review` DISABLE KEYS */;
INSERT INTO `tbl_review` VALUES (1,1,1,1,5,'좋은 상품입니다.','2025-03-26 00:07:22'),(2,2,2,2,4,'만족스러워요.','2025-03-26 00:07:22'),(24,1,3,3,5,'ㅁㄴㅇㄹ','2025-03-26 21:38:43'),(37,NULL,NULL,NULL,NULL,NULL,'2025-03-26 23:24:15'),(38,NULL,NULL,NULL,NULL,NULL,'2025-03-26 23:27:10'),(39,NULL,NULL,NULL,NULL,NULL,'2025-03-26 23:31:33'),(45,1,NULL,NULL,5,'ㄴㅇㄹ','2025-03-26 23:53:44'),(78,1,13,23,5,'최고!','2025-03-27 11:35:09'),(98,5,15,32,5,'adsfadf','2025-03-27 13:03:56'),(103,1,76,24,5,'asdf','2025-03-27 13:16:48');
/*!40000 ALTER TABLE `tbl_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_search`
--

DROP TABLE IF EXISTS `tbl_search`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_search` (
  `search_id` int NOT NULL AUTO_INCREMENT COMMENT '검색어 아이디',
  `search` varchar(30) NOT NULL COMMENT '검색어',
  `user_id` int DEFAULT NULL COMMENT '회원 아이디',
  `search_count` int DEFAULT NULL COMMENT '검색 카운트',
  `search_dt` datetime DEFAULT NULL COMMENT '마지막 검색 일자',
  PRIMARY KEY (`search_id`),
  KEY `fk_search_user` (`user_id`),
  CONSTRAINT `fk_search_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='검색어 로그 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_search`
--

LOCK TABLES `tbl_search` WRITE;
/*!40000 ALTER TABLE `tbl_search` DISABLE KEYS */;
INSERT INTO `tbl_search` VALUES (1,'자바 프로그래밍',1,12,'2025-03-26 00:07:21'),(2,'파이썬 입문',2,5,'2025-03-26 00:07:21'),(3,'데이터베이스 설계',7,7,'2025-03-26 00:07:21'),(29,'살인자',7,2,'2025-03-27 15:31:29'),(30,'개발',5,3,'2025-03-27 15:40:17'),(31,'세계사',5,1,'2025-03-27 15:47:36'),(32,'문학',1,1,'2025-03-27 15:54:12');
/*!40000 ALTER TABLE `tbl_search` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_secondhand`
--

DROP TABLE IF EXISTS `tbl_secondhand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_secondhand` (
  `secondhand_id` int NOT NULL AUTO_INCREMENT COMMENT '중고상품 아이디',
  `user_id` int NOT NULL COMMENT '중고상품 등록자 아이디',
  `genre_id` int NOT NULL COMMENT '상품 장르 아이디',
  `publisher_id` int NOT NULL COMMENT '출판사 고유 ID',
  `author_id` int NOT NULL COMMENT '작가 고유 ID',
  `secondhand_name` varchar(100) DEFAULT NULL COMMENT '상품 이름',
  `secondhand_image` varchar(300) DEFAULT NULL COMMENT '상품 이미지',
  `secondhand_description` text COMMENT '상품 설명',
  `secondhand_price` int DEFAULT NULL COMMENT '상품 가격',
  `secondhand_date` datetime DEFAULT NULL COMMENT '상품 발매일',
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '상품 등록일',
  `sales_yn` char(1) DEFAULT 'Y' COMMENT '판매 가능 여부 (Y/N)',
  PRIMARY KEY (`secondhand_id`),
  KEY `fk_secondhand_user` (`user_id`),
  KEY `fk_secondhand_genre` (`genre_id`),
  KEY `fk_secondhand_publisher` (`publisher_id`),
  KEY `fk_secondhand_author` (`author_id`),
  CONSTRAINT `fk_secondhand_author` FOREIGN KEY (`author_id`) REFERENCES `tbl_author` (`author_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_secondhand_genre` FOREIGN KEY (`genre_id`) REFERENCES `tbl_genre` (`genre_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_secondhand_publisher` FOREIGN KEY (`publisher_id`) REFERENCES `tbl_publisher` (`publisher_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_secondhand_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='중고상품 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_secondhand`
--

LOCK TABLES `tbl_secondhand` WRITE;
/*!40000 ALTER TABLE `tbl_secondhand` DISABLE KEYS */;
INSERT INTO `tbl_secondhand` VALUES (1,3,1,1,1,'중고 자바의 정석','2025/03/27/9f548f34-1983-4455-9ae9-c256138a8f79.jfif','<p>약간 사용감 있음</p>',15000,'2023-01-01 00:00:00','2025-03-26 00:07:21','Y'),(2,4,2,2,2,'중고 파이썬 코딩의 기술','2025/03/27/f0eaf9e5-2334-4c62-919c-ebb9dc314b2d.jfif','<p>깨끗한 상태</p>',12000,'2023-02-15 00:00:00','2025-03-26 00:07:21','Y'),(3,3,3,3,3,'중고 역사의 이해','used_history.jpg','페이지 약간 훼손',10000,'2023-03-10 00:00:00','2025-03-26 00:07:22','N'),(13,19,1,17,16,'퇴마록 국내편','2025/03/27/ace9ae28-2671-4355-8ef0-3416832648ee.jpg','<p><br></p><p>퇴마록 국내편 전3권 세트로 판매합니다.</p><p><br></p><p>도서 자체가 출판된지 오래 되었고</p><p>저도 중고로 조금씩 모았던 도서라&nbsp;</p><p>도서마다 상태는 조금씩 상이할 수 있습니다.</p><p><br></p><p><img src=\"http://localhost:8080/image/2025/03/27/3ca1683f-f322-4e5a-8b63-5cb1820094b0.jpg\"></p>',12000,'1994-01-01 00:00:00','2025-03-27 11:01:08','Y'),(14,19,1,17,16,'퇴마록 세계편','2025/03/27/b615cd68-c921-4ad4-9bd2-c45aa0d99bb0.jpg','<p><br></p><p>퇴마록 세계편 전4권 세트로 판매합니다.</p><p><br></p><p>도서 자체가 출판된지 오래 되었고</p><p>저도 중고로 조금씩 모았던 도서라&nbsp;</p><p>도서마다 상태는 조금씩 상이할 수 있습니다.</p><p><br></p><p><img src=\"http://localhost:8080/image/2025/03/27/ee8303e4-7508-4800-92ed-39eb3a1c932d.jpg\"></p>',16000,'1994-12-23 00:00:00','2025-03-27 11:02:23','Y'),(15,19,1,17,16,'퇴마록 혼세편','2025/03/27/2c502f21-c53b-4d95-8ca0-1a5156719241.jpg','<p><br></p><p>퇴마록 혼세편 전6권 세트로 판매합니다.</p><p><br></p><p>도서 자체가 출판된지 오래 되었고</p><p>저도 중고로 조금씩 모았던 도서라&nbsp;</p><p>도서마다 상태는 조금씩 상이할 수 있습니다.</p><p><br></p><p><img src=\"http://localhost:8080/image/2025/03/27/0ee79d61-4862-4cf3-843d-fd1d73e4ddae.jpg\"></p>',24000,'1997-03-28 00:00:00','2025-03-27 11:03:34','Y'),(16,19,1,17,16,'퇴마록 말세편','2025/03/27/adf43d43-5489-4402-bc31-f42e5c22f473.jpg','<p><br></p><p>퇴마록 말세편 전6권 세트로 판매합니다.</p><p><br></p><p>도서 자체가 출판된지 오래 되었고</p><p>저도 중고로 조금씩 모았던 도서라&nbsp;</p><p>도서마다 상태는 조금씩 상이할 수 있습니다.</p><p><br></p><p><img src=\"http://localhost:8080/image/2025/03/27/bfe9e360-5114-4191-9f90-9baca75d8d5d.jpg\"></p>',25000,'2001-07-21 00:00:00','2025-03-27 11:18:48','Y'),(17,20,1,5,18,'화차','2025/03/27/d1a721b4-4b3b-4a1d-9b8b-a40d163ca100.webp','<p>미미여사라 불리우며 국내에도 팬층이 두터운</p><p>미야베 미유키 작가님 소설입니다.</p><p>세월의 흔적은 남아있으나 보관 상태는 나쁘지 않습니다.</p><p><img src=\"http://localhost:8080/image/2025/03/27/93fa26bd-79e7-4caf-85a0-417e34be7d9a.jpg\"><img src=\"http://localhost:8080/image/2025/03/27/dba13212-05ce-4dc1-bed1-402bafabc1c8.png\">       s</p><p><br></p><p><br></p><p>ssdsad <img src=\"http://localhost:8080/image/2025/03/27/12bfffed-5bc7-4e18-861b-3b25d508f1b0.png\"></p>',7000,'2012-02-15 00:00:00','2025-03-27 11:22:49','Y'),(18,21,1,21,20,'3일간의 행복','2025/03/27/41d10561-c413-4e31-9492-669e548bfab6.webp','<p>일본의 웹 상에서 화제가 된 2ch 웹 소설을 원작으로 서적 화 한 작품입니다.</p><p><span style=\"background-color: var(--bs-card-bg); color: var(--bs-card-color);\"><img src=\"http://localhost:8080/image/2025/03/27/905ad1da-e329-4bbb-931f-03d287b4369e.jpg\"></span></p>',5500,'2014-09-18 00:00:00','2025-03-27 11:25:39','Y'),(19,21,1,22,23,'오늘밤, 세계에서 이 눈물이 사라진다 해도','2025/03/27/0dac3435-7c4e-4e3a-b059-c511bc20b5b1.jfif','<p>[오늘밤, 세계에서 이 사랑이 사라진다 해도]의 스핀오프 소설로</p><p>전작의 조연이였던 캐릭터가 주인공으로 등장합니다.</p><p><img src=\"http://localhost:8080/image/2025/03/27/bb2ada6c-08a9-48df-8016-9c5dc2cef9d6.jpg\"></p>',8000,'2022-07-28 00:00:00','2025-03-27 11:28:06','Y'),(22,20,1,29,36,'파이','2025/03/27/975d2085-e81d-4ae9-9672-c9b978d71d6a.jpg','<p>중고상품입니다</p><p><br></p><p><img src=\"http://localhost:8080/image/2025/03/27/62b3c153-9c8b-4c13-8df9-bb5087308b7b.jpg\"></p>',5000,'2025-03-06 00:00:00','2025-03-27 16:16:26','Y');
/*!40000 ALTER TABLE `tbl_secondhand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_secondhand_attatch`
--

DROP TABLE IF EXISTS `tbl_secondhand_attatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_secondhand_attatch` (
  `secondhand_attatch_id` int NOT NULL AUTO_INCREMENT COMMENT '중고상품 첨부 아이디',
  `secondhand_id` int NOT NULL COMMENT '중고상품 아이디',
  `secondhand_file_path` varchar(300) NOT NULL COMMENT '중고상품 첨부경로',
  `secondhand_org_filename` varchar(300) NOT NULL COMMENT '중고상품 원본 파일이름',
  `secondhand_sys_filename` varchar(40) NOT NULL COMMENT '중고상품 저장 파일이름',
  PRIMARY KEY (`secondhand_attatch_id`),
  KEY `fk_secondhand_attach` (`secondhand_id`),
  CONSTRAINT `fk_secondhand_attach` FOREIGN KEY (`secondhand_id`) REFERENCES `tbl_secondhand` (`secondhand_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='중고상품 첨부 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_secondhand_attatch`
--

LOCK TABLES `tbl_secondhand_attatch` WRITE;
/*!40000 ALTER TABLE `tbl_secondhand_attatch` DISABLE KEYS */;
INSERT INTO `tbl_secondhand_attatch` VALUES (1,1,'/uploads/secondhand','used_image1.jpg','secondhand1_image.jpg'),(2,2,'/uploads/secondhand','used_image2.jpg','secondhand2_image.jpg'),(3,3,'/uploads/secondhand','used_image3.jpg','secondhand3_image.jpg'),(4,2,'/uploads/secondhand','used_image1.jpg','secondhand1_image.jpg'),(5,3,'/uploads/secondhand','used_image5.jpg','secondhand5_image.jpg'),(6,3,'/uploads/secondhand','used_image4.jpg','secondhand4_image.jpg'),(20,13,'2025/03/27','2025/03/27/3ca1683f-f322-4e5a-8b63-5cb1820094b0.jpg','3ca1683f-f322-4e5a-8b63-5cb1820094b0.jpg'),(21,14,'2025/03/27','2025/03/27/ee8303e4-7508-4800-92ed-39eb3a1c932d.jpg','ee8303e4-7508-4800-92ed-39eb3a1c932d.jpg'),(22,15,'2025/03/27','2025/03/27/0ee79d61-4862-4cf3-843d-fd1d73e4ddae.jpg','0ee79d61-4862-4cf3-843d-fd1d73e4ddae.jpg'),(23,16,'2025/03/27','2025/03/27/bfe9e360-5114-4191-9f90-9baca75d8d5d.jpg','bfe9e360-5114-4191-9f90-9baca75d8d5d.jpg'),(25,18,'2025/03/27','2025/03/27/905ad1da-e329-4bbb-931f-03d287b4369e.jpg','905ad1da-e329-4bbb-931f-03d287b4369e.jpg'),(26,19,'2025/03/27','2025/03/27/bb2ada6c-08a9-48df-8016-9c5dc2cef9d6.jpg','bb2ada6c-08a9-48df-8016-9c5dc2cef9d6.jpg'),(28,17,'2025/03/27','2025/03/27/dba13212-05ce-4dc1-bed1-402bafabc1c8.png','dba13212-05ce-4dc1-bed1-402bafabc1c8.png'),(29,17,'2025/03/27','2025/03/27/12bfffed-5bc7-4e18-861b-3b25d508f1b0.png','12bfffed-5bc7-4e18-861b-3b25d508f1b0.png'),(31,22,'2025/03/27','2025/03/27/62b3c153-9c8b-4c13-8df9-bb5087308b7b.jpg','62b3c153-9c8b-4c13-8df9-bb5087308b7b.jpg');
/*!40000 ALTER TABLE `tbl_secondhand_attatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '회원 아이디',
  `user_email` varchar(50) NOT NULL COMMENT '이메일',
  `user_pw` varchar(64) NOT NULL COMMENT '비밀번호',
  `user_name` varchar(30) DEFAULT NULL COMMENT '회원이름',
  `user_birthdate` date DEFAULT NULL COMMENT '회원 생년월일',
  `user_phone` varchar(11) DEFAULT NULL COMMENT '회원 휴대폰 번호',
  `user_nickname` varchar(50) NOT NULL COMMENT '회원닉네임',
  `profile_img` varchar(100) DEFAULT NULL COMMENT '프로필 이미지 경로',
  `profile_img_ori_name` varchar(100) DEFAULT NULL COMMENT '프로필 이미지 원본 이름',
  `profile_img_sys_name` varchar(300) DEFAULT NULL COMMENT '프로필 이미지 시스템 이름',
  `session_id` varchar(100) DEFAULT NULL COMMENT '자동로그인 정보',
  `user_role` varchar(20) DEFAULT NULL COMMENT '관리자 여부 (ADMIN, USER, ...)',
  `create_dt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '회원가입일자',
  `change_dt` datetime DEFAULT NULL COMMENT 'password change date',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='회원 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'admin@gmail.com','$2a$12$Df6Yvwla0mGiDTxrT.lp5OTWnCMYGdjLjiFNZYPrbcc2uAyLAPfqW','김관리','1979-07-25','01011112222','북적북적 관리자','admin.jpg',NULL,NULL,'session3','ADMIN','2000-01-01 00:00:00','2025-03-27 12:17:18'),(2,'test@gmail.com','$2a$12$rlnFIyEUl3ZLaR3JzhixvO/KWWTu/JxT0PJ9uYDaCKWMeWq9uGLD.','테스터','1994-02-11','01022223333','임시 관리자','text.jpg',NULL,NULL,'session4','ADMIN','2025-03-26 00:07:21',NULL),(3,'user1@example.com','$2a$12$OtXALorHKn2UBC5kgtawt.IaFssjJkd0yWWSWmt.QXNntOg6yQ7QO','홍길동','1990-07-25','01012345678','길동이','profile1.jpg',NULL,NULL,'session1','ADMIN','2025-03-26 00:07:21','2025-03-27 15:34:54'),(4,'user2@example.com','$2a$12$VX5VHZgL2YpfWZOD23OByeWRuiFfzFDih0RR5xB4W329YNlsO6A8e','김철수','1994-01-12','01087654321','철수','profile2.jpg',NULL,NULL,'session2','USER','2025-03-26 00:07:21',NULL),(5,'admin','$2a$10$8LsR9DlkIYM4RkNBV0YOAegGhRHCcdORETVWH2vPdQpGol3JLLuA2','임금희','2000-01-01','01012345678','관리자입니다','profile5.jpg',NULL,NULL,'session5','ADMIN','2025-03-26 00:07:21',NULL),(6,'test','$2a$12$LBeyFvjUwOY29/BlTRlXTeDg8UlhE1Qgl6G6Mr3jwN6LOuWOv/xPC','김삿갓','2000-01-01','01012345678','방랑자','profile5.jpg',NULL,NULL,'session5','ADMIN','2025-03-26 00:07:21','2025-03-27 12:51:38'),(7,'oeoroeor@naver.com','$2a$10$4ZtVddG3WMKcAlgX1dnn0e1PpxtwN2/RD8wxkzPo0T9znQb76Q.DO','이수정','2025-03-10','010-1234-56','이수정',NULL,NULL,NULL,NULL,'USER','2025-03-10 18:58:20','2025-03-27 12:25:36'),(9,'qwer@gmail.com','$2a$10$hUTLd322/gODh4i8r6S.xeMcekXEKNLDc/WvCoHpOaAbYSZGpMNQW','김성율','2025-03-22','01012345678','김성율최고관리위원',NULL,NULL,NULL,NULL,'ADMIN','2025-03-22 17:55:30',NULL),(18,'appt@daum.net','$2a$10$0QZQVrBeZVoOVQwOp22zV.580cR2pQt2LWcfXi0HF8PMSgZ9mF4DW','김리예','1984-07-25','01012345678','안녕하세요',NULL,NULL,NULL,NULL,'USER','2025-03-27 10:37:45',NULL),(19,'kkk@gmail.com','$2a$10$DK/fdmOxrTfG3oXVwDB0EeEQYT3zifql676yotVZW76qAQHocTub.','김민희','1983-08-02','01011112222','kkk',NULL,NULL,NULL,NULL,'USER','2025-03-27 10:52:23',NULL),(20,'mmm@gmail.com','$2a$10$j4/UizezktGE.iRQmYOAuuxEJbeFOdR7mHqxldjz.8JTLikai3jTS','김민희','2025-03-27','01011112222','gom',NULL,NULL,NULL,NULL,'USER','2025-03-27 11:20:32',NULL),(21,'hhh@gmail.com','$2a$10$Utj0bM9Y9/JC18hzubPpnedFPcrz7j0hPXStdj.63DdU.P4iDjyfm','김민희','2024-10-10','01011112222','mini',NULL,NULL,NULL,NULL,'USER','2025-03-27 11:24:31',NULL),(23,'chan@naver.com','$2a$10$yXyWrUNRdtXKTcaH616JPuzd1qIr9XVUti2FLHSDB8y7mNE3nIJYy','킴찬','2025-03-04','01082828282','관리단',NULL,NULL,NULL,NULL,'ADMIN','2025-03-27 12:44:23','2025-03-27 14:27:50'),(28,'wocks@naver.com','$2a$10$yuzhfgpLahsNSRU7LDBGbeeGToJWxEQ9luSP.lfFrZRE2Ui5Oq4q6','발표용','2025-03-27','01022222222','닉네임임',NULL,NULL,NULL,NULL,'USER','2025-03-27 15:32:47','2025-03-27 15:34:11'),(29,'rla1995cks@naver.com','$2a$10$6TsHjGXoXgOzGVlzd2vBUuvQDrUV4qLMXpTFbkevZ1ososLcOPUMK',NULL,NULL,NULL,'김재찬',NULL,NULL,NULL,NULL,'USER','2025-03-27 15:36:29',NULL),(30,'kim@naver.com','$2a$10$8BMAiutKdZ5QWGJbpTa/eefNrCQZnjRD/El31u5GubHWDqroI6HzW','r김재찬','2025-02-27','01012345678','닉네임임',NULL,NULL,NULL,NULL,'USER','2025-03-27 15:45:33',NULL);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-27 16:29:12
