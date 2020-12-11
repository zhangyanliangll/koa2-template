/**
 * @description 配置数据库连接
 * @author 张燕良
 */

const { MYSQL_CONF } = require("../config/db");
const { isProd } = require("../utils/env");

const { host, database, user, password } = MYSQL_CONF;

let conf = {
  host,
  dialect: "mysql", // 数据库类型
};

// 连接池
if (isProd) {
  conf.pool = {
    max: 5, // 最大连接数
    min: 0,
    // acquire: 30000,
    idle: 10000, // 如果一个连接池 10s 之内未使用就被释放
  };
}

const Sequelize = require("sequelize");

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;
