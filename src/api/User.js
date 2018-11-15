import fetch from '../utils/fetch'
import { http } from './enterprise'
// 用户模块接口
export function getUserInfo (param) {
  return fetch({
    url: http.prefix + '/user/info/getinfo',
    method: 'get',
    params: param
  })
}

// 导出用户信息
export function exportUserInfo (param) {
  return fetch({
    url: http.prefix + '/user/info/exportinfo',
    method: http.post,
    params: param,
    responseType: 'arraybuffer'
  })
}

export function getUserJoinEnt (param) {
  return fetch({
    url: http.prefix + '/user/info/getjoinent',
    method: 'get',
    params: param
  })
}
// 编辑用户信息
export function editUserInfo (param) {
  return fetch({
    url: http.prefix + '/user/info/updateinfo',
    method: http.post,
    params: param
  })
}

// 用户补发短信
export function sendAgain (param) {
  return fetch({
    url: http.prefix + '/user/message/sendagain',
    method: http.get,
    params: param
  })
}

// 获取业务规则
export function getBusinessRules (param) {
  return fetch({
    url: http.prefix + '/user/account/getrule',
    method: http.post,
    params: param
  })
}

// 新增业务规则
export function addBusinessRule (param) {
  return fetch({
    url: http.prefix + '/user/account/addrule',
    method: http.post,
    params: param
  })
}

// 更新业务规则
export function updateBusinessRule (param) {
  return fetch({
    url: http.prefix + '/user/account/updaterule',
    method: http.post,
    params: param
  })
}

// 用户交易明细
export function getUserTrade (param) {
  return fetch({
    url: http.prefix + '/user/account/clearing',
    method: http.post,
    params: param
  })
}
// 用户余额查询
export function getUserBalance (param) {
  return fetch({
    url: http.prefix + '/user/account/getbalance',
    method: http.post,
    params: param
  })
}

// 用户订单查询
export function getUserOrder (param) {
  return fetch({
    url: http.prefix + '/user/order/getsimple',
    method: http.post,
    params: param
  })
}

// 用户订单详情查询
export function getUserOrderDetail (param) {
  return fetch({
    url: http.prefix + '/user/order/getdetail',
    method: http.post,
    params: param
  })
}

// 导出用户订单信息
export function exportUserOrder (param) {
  return fetch({
    url: http.prefix + '/user/withdraw/exportrecord',
    method: http.post,
    params: param,
    responseType: 'arraybuffer'
  })
}

// 用户实名认证信息列表
export function getUserVerifyInfoList(param) {
  return fetch({
    url: http.prefix + '/user/verifyinfo/getallinfo',
    method: http.post,
    params: param
  })
}

// 获取个人实名认证详情
export function getUserVerifyDetail(param) {
  return fetch({
    url: http.prefix + '/user/verifyinfo/getinfo',
    method: http.post,
    params: param
  })
}

// 个人实名认证审批
export function doUserRealNameVerify(param) {
  return fetch({
    url: http.prefix + '/user/verifyinfo/verify',
    method: http.post,
    params: param
  })
}
