import fetch from '../utils/fetch'
import { http } from './enterprise'

// 获取省级地址
export function getProvinces (para) {
  return fetch({
    url: http.prefix + '/jx/common/provinces',
    method: 'get',
    params: para
  })
}

// 获取市级地址
export function getCities (para) {
  return fetch({
    url: http.prefix + '/jx/common/citys',
    method: 'get',
    params: para
  })
}
