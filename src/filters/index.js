import * as state from '../common/js/state-dic'

export function filterLength (list) {
  if (list.length > 4) {
    return list.substr(0, 3)
  } else {
    return list
  }
}

/* eslint-disable */

export function  filterAccountAssignState(key) {
  if (!key)
    return ''
  return state.accountAssignStateMap[parseInt(key)]
}

export function filterTaskSettlementType(key){
  if (!key)
    return ''
  return state.taskSettlementType[parseInt(key)]
}

export  function filterBusinessDefaultState(key) {
  if (!key)
    return ''
  return state.businessDefaultState[parseInt(key)]
}

export function filterEntVerifyState (key) {
  if (!key)
    return ''
  return state.entVerifyStateMap[parseInt(key)]
}

export function filterEntSignState (key) {
  if (!key)
    return ''
  return state.entSignStateMap[parseInt(key)]

}

export function filterTradeType (key) {
  if (!key)
    return ''
  return state.typeEntTransfer[parseInt(key)]
}

// 资金托管
export function filterEntMoneyManageAuthState(key) {
  if (!key)
    return ''
  return state.typeEntMoneyManageAuthState[parseInt(key)]
}

// 企业审批状态
export function filterEntAudit (key) {
  if (!key)
    return ''
  return state.typeEntAudit[parseInt(key)]
}
// 企业签约审核审批状态
export function filterEntSignAuditState (key) {
  if (!key)
    return ''
  return state.typeEntSignState[parseInt(key)]
}
// 充值订单 充值方式
export function filterEntRechargeOrderRechargeType(key) {
  if (!key)
    return ''
  return state.typeEntRechargeOrderRechargeType[parseInt(key)]
}

export function filterRechargeOrderChanelTipType(key) {
  if (!key)
    return ''
  return state.typeEntRechargeOrderChanelTipType[parseInt(key)]
}

// 充值订单 充值订单状态
export function filterEntRechargeOrderState (key) {
  if (!key)
    return ''
  return state.typeEntRechargeOrderState[parseInt(key)]
}
// 充值订单 充值订单审批状态
export function filterEntRechargeOrderVerifyState (key) {
  if (!key)
    return ''
  return state.typeEntRechargeOrderVerifyState[parseInt(key)]
}

// 工资批次发放类型
export function filterSalaryType (key) {
  if (!key)
    return ''
  return state.typeSalaryType[parseInt(key)]
}

// 工资批次发放状态
export function filterSalaryState (key) {
  if (!key)
    return ''
  return state.typeSalaryState[parseInt(key)]
}

export function filterTaskState (key) {
  if (!key)
    return ''
  return state.typeTaskState[parseInt(key)]
}

export function filterContractType (key) {
  if (!key)
    return ''
  return state.contractType[parseInt(key)]
}


export function filterContractState (key) {
  if (!key)
    return ''
  return state.contractState[parseInt(key)]
}

export function filterSignBusinessType (key) {
  if (!key)
    return ''
  return state.signBusinessType[parseInt(key)]
}

export function filterSealState (key) {
  if (!key)
    return ''
  return state.sealState[parseInt(key)]
}

export function filterContractSignState (key) {
  if (!key)
    return ''
  return state.contractSignState[parseInt(key)]
}

export function filterBusinessState (key) {
  if (!key)
    return ''
  return state.businessState[parseInt(key)]
}
export function filterExportState (key) {
  if (!key)
    return ''
  return state.exportState[parseInt(key)]
}
//任务状态
export function filterTaskListState (key) {
  if (!key)
    return ''
  return state.typeTaskListState[parseInt(key)]
}
//报名状态
export function filterSignInState (key) {
  if (!key)
    return ''
  return state.signInState[parseInt(key)]
}

export function filterTaskSignUpState(key) {
  if (!key)
    return ''
  return state.taskSignUpState[parseInt(key)]
}
// 工资批次发放状态
export function filterSalaryDetailState (key) {
  if (!key)
    return ''
  return state.typeSalaryDetailState[parseInt(key)]
}

