/**
 * @description jq 封装 axios
 * @author 张燕良
 */
// 请求基地址
const baseUrl = "http://127.0.0.1:3000";

class Axios {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  /**
   * 设置 请求头部
   * @param {*} xhr
   */
  setHeader(xhr) {
    let token = localStorage.getItem("token") || "";
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
  }
  /**
   * 统一 处理 返回 状态
   * @param { String | Number } code
   */
  handleStatus(res, rej, response) {
    switch (Number(response.code)) {
      case 200:
        return res(response);
      case 401:
        // redirect("/"); //跳转登陆页面
        return rej(response.msg || { err: "未登陆，请先登陆" });
      default:
        return rej(response);
    }
  }
  /**
   *  请求拦截
   * @param { string } url 请求路径
   * @param { object } params 请求参数
   */
  requestToIntercept(url, params = {}) {
    return new Promise((res, rej) => {
      if (typeof url != "string") {
        rej({ err: "请填写路径" });
        return;
      }
      console.log(
        `%c 发送 api_${url}`,
        "background:#1E1E1E;color:#bada55",
        JSON.parse(JSON.stringify(params))
      );
      res();
    });
  }

  /**
   *  响应拦截
   * @param {*} url
   * @param {*} params
   */
  responseToIntercept(res, rej, url, response) {
    console.log(
      `%c 响应 api_${url}`,
      "background:#12d269;color:#e4e4e4",
      JSON.parse(JSON.stringify(response))
    );
    return this.handleStatus(res, rej, response);
  }

  /**
   * post 请求
   * @param { string } url 请求路径
   * @param { object } params 请求参数
   */
  async $post(url, params = {}) {
    await this.requestToIntercept(url, params);
    const that = this;
    return new Promise((res, rej) => {
      $.ajax({
        type: "POST",
        url: this.baseUrl + url,
        data: params,
        beforeSend: async (xhr) => {
          await this.setHeader(xhr);
        },
        success: function (response) {
          return that.responseToIntercept(res, rej, url, response);
        },
        error: function (response) {
          console.log(
            `%c 响应 api_${url}`,
            "background:red;color:#fff",
            JSON.parse(JSON.stringify(response))
          );
          return that.handleStatus(res, rej, response.responseJSON);
        },
      });
    });
  }

  /**
   * get 请求
   * @param { string } url 请求路径
   * @param { object } params 请求参数
   */
  async $get(url, params) {
    await this.requestToIntercept(url, params);
    const that = this;
    return new Promise((res, rej) => {
      $.ajax({
        type: "GET",
        url: this.baseUrl + url,
        data: params,
        beforeSend: async (xhr) => {
          await this.setHeader(xhr);
        },
        success: async (response) => {
          return res(that.responseToIntercept(url, response));
        },
        error: function (response) {
          console.log(
            `%c 响应 api_${url}`,
            "background:red;color:#fff",
            JSON.parse(JSON.stringify(response))
          );
          return that.handleStatus(res, rej, response.responseJSON);
        },
      });
    });
  }
}

const axios = new Axios(baseUrl);
