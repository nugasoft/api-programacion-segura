/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80100
 Source Host           : localhost:3306
 Source Schema         : taller

 Target Server Type    : MySQL
 Target Server Version : 80100
 File Encoding         : 65001

 Date: 24/11/2023 16:15:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for directorio
-- ----------------------------
DROP TABLE IF EXISTS `directorio`;
CREATE TABLE `directorio` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(65) CHARACTER SET utf8mb3 COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  `celular` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  `correo` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  `fechacreo` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_swedish_ci;

-- ----------------------------
-- Records of directorio
-- ----------------------------
BEGIN;
INSERT INTO `directorio` (`id`, `nombre`, `celular`, `correo`, `fechacreo`) VALUES (1, 'JUAN', NULL, NULL, NULL);
INSERT INTO `directorio` (`id`, `nombre`, `celular`, `correo`, `fechacreo`) VALUES (2, 'PEDRO', NULL, NULL, NULL);
INSERT INTO `directorio` (`id`, `nombre`, `celular`, `correo`, `fechacreo`) VALUES (3, 'MARIA', NULL, NULL, NULL);
INSERT INTO `directorio` (`id`, `nombre`, `celular`, `correo`, `fechacreo`) VALUES (4, 'JOSE', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `apellidos` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `fechacreo` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
BEGIN;
INSERT INTO `usuarios` (`id`, `email`, `password`, `nombre`, `apellidos`, `fechacreo`) VALUES (1, 'unsafe@gmail.com', 'admin123', 'Usuario', 'demo', '2023-11-24 16:15:16');
INSERT INTO `usuarios` (`id`, `email`, `password`, `nombre`, `apellidos`, `fechacreo`) VALUES (4, 'demo@gmail.com', '$2a$10$2ReTlFYCf0AWjAIrHpqWEeyJU0U10248Hho4C50WM6GPum2pmcLD.', 'Usuario', 'demo', '2023-11-24 16:11:22');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