// 用户实名认证状态
export function filterUserVerifyState (key) {
  if (!key)
    return ''
  return state.typeUserVerifyState[parseInt(key)]
}
// 用户激活状态
export function filterUserActiveState (key) {
  if (!key)
    return ''
  return state.typeUserActiveState[parseInt(key)]
}

export function filterUserImageState (key) {
  if (!key)
    return ''
  return state.userImageState[parseInt(key)]
}

//用户业务规则类型
export function filterUserBusinessRuleType (key) {
  if (!key)
    return ''
  return state.typeUserBusinessRule[parseInt(key)]
}
// 用户业务规则状态
export function filterUserBusinessRuleState (key) {
  if (!key)
    return ''
  return state.typeUserBusinessRuleState[parseInt(key)]
}
// 用户交易类型
export function filterUserTradeType (key) {
  if (!key)
    return ''
  return state.typeUserTrade[parseInt(key)]
}
// 用户订单类型
export function filterUserOrderType (key) {
  if (!key)
    return ''
  return state.typeUserOrderType[key.toString()]
}
// 用户订单状态
export function filterUserOrderState (key) {
  if (!key)
    return ''
  return state.typeUserOrderState[key.toString()]
}

// 用户实名认证审核状态
export function filterUserVerifyAuthState(key) {
  if (!key)
    return ''
  return state.typeUserVerifyAuthState[parseInt(key)]
}

// 证件类型
export function filterUserIdNumType(key) {
  if (!key)
    return ''
  return state.typeUserIdType[parseInt(key)]
}


//系统 错误日志类型
export function filterSysteErrorType (key) {
  if (!key)
    return ''
  return state.typeSystemErrorType[key.toString()]
}

// 系统job类型
export function filterSystemJobType (key) {
  if (!key)
    return ''
  return state.typeSystemJobState[key.toString()]
}

// JF开放平台流水类型
export function filterJFFlowType (key) {
  if (!key)
    return ''
  return state.typeJFFlowType[key.toString()]
}
// 企业目录级别
export function filterResourceLevel (key) {
  if (!key)
    return ''
  return state.typeResourceLevel[key.toString()]
}
// 企业目录类型
export function filterEntMenuType (key) {
  if (!key)
    return ''
  return state.typeAuthority[key.toString()]
}
// 角色状态
export function filterAdminRoleType (key) {
  if (!key)
    return ''
  return state.typeAdminRole[key.toString()]
}
//  管理员在职状态
export function filterAdminJobStateType (key) {
  if (!key)
    return ''
  return state.typeAdminJobState[key.toString()]
}

export function filterEmpty (val) {

  if (val === undefined || val === '' || val === null) {
    return null
  } else {
    return val
  }

}

const Y_M = 'YYYY-MM'
const Y_M_D = 'YYYY-MM-DD'
const Y_M_D_H_M_S = 'YYYY-MM-DD-HH-MM-SS'

export function filterdateYMDHMS (timestamp) {

  return _formatData(timestamp, Y_M_D_H_M_S)
}

export function filterDateYYYYMM (timestamp) {
  return _formatData(timestamp, Y_M)
}

export function filterDateYYYYMMDD (timestamp) {
  return _formatData(timestamp, Y_M_D)
}

function _formatData (timestamp, format) {
  if (timestamp === undefined || timestamp === null) {
    return ''
  }
  if (timestamp === 0) return '不限'
  var date = new Date(timestamp)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second

  if (filterEmpty(format) === null || format === Y_M_D_H_M_S) {
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
  } else if (format === Y_M_D) {
    return y + '-' + m + '-' + d
  } else if (format === Y_M) {
    return y + '-' + m
  } else {
    return ''
  }
}

