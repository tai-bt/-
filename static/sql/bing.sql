/*
Navicat MySQL Data Transfer

Source Server         : tai
Source Server Version : 50727
Source Host           : localhost:3306
Source Database       : bing

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2020-08-11 18:02:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for menulist
-- ----------------------------
DROP TABLE IF EXISTS `menulist`;
CREATE TABLE `menulist` (
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `parentId` int(11) NOT NULL,
  `childrenId` int(11) DEFAULT NULL,
  `routerLink` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menulist
-- ----------------------------
INSERT INTO `menulist` VALUES ('3942', '第一个', '1597140078624', '0', null, '');

-- ----------------------------
-- Table structure for node
-- ----------------------------
DROP TABLE IF EXISTS `node`;
CREATE TABLE `node` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `date` timestamp NULL DEFAULT NULL,
  `resource` longtext,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node
-- ----------------------------
INSERT INTO `node` VALUES ('1', '确认弹框', '2020-07-31 13:56:47', '删除确认---修改了一下', '3942');
INSERT INTO `node` VALUES ('2', '搜索', '2020-07-31 14:19:48', '按事件名称搜索', '3942');
INSERT INTO `node` VALUES ('3', '改一下', '2020-07-31 14:24:23', '不知道该干啥', '3942');
INSERT INTO `node` VALUES ('4', '用户ID', '2020-08-04 17:26:53', '基于用户ID做增删改查--修改一下', '3942');
INSERT INTO `node` VALUES ('5', '注册', '2020-08-04 17:34:52', '这是一个新用户', '8417');
INSERT INTO `node` VALUES ('6', '判断', '2020-08-04 17:37:53', '非空判断', '8417');
INSERT INTO `node` VALUES ('7', '自增ID', '2020-08-06 13:24:00', '将ID设为主键，设为自增', '3942');
INSERT INTO `node` VALUES ('8', '分页', '2020-08-07 10:42:02', '123', '3942');
INSERT INTO `node` VALUES ('9', '分页1', '2020-08-07 10:42:11', '111', '3942');
INSERT INTO `node` VALUES ('10', '分页2', '2020-08-07 10:42:24', '222', '3942');
INSERT INTO `node` VALUES ('11', '分页3', '2020-08-07 10:42:38', '333', '3942');
INSERT INTO `node` VALUES ('12', '分页4', '2020-08-07 10:42:49', '444', '3942');
INSERT INTO `node` VALUES ('13', '分页5', '2020-08-07 10:43:00', '555', '3942');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `userName` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('taibingtao', '123456', '3942', '1');
INSERT INTO `userinfo` VALUES ('ceshi', '123456', '8417', '2');
INSERT INTO `userinfo` VALUES ('123', '123456', '4258', '3');
