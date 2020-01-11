-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: patsakis
-- ------------------------------------------------------
-- Server version	5.7.28

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(45) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `roleId` int(3) NOT NULL DEFAULT '1',
  `password` longtext NOT NULL,
  `token` longtext,
  PRIMARY KEY (`username`),
  UNIQUE KEY `id_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin','admin','admin',0,'admin',NULL),('makis',NULL,NULL,1,'$2a$10$xNg6apQGiYiorZawy2AXLO.EmU0Mh2TyLKme5ykxyyxG6IA1sOqbW',NULL),('nickben','nick','benakis',1,'$2y$10$kokbkw84cdFGys.EO2FxceZpaEicJCmBS..eSGagF3H6SeBNN6ICq\n$2y$10$kokbkw84cdFGys.EO2FxceZpaEicJCmBS..eSGagF3H6SeBNN6ICq\n',NULL),('patsakis',NULL,NULL,2,'$2a$10$WK942cNGouCtOsVSXLmOyOV0xvzy.wP6DgM4MvhW1u2qOqN80K4aG',NULL),('sakopoulos',NULL,NULL,2,'$2a$10$Sz2dBX0VxR2GG8x8f/w1leVx2PfmUqV/1XkHPhgWjvfiU3CKh268S',NULL),('test',NULL,NULL,1,'$2a$10$VN/vUmx7paiNoZVx7fkdSO0OC7zClIWRzppWkDIPChJaWxF2iz/Ya',NULL),('unipiStudent',NULL,NULL,1,'$2a$10$K678UEshAq2azNHH9PhVuuCyNnLax4TZ2ApVz6esLqfko.98eEVhO',NULL),('unipiStudent2',NULL,NULL,1,'$2b$10$2vpw.EMGDbHMByXAkJ3mGuF74NY9UOyY/wc42aP5YQIuqZA6UX4Gy',NULL),('unipiStudent3',NULL,NULL,1,'$2b$10$wTsOX0R7yCM8spoD7VXuEegzFSVSzJtJfgmPGDuKzojEBKmwGKMAW',NULL),('unipiStudent4',NULL,NULL,1,'$2b$10$cmBdP1jd9gTNGhUOhf2Bi.xrO1cdN3IZZAPASlDfbIaaX2JVc6QEi',NULL),('unipiTeacher',NULL,NULL,2,'$2a$10$t/B6IDyBmbCASM.Tiwyqve6rXmF4luMF/MzbcwpxPYAL.AFntHIG6',NULL),('unipiTeacher2',NULL,NULL,2,'$2b$10$OxXlG7u2XpqFlXStyAcXYubLSWIa42/EAIsE1l/JIpCib0E7FlnYa',NULL),('unipiTeacher3',NULL,NULL,2,'$2b$10$oXWjTS2rb7u3B9Dv2Dj3yuY.6zg6NwKAntTRx4DNlQUS8Oyj8gegy',NULL),('unipiTeacher4',NULL,NULL,2,'$2b$10$FnSe7LZXe74FWKVB.oFBw.19BIlRagSQLCaFcEL4Ru473X/6wjVmu',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-11 16:06:03
