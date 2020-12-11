/**
 * @description 服务端请求方法
 * @author 张燕良
 */
const http = require("http");
const qs = require("querystring");
const { Third_Party_Service_Conf } = require("../config/db");
/**
 *
 * @param { Object } ctx
 * @param { Object } next
 * @param { Object } body { method:'' , hostname:'' , params:{'参数'}...}
 */
function serviceHttps(ctx, next, body = {}) {
  body.params = body.params || ctx.request.body; // post请求参数
  ctx.method = body.method || ctx.method; // 请求类型
  //   get请求
  if (ctx.method !== "POST") {
    body.params = body.params || ctx.query;
  }
  const params = qs.stringify(body.params);
  //   格式化请求头
  let body_request = {
    hostname: Third_Party_Service_Conf.hostname,
    path: `${ctx.url}?` + params,
    port: Third_Party_Service_Conf.port,
    method: ctx.method,
    json: true, //设置返回的数据为json
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(params),
    },
  };
  body_request = Object.assign(body_request, body);
  console.log(body_request.method, "---------", params, "params----------");
  //   发送请求
  return new Promise((resolve, reject) => {
    let req = http.request(body_request, (res) => {
      let content = "";
      res.setEncoding("utf-8");
      res.on("data", (chunk) => {
        content += chunk;
      });
      res.on("end", () => {
        resolve(JSON.parse(content));
      });
    });
    /*****发送请求体*****/
    req.write(params);
    /*****异常处理*****/
    req.on("error", (err) => {
      resolve({ result: false, errmsg: err.message });
    });
    /*****结束请求*****/
    req.end();
  });
}

module.exports = { serviceHttps };
