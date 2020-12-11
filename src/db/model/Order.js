/**
 * @description 创建 Order 表
 * @author 张燕良
 */

const Sequelize = require("sequelize");
const seq = require("../seq");

// 创建 User 模型
const Order = seq.define("order", {
  // id 自动创建 并且会设为主键
  goodsName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // 唯一不能重复
    defaultValue: "", // 默认值
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "", // 默认值
  },
});

module.exports = Order;
