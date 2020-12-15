const router = require("koa-router")();
const { serviceHttps } = require("../lib/service_https");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("../config/jwt");

const { SuccessModel, ErrorModel } = require("../model/ResModel");

router.prefix("/admin");

router.post("/login", function (ctx, next) {
  // ctx.body = "this is a users response!";
  // 登录
  // 判断用户名密码是否匹配
  let checkUser = true;
  if (checkUser) {
    ctx.body = {
      code: 200,
      msg: "登录成功",
      token: jsonwebtoken.sign(
        { name: "张三", id: "100" }, // 加密userToken
        SECRET,
        { expiresIn: "1h" }
      ),
    };
  } else {
    // 登录失败, 用户名密码不正确
    ctx.body = {
      code: 400,
      msg: "用户名密码不匹配",
    };
  }
});

router.post("/sendmsg", async (ctx, next) => {
  let data = await serviceHttps(ctx,'127.0.0.1');
  console.log(data, "-----------////////////");
  ctx.body = {
    code: 200,
    msg: "请求成功",
  };
});

module.exports = router;
