/**
 * @description 处理外键
 * @author 张燕良
 */

const User = require("./User");
const Order = require("./Order");

// 外键 多对一
// Bar.belongsTo(User, {
//   foreignKey: "userId",
// });
// 外键 一对多
// User.hasMany(Bar, {
//   foreignKey: "userId",
// });

module.exports = {
  User,
  Order
};
