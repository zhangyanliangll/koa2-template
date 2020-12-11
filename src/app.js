const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const jsonwebtoken = require("jsonwebtoken");
const koajwt = require("koa-jwt");
const util = require("util");
const verify = util.promisify(jsonwebtoken.verify);
const { SECRET } = require("./config/jwt");

const { isProd } = require("./utils/env");

const viewRouterObj = require("./routes");
const apiObj = require("./api");

// error handler
let onerrorConf = {};
if (isProd) {
  onerrorConf = {
    redirect: "/error",
  };
}
onerror(app, onerrorConf);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
const staticServer = require("koa-static");
app.use(require("koa-static")("../public"));
app.use(staticServer(__dirname, "./utils"));
app.use(staticServer(__dirname, "./assets"));

// registration page
app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
for (const key in viewRouterObj) {
  if (viewRouterObj.hasOwnProperty(key)) {
    app.use(viewRouterObj[key].routes(), viewRouterObj[key].allowedMethods());
  }
}

// 中间件对token进行验证
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: "未登录，请先登录",
      };
    } else {
      throw err;
    }
  });
});

// login not require validation
app.use(
  koajwt({ secret: SECRET }).unless({
    path: [/^\/admin\/login/],
  })
);

// api
for (const key in apiObj) {
  if (apiObj.hasOwnProperty(key)) {
    app.use(apiObj[key].routes(), apiObj[key].allowedMethods());
  }
}

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
