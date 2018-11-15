import fetch from '../utils/fetch'
import { http } from './enterprise'

export function loginByMobile (mobile, password) {
  const data = {
    mobile,
    password
  }
  return fetch({
    url: http.prefix + '/jx/action/login',
    method: 'post',
    params: data
  })
}

export function changeAdminPassword (param) {
  return fetch({
    url: http.prefix + '/jx/action/changepassword',
    method: 'post',
    params: param
  })
}

export function logOut (param) {
  return fetch({
    url: http.prefix + '/jx/action/logout',
    method: 'post',
    params: param
  })
}

export function getCheckCode (pam) {
  return new Promise((resolve, reject) => {
    let flag = 1
    if (flag) {
      resolve(
        {
          'data': {
            'data': {
              'isOk': 'ok'
            },
            'code': '0000',
            'msg': 'success'
          }
        })
    } else {
      reject({
        'error': ''
      })
    }
  })
  // return fetch({
  //   url: '/joc-api/checkcode',
  //   method: 'post',
  //   params: pam
  // })
}

export function getCaptchaCode (pam) {
  return fetch({
    url: '/joc-api/getcode',
    method: 'post',
    params: pam
  })
}
