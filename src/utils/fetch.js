import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import router from '../routers'
import { ERR_OK, http } from '../api/index'
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://192.168.68.84:7088/',
})
// const router = new VueRouter({})
export function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    service({
      url: http.prefix + url,
      method: http.post,
      params: params
    }).then(response => {
      if (response.data.code === 'warn') {
          Message({
            message: response.data.msg,
            type: 'warning',
            duration: 3 * 1000,
            center: true
          })
          reject(response.data.msg)
        } else if (ERR_OK !== response.data.code) {
          Message({
            message: response.data.msg,
            type: 'error',
            duration: 3 * 1000,
            center: true
          })
          reject(response.data.msg)
        }
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
export function excel (url, data) {
  return new Promise((resolve, reject) => {
    service({
      url: http.prefix + url,
      method: http.post,
      params: data,
      responseType: 'arraybuffer'
    }).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
export function get(url, data) {
  return new Promise((resolve, reject) => {
    axios.get(http.prefix + url, {
      params: data
    }).then(response => {
      if (ERR_OK !== response.data.code) {
        Message({
          message: response.data.msg,
          type: 'error',
          duration: 5 * 1000,
          center: true
        })
        reject(response.data.msg)
      }
      }).catch(err => {
        reject(err)
      })
  })
}
// request拦截器
service.interceptors.request.use(config => {
  if (config.url.indexOf('/login') !== -1) {
    return config
  }
  let token = sessionStorage.getItem('access_token')
  if (token !== null && token.toString().length > 1) {
    config.headers['Authorization-manage'] = token
  } else {
    router.replace('/login')
  }

  console.log('过滤请求参数')
  let _newPar = {}
  for (let key in config.params) {
    //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
    if ((config.params[key] === 0 || config.params[key]) && config.params[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
      //记录属性
      _newPar[key] = config.params[key]
    }
  }
  config.params = _newPar
  let _newData = {}
  for (let key in config.data) {
    //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
    if ((config.data[key] === 0 || config.data[key]) && config.data[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
      //记录属性
      _newData[key] = config.data[key]
    }
  }
  config.data = _newData
  return config
}, error => {
  // Do something with request error
  // console.log(error); // for debug
  return Promise.reject(error)
})

// // respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // alert(JSON.stringify(error.response))
      // Message({
      //   message: '报错了:' + error.response.data.msg,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      switch (parseInt(error.response.status)) {
        case 400:
          Message({
            message: '请求参数有误！',
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(error)
        case 401:
          store.commit('logout')
          // 返回 401 清除token信息并跳转到登录页面
          Message({
            message: error.response.data.msg,
            type: 'error',
            duration: 5 * 1000,
            center: true
          })
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
        case 405:
          Message({
            message: error.response.data.msg,
            type: 'error',
            duration: 5 * 1000,
            center: true
          })
          return Promise.reject(error)
        case 404:
          Message({
            message: '该页面不存在！',
            type: 'error',
            duration: 5 * 1000,
            center: true
          })
          return Promise.reject(error)
        case 500:
          Message({
            message: '500！',
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(error)
        case 502:
          Message({
            message: 'Bad GateWay！',
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(error)
        // router.replace({path: '/login',})
      }
    }
    return Promise.reject(error)
  }
)

export default service