export function filterF2Y (val) {
  var str = (val/100).toFixed(2) + '';
  var intSum = str.substring(0,str.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
  var dot = str.substring(str.length,str.indexOf("."))//取到小数部分
  var ret = intSum + dot;
  return ret
}

// 字典管理的状态下拉框数据渲染
export function filterUsers (list) {
  // console.log(sessionStorage.getItem("cun"));
  var ff = JSON.parse(sessionStorage.getItem('cun'))
  // alert(JSON.stringify(ff.data));
  for (var i = 0; i < ff.data.data.length; i++) {
    if (ff.data.data[i][list]) {
      // console.log(ff.data.data[i][list]);
      var map = ff.data.data[i][list]
      var arr = []
      for (var key in map) {
        arr.push({value: key, label: map[key]})
      }
      return arr
    }
  }
}

export function filterButton (pam, btn) {
  // alert(JSON.stringify(pam))
  if (pam.length > 0) {
    for (let i = 0; i < pam.length; i++) {
      if (pam[i].alias === btn) {
        return true
      }
    }
  } else {
    return false
  }
}

/* 实时搜索过滤器 */
export function filterSearchFor (value, searchString) {
  var result = []
  if (!searchString) {
    return value
  }
  searchString = searchString.trim().toLowerCase()

  for (let i = 0; i < value.length; i++) {
    if (value[i].merchName.toLowerCase().indexOf(searchString) !== -1) {
      // alert(JSON.stringify(item))
      result.push(value[i])
    }
  }

  return result
}

export function filterUserTypes (val, type) {
  const ee = JSON.parse(sessionStorage.getItem('cun'))
  // var UserData = JSON.stringify(ee.data.data);
  for (var i = 0; i < ee.data.data.length; i++) {
    if (ee.data.data[i][type]) {
      // console.log(ee.data.data[i][type]);
      if (ee.data.data[i][type]) {
        return ee.data.data[i][type][val]
      } else {
        return ''
      }
    }
  }
}

export function filterTemplateNum (val, type) {
  if (val == null) {
    val = '0'
    return val
  } else {
    return val
  }
}

export function filterTemplateString (val, type) {
  if (!val) {
    return ''
  }
  if (isNaN(val)) {
    return ''
  }
  if (val == null) {
    return ''
  }
  return val
}

/* 判断equal方法 */
export function filterEqual (a, b) {
  // 如果a和b本来就全等
  if (a === b) {
    // 判断是否为0和-0
    return a !== 0 || 1 / a === 1 / b
  }
  // 判断是否为null和undefined
  if (a == null || b == null) {
    return a === b
  }
  // 接下来判断a和b的数据类型
  var classNameA = toString.call(a)
  var classNameB = toString.call(b)
  // 如果数据类型不相等，则返回false
  if (classNameA !== classNameB) {
    return false
  }
  // 如果数据类型相等，再根据不同数据类型分别判断
  switch (classNameA) {
    case '[object RegExp]':
    case '[object String]':
      // 进行字符串转换比较
      return '' + a === '' + b
    case '[object Number]':
      // 进行数字转换比较,判断是否为NaN
      if (+a !== +a) {
        return +b !== +b
      }
      // 判断是否为0或-0
      return +a === 0 ? 1 / +a === 1 / b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
  }
  // 如果是对象类型
  if (classNameA === '[object Object]') {
    // 获取a和b的属性长度
    var propsA = Object.getOwnPropertyNames(a),
      propsB = Object.getOwnPropertyNames(b)
    if (propsA.length <= 1) {
      return true
    } else if (propsA.length !== propsB.length) {
      return false
    }
    for (var i = 0; i < propsA.length; i++) {
      var propName = propsA[i]
      // 如果对应属性对应值不相等，则返回false
      if (a[propName] !== b[propName]) {
        // alert(6)
        return false
      }
    }
    return true
  }
  // 如果是数组类型
  if (classNameA === '[object Array]') {
    if (a.toString() === b.toString()) {
      return true
    }
    return false
  }
}

/* 保留六位小数过滤器 */
export function filterDecimalSix (x) {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return false
  }
  var f1 = Math.floor(x * 1000000) / 1000000

  return f1
}

/* 保留两位小数过滤器 */
export function filterDecimal (x) {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return false
  }
  var f1 = Math.round(x * 100) / 100
  var s = f1.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}

