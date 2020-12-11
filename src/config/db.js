/**
 * @description redis和mysql配置
 * @author 张燕良
 */

const { isProd } = require("../utils/env");

// 请求第三方接口
let Third_Party_Service_Conf = {
  port: 80,
  hostname: "b.jiayouwa.net",
};

// redis
let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};

// 数据库
let MYSQL_CONF = {
  database: "test", //数据库名称
  user: "root",
  password: "123456",
  host: "127.0.0.1",
  port: 3306,
};

if (isProd) {
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
  Third_Party_Service_Conf,
};
