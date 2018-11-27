import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import router from '../routers'
export const http = {
  prefix: '/jx-manage',
  post: 'post',
  get: 'get',
  responseType: {
    arraybuffer: 'arraybuffer'
  }
}
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://192.168.68.84:7088/',
})
// const router = new VueRouter({})
export function post (url, data) {
  return new Promise((resolve, reject) => {
    service.post(http.prefix + url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
  /*return service({
    url: http.prefix + url,
    method: http.post,
    params: data
  })*/
}
// request拦截器
service.interceptors.request.use(config => {
  debugger
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
  return config
}, error => {
  // Do something with request error
  // console.log(error); // for debug
  return Promise.reject(error)
})

// // respone拦截器
service.interceptors.response.use(
  response => {
    debugger
    return response
  },
  error => {
    debugger
    if (error.response) {
      // alert(JSON.stringify(error.response))
      // Message({
      //   message: '报错了:' + error.response.data.msg,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      switch (parseInt(error.response.status)) {
        case 401:
          store.commit('logout')
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
        case 405:
          Message({
            message: error.response.data.msg,
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(error)
        case 404:
          Message({
            message: '该页面不存在！',
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
