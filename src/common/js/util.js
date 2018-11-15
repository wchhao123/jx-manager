
export function isArray (value) {
  if (Array.isArray) {
    return Array.isArray(value)
  } else {
    if (Object.prototype.toString.call(value) === '[object Array]') {
      return true
    }
    return false
  }
}

// ["123","333"] => 123,333   字符串数组转 ,分割的数字字符串
export function utilStringArray2NumString (array) {
  if (!isArray(array)) {
    console.log(`${array} 不是数组`)
    return ''
  }
  let num = ''
  array.forEach((item) => {
    num = num + parseInt(item) + ','
  })
  return num.length > 1 ? num.substring(0, num.length - 1) : ''
}

// 将list转换为 下拉框数据源
export function utilList2SelectResource (list) {
  let arry = []
  if (!isArray(list)) {
    return arry
  }
  list.forEach((item) => {
    for (var k in item) {
      arry.push({key: k, value: item[k]})
    }
  })
  return arry
}
