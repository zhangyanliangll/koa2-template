/**
 * @description jq 封装 axios
 * @author 张燕良
 */
// 请求基地址
const baseUrl = "http://127.0.0.1";

class Axios {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  /**
   * 设置 请求头部
   * @param {*} xhr
   */
  setHeader(xhr) {
    let token = sessionStorage.getItem("token") || "";
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
  }
  /**
 *  请求拦截
 * @param {*} url
 * @param {*} params
 */
 requestToIntercept(url, params) {
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
    });
  }
  
  /**
   *  响应拦截
   * @param {*} url
   * @param {*} params
   */
   responseToIntercept(url, params) {
    return new Promise((res, rej) => {
      console.log(
        `%c 发送 api_${url}`,
        "background:#1E1E1E;color:#bada55",
        JSON.parse(JSON.stringify(params))
      );
    });
  }
  
  /**
   *
   * @param { string } url 请求路径
   * @param { object } params 请求参数
   */
  _axios(url, params) {
    url = this.baseUrl + url;
    // 请求拦截 -------------

    
    await requestToIntercept(url, params);
  
    function $post(params) {
      return new Promise((res, rej) => {
        $.ajax({
          type: "POST",
          url,
          data: params,
          beforeSend: setHeader(xhr),
          //   beforeSend: function (xhr) {
          //     setHeader(xhr);
          //   },
          success: async function (response) {
            await responseToIntercept;
            res(response);
          },
        });
      });
    }
    function $get(params) {
      return new Promise((res, rej) => {
        $.ajax({
          type: "GET",
          url,
          data: params,
          beforeSend: setHeader(xhr),
          success: async function (response) {
            await responseToIntercept;
            res(response);
          },
        });
      });
    }
    return {
      $post,
      $get,
    };
  }
}

/**
 * 设置 请求头部
 * @param {*} xhr
 */
// function setHeader(xhr) {
//   let token = sessionStorage.getItem("token") || "";
//   if (token) {
//     xhr.setRequestHeader("Authorization", `Bearer ${token}`);
//   }
// }
// /**
//  *  请求拦截
//  * @param {*} url
//  * @param {*} params
//  */
// function requestToIntercept(url, params) {
//   return new Promise((res, rej) => {
//     if (typeof url != "string") {
//       rej({ err: "请填写路径" });
//       return;
//     }
//     console.log(
//       `%c 发送 api_${url}`,
//       "background:#1E1E1E;color:#bada55",
//       JSON.parse(JSON.stringify(params))
//     );
//   });
// }

// /**
//  *  响应拦截
//  * @param {*} url
//  * @param {*} params
//  */
// function responseToIntercept(url, params) {
//   return new Promise((res, rej) => {
//     console.log(
//       `%c 发送 api_${url}`,
//       "background:#1E1E1E;color:#bada55",
//       JSON.parse(JSON.stringify(params))
//     );
//   });
// }

// /**
//  *
//  * @param { string } url 请求路径
//  * @param { object } params 请求参数
//  */
// async function _axios(url, params) {
//   url = baseUrl + url;
//   // 请求拦截 -------------
//   await requestToIntercept(url, params);

//   function $post(params) {
//     return new Promise((res, rej) => {
//       $.ajax({
//         type: "POST",
//         url,
//         data: params,
//         beforeSend: setHeader(xhr),
//         //   beforeSend: function (xhr) {
//         //     setHeader(xhr);
//         //   },
//         success: async function (response) {
//           await responseToIntercept;
//           res(response);
//         },
//       });
//     });
//   }
//   function $get(params) {
//     return new Promise((res, rej) => {
//       $.ajax({
//         type: "GET",
//         url,
//         data: params,
//         beforeSend: setHeader(xhr),
//         success: async function (response) {
//           await responseToIntercept;
//           res(response);
//         },
//       });
//     });
//   }
//   return {
//     $post,
//     $get,
//   };
// }
// const axios = _axios();
// module.exports = axios();
