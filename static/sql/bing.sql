/*
Navicat MySQL Data Transfer

Source Server         : tai
Source Server Version : 50727
Source Host           : localhost:3306
Source Database       : bing

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2021-01-12 09:15:20
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
  `parentId` varchar(225) NOT NULL,
  `childrenId` varchar(225) DEFAULT NULL,
  `routerLink` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menulist
-- ----------------------------
INSERT INTO `menulist` VALUES ('3942', '表格', '1597140078624', '0', null, '', '0,1');
INSERT INTO `menulist` VALUES ('3942', '增删改查', '1597196516760', '1597140078624', null, '/home/index', '0,1');
INSERT INTO `menulist` VALUES ('3942', '列表管理', '1597204429254', '0', null, '', '0');
INSERT INTO `menulist` VALUES ('3942', '左侧菜单栏', '1597204449952', '1597204429254', null, '/admin/menuSet', '0');
INSERT INTO `menulist` VALUES ('3942', '可拖拽表格', '1597224318141', '1597140078624', null, '/table/tableDrag', '0,1');
INSERT INTO `menulist` VALUES ('3942', 'echarts', '1597285576956', '0', null, '', '0,1');
INSERT INTO `menulist` VALUES ('3942', '地图', '1597285599341', '1597285576956', null, '/echarts/echartsMap', '0,1');
INSERT INTO `menulist` VALUES ('3942', '富文本编辑器', '1597286425714', '0', null, '', '0,1');
INSERT INTO `menulist` VALUES ('3942', 'tinymce', '1597286437002', '1597286425714', null, '/tinymce/editor', '0,1');
INSERT INTO `menulist` VALUES ('3942', 'canvas', '1600133305178', '0', null, '', '0,1');
INSERT INTO `menulist` VALUES ('3942', '制作图片', '1600133422410', '1600133305178', null, '/canvas/img', '0,1');
INSERT INTO `menulist` VALUES ('3942', '数字', '1602647311875', '0', null, '', '0,1');
INSERT INTO `menulist` VALUES ('3942', '数字动画', '1602647347114', '1602647311875', null, '/number/count-to', '0,1');
INSERT INTO `menulist` VALUES ('3942', 'CSS', '1603243892385', '0', null, '', '0,1');
INSERT INTO `menulist` VALUES ('3942', 'hover', '1603243907565', '1603243892385', null, '/CSS/hover', '0,1');
INSERT INTO `menulist` VALUES ('3942', '表格大数据优化', '1604899954644', '1597140078624', null, '/table/virtual-scroll', '0,1');
INSERT INTO `menulist` VALUES ('3942', '表头筛选', '1604975746441', '1597140078624', null, '/table/dg-table', '0,1');
INSERT INTO `menulist` VALUES ('3942', '二维码', '1607651991010', '0', null, '', '0,1');
INSERT INTO `menulist` VALUES ('3942', '生成二维码并下载', '1607652018610', '1607651991010', null, '/qrcodejs2/downloadImg', '0,1');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

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
INSERT INTO `node` VALUES ('8', '分页', '2020-08-07 10:42:02', '1234', '3942');
INSERT INTO `node` VALUES ('9', '分页1', '2020-08-07 10:42:11', '111', '3942');
INSERT INTO `node` VALUES ('10', '分页2', '2020-08-07 10:42:24', '222', '3942');
INSERT INTO `node` VALUES ('11', '分页3', '2020-08-07 10:42:38', '333', '3942');
INSERT INTO `node` VALUES ('12', '分页4', '2020-08-07 10:42:49', '444', '3942');
INSERT INTO `node` VALUES ('13', '新增', '2020-10-12 10:06:06', '北京新增一例境外输入', '3942');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `name` varchar(255) DEFAULT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('超级管理员', '0');
INSERT INTO `role` VALUES ('普通用户', '1');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `userName` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('taibingtao', '123456', '3942', '1', '0');
INSERT INTO `userinfo` VALUES ('ceshi', 'qwerasdf', '8417', '2', '1');
