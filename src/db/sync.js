/**
 * @description 处理数据库
 * @author 张燕良
 */

const seq = require("./seq");
require("./model");

// 测试连接 --------------
// seq
//   .authenticate()
//   .then(() => {
//     console.log("连接成功：ok");
//   })
//   .catch(() => {
//     console.error("err:");
//   });

//执行同步 表
!(async () => {
  try {
    await seq.sync({ force: true }); // true：删除数据库的表重新创建
    console.log("ok: 同步成功");
    process.exit(); // 退出程序
  } catch (error) {
    console.error("err: 同步失败");
  }
})();
