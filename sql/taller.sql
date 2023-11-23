/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : taller

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 23/11/2023 17:13:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for directorio
-- ----------------------------
DROP TABLE IF EXISTS `directorio`;
CREATE TABLE `directorio` (
  `id` int DEFAULT NULL,
  `nombre` varchar(65) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  `celular` varchar(20) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  `correo` varchar(120) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  `fechacreo` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- ----------------------------
-- Records of directorio
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
