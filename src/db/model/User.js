/**
 * @description 创建Users表
 * @author 张燕良
 */

const Sequelize = require("sequelize");
const seq = require("../seq");

// 创建 User 模型
const User = seq.define("user", {
  // id 自动创建 并且会设为主键
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // 唯一不能重复
    defaultValue: "", // 默认值
  },
});

module.exports = User;