/* 保留一位小数过滤器 */
export function filterNumberone (x) {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return false
  }
  var f1 = Math.round(x * 100) / 100
  var s = f1.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 1) {
    s += '0'
  }
  return s
}

/* 时间过滤器 */
export function parseTime (time, cFormat) {
  if (time == null) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/* 时间过滤器 2 */
export function formatDate (time) {
  if (time == null) {
    return null
  } else if (time.length === 14) {
    return time.substring(0, 4)
      + '-' + time.substring(4, 6)
      + '-' + time.substring(6, 8)
      + '/' + time.substring(8, 10)
      + ':' + time.substring(10, 12)
      + ':' + time.substring(12, 14)
  } else if (time.length == 8) {
    return time.substring(0, 4)
      + '-' + time.substring(4, 6)
      + '-' + time.substring(6, 8)
  } else if (time.length == 6) {
    return time.substring(0, 2)
      + ':' + time.substring(2, 4)
      + ':' + time.substring(4, 6)
  } else {
    return time
  }
}

/* 时间过滤器 3 */
export function formatNewDate (time) {
  if (time == null) {
    return null
  } else {
    return time.substring(0, time.length - 2)
  }
}

/* 时间过滤器4 */
export function formatDateFour (time) {
  if (time == null) {
    return null
  } else {
    return time.substring(0, time.length - 10)
  }
}

/* 千分位 金额过滤器 */
export function filterMoney (val) {
  if (val == null) {
    val = '0'
    return val
  }
  val = val.toString().replace(/\$|\,/g, '')

  let sign = (val == (val = Math.abs(val)))
  val = Math.floor(val + 0.50000000001)
  let cents = val % 100
  val = Math.floor(val / 100).toString()
  if (cents < 10) {
    cents = '0' + cents
  }
  for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3))
  }

  return (((sign) ? '' : '-') + val + '.' + cents)
  // return isNaN(val) ? 0.00 : parseFloat((val/100).toFixed(2));
}

/* 普通 金额过滤器 */
export function filterMoney_normal (val) {
  if (val == null) {
    val = '0'
    return val
  }
  val = val.toString().replace(/\$|\,/g, '')

  let sign = (val === (val = Math.abs(val)))
  val = Math.floor(val + 0.50000000001)
  let cents = val % 100
  val = Math.floor(val / 100).toString()
  if (cents < 10) {
    cents = '0' + cents
  }
  for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val = val.substring(0, val.length - (4 * i + 3)) + '' + val.substring(val.length - (4 * i + 3))
  }

  return (((sign) ? '' : '-') + val + '.' + cents)
  // return isNaN(val) ? 0.00 : parseFloat((val/100).toFixed(2));

}

// 加法精度过滤器
export function filterFloatAdd (arg1, arg2) {
  var r1, r2, m
  try {r1 = arg1.toString().split('.')[1].length} catch (e) {r1 = 0}
  try {r2 = arg2.toString().split('.')[1].length} catch (e) {r2 = 0}
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

// 减法精度过滤器
export function filterAccSub (arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

// 乘法精度过滤器
export function filterFloatMul (arg1, arg2) {
  if (arg1 == null) {
    return 0
  }
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 除法精度过滤器
export function filterFloatDiv (a, b) {
  if (a == null) {
    return 0
  }
  var c, d, e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), filterFloatMul(c / d, Math.pow(10, f - e))
}

// 检测手机号
export const checkMobiles = (m) => {
  if (!m || !/^1[3-9][0-9]{9}$/.test(m)) {
    return false
  } else return true
}

// 金额转大写
export function filterMoneyCapital (n) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
    return ''
  var unit = '仟佰拾亿仟佰拾万仟佰拾元角分',
    str = ''
  n += '00'
  var p = n.indexOf('.')
  if (p >= 0) {
    n = n.substring(0, p) + n.substr(p + 1, 2)
  }
  unit = unit.substr(unit.length - n.length)
  for (var i = 0; i < n.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
  }
  return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整')
}



