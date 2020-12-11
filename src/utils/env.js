/**
 * @description 环境变量
 * @author 张燕良
 */

module.exports = {
  isDev: process.env.NODE_ENV === "dev",
  notDev: process.env.NODE_ENV !== "dev",
  isProd: process.env.NODE_ENV === "production",
  notProd: process.env.NODE_ENV !== "production",
};
 