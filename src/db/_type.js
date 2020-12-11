/**
 * @description sequelize 类型
 * @author 张燕良
 */
const Sequelize = require("sequelize");

module.exports = {
  STRING: Sequelize.STRING, // 字符串
  TEXT: Sequelize.TEXT,
  CITEXT: Sequelize.CITEXT,
  STRING: Sequelize.STRING,
  BOOLEAN: Sequelize.BOOLEAN, // 布尔
  INTEGER: Sequelize.INTEGER, // 数字
  FLOAT: Sequelize.FLOAT,
  DOUBLE: Sequelize.DOUBLE,
  REAL: Sequelize.REAL,
  DECIMAL: Sequelize.DECIMAL,
  DATE: Sequelize.DATE, // 日期
};
