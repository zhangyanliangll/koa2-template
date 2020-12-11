/**
 * @desc 对象Key排序并生成key=value&
 * @param {Object} jsonObj 排序对象
 * @param {Boolean} isSort 是否排序
 */
function jsonSort(jsonObj, isSort = true) {
  let arr = [];
  for (let key in jsonObj) {
    if (jsonObj.hasOwnProperty(key)) arr.push(key);
  }
  isSort && arr.sort();
  let str = "";
  for (let i in arr) {
    // 过滤掉 Array.prototype.xxx进去的字段
    if (arr.hasOwnProperty(i)) {
      let value = "";
      if (
        Object.prototype.toString.call(jsonObj[arr[i]]) === "[object Object]"
      ) {
        value = JSON.stringify(jsonObj[arr[i]]);
      } else {
        value = jsonObj[arr[i]];
      }
      str += arr[i] + "=" + value + "&";
    }
  }
  return str.substr(0, str.length - 1);
}
