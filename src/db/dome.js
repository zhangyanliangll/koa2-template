/**
 * @description dome 插入数据 删除数据 查询数据 更新数据
 * @author 张燕良
 */
const Sequelize = require("sequelize");
const User = require("./model/User");
const Order = require("./model/Order");
const seq = require("./seq"); // 原始查询

!(async () => {
  // 原始查询
  //   const [results, metadata] = await seq.query(
  //     "SELECT * FROM users,orders WHERE users.id=orders.user_id",
  //     {
  //       type: Sequelize.SELECT,
  //     }
  //   );
  //   原始更新
  //   const [results, metadata] = await seq.query(
  //     "UPDATE users SET userName = 'zhangyanliang' WHERE id = 1"
  //   );
  //   console.log(results, "---------", metadata);
  // 结果将是一个空数组,元数据将包含受影响的行数.
  // 模型查询，插入... *************************************************************
  // 新增
  //   const zhangyanliang = await User.create({ userName: "zhangyanliang" });
  //   console.log(zhangyanliang.dataValues, " ----- 新增：ok");
  // 新增多个
  //   const captains = await User.bulkCreate([
  //     { userName: "Jack Sparrow"},
  //     { userName: "Davy Jones"},
  //   ]);
  //   console.log(captains, " ----- 新增多个：ok");
  // 查询
  // 数字比较开始
  //    [User.gt]: 6,                              // > 6
  //    [User.gte]: 6,                             // >= 6
  //    [User.lt]: 10,                             // < 10
  //    [User.lte]: 10,                            // <= 10
  //    [User.between]: [6, 10],                   // BETWEEN 6 AND 10
  //    [User.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15
  // 数字比较结束
  //   findAndCountAll#  分页 ------
  //   findAndCountAll 方法是结合了 findAll 和 count 的便捷方法. 在处理与分页有关的查询时非常有用,在分页中,你想检索带有 limit 和 offset 的数据,但又需要知道与查询匹配的记录总数.
  //   const { count, rows } = await Order.findAndCountAll({
  //   include: [
  //     {
  //       mode: User, //连表查询
  //       attributes: ["id", ["userName", "姓名"]],
  //       where: {},
  //     },
  //   ],
  //     offset: 0,
  //     limit: 2,
  //   });
  //   console.log(count, "--");
  //   console.log(rows, "---");
  //   查询单个
  //   const findOne = await User.findAll({
  //     where: {
  //       id: 1,
  //     },
  //   });
  //   console.log(findOne[0].dataValues, " ----- 查询单个：ok");
  // 查询 所有用户
  //   const users = await User.findAll({
  //     attributes: ["id", ["userName", "姓名"]],
  //     // where: {
  //     //   id: 10,
  //     //   userName: "lisi",
  //     // },
  //     // 跳过0个实例,然后获取5个实例 限制和分页
  //     offset: 0,
  //     limit: 5,
  //     // 分组
  //     group: "userName",
  //     // 排序
  //     order: [["userName", "DESC"]],
  //   });
  //   console.log(users[0].dataValues, " ----- 查询：ok");
  //   统计个数 函数使用
  //   const sum = await User.findAll({
  //     attributes: {
  //       include: [[Sequelize.fn("COUNT", Sequelize.col("id")), "id_sum"]],
  //     },
  //   });
  //   console.log(sum[0].dataValues.id_sum, " ----- 统计：ok");
  // 更新
  //   const updt = await User.update(
  //     { userName: "zhangsan" },
  //     {
  //       where: {
  //         id: 10,
  //       },
  //     }
  //   );
  //   console.log(updt[0], " ----- 更新：ok");
  // 删除
  //   const del = await User.destroy({
  //     where: {
  //       id: 10,
  //     },
  //   });
  //   const del = await User.destroy({
  //     truncate: true, // 销毁所有内容
  //   });
  //   console.log(del, " ----- 删除：ok");
})();
