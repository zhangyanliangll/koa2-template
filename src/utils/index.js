/**
 *
 * @description 全局工具函数
 * @author 张燕良
 */

// require("./utils.js");

/**
 *  重定向
 * @param { String } 路径
 * @param { Object|String } 数据
 */
function redirect(url, data) {
  if (!url) {
    return;
  }
  if (data && typeof data == "string") {
    url += `?${data}`;
  }
  if (data && Object.prototype.toString.call(data) === "[object Object]") {
    url += `?${jsonSort(data)}`;
  }
  window.location.href = url;
}

/**
 * 判断机型 是否是ios
 */
function isIOS() {
  let u = navigator.userAgent;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return isIOS;
}

/**
 * 精度 计算
 */
function P() {
  /*
   * 判断obj是否为一个整数
   */
  function isInteger(obj) {
    return Math.floor(obj) === obj;
  }

  /*
   * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
   * @param floatNum {number} 小数
   * @return {object}
   *   {times:100, num: 314}
   */
  function toInteger(floatNum) {
    let ret = { times: 1, num: 0 };
    let isNegative = floatNum < 0;
    if (isInteger(floatNum)) {
      ret.num = floatNum;
      return ret;
    }
    let strfi = floatNum + "";
    let dotPos = strfi.indexOf(".");
    let len = strfi.substr(dotPos + 1).length;
    let times = Math.pow(10, len);
    let intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
    ret.times = times;
    if (isNegative) {
      intNum = -intNum;
    }
    ret.num = intNum;
    return ret;
  }

  /**
   * 核心方法，实现加减乘除运算，确保不丢失精度
   * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
   *
   * @param a {number} 运算数1
   * @param b {number} 运算数2
   * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
   *
   */
  function operation(a, b, op) {
    let o1 = toInteger(a);
    let o2 = toInteger(b);
    let n1 = o1.num;
    let n2 = o2.num;
    let t1 = o1.times;
    let t2 = o2.times;
    let max = t1 > t2 ? t1 : t2;
    let result = null;
    switch (op) {
      case "add":
        if (t1 === t2) {
          // 两个小数位数相同
          result = n1 + n2;
        } else if (t1 > t2) {
          // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2);
        } else {
          // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2;
        }
        return result / max;
      case "subtract":
        if (t1 === t2) {
          result = n1 - n2;
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2);
        } else {
          result = n1 * (t2 / t1) - n2;
        }
        return result / max;
      case "multiply":
        result = (n1 * n2) / (t1 * t2);
        return result;
      case "divide":
        result = (n1 / n2) * (t2 / t1);
        return result;
    }
  }

  function add(a, b) {
    return operation(a, b, "add");
  }
  function subtract(a, b, digits) {
    return operation(a, b, "subtract").toFixed(digits);
  }
  function multiply(a, b) {
    return operation(a, b, "multiply");
  }
  function divide(a, b, digits) {
    return operation(a, b, "divide").toFixed(digits);
  }

  // exports
  return {
    add,
    subtract,
    multiply,
    divide,
  };
}
