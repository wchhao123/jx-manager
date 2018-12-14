// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import EntSelect from 'components/select/EntSelect'
import * as state from 'common/js/state-dic'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import {post, excel, get} from './utils/fetch'
import {url} from 'api/url'
import router from './routers'
import jsencrypt from 'jsencrypt'
import store from './store'
import 'babel-polyfill'
import 'common/stylus/index.styl'
import * as filter from './filters'

Vue.prototype.$axios = axios
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$export = excel
Vue.prototype.$encrypt = jsencrypt
Vue.prototype.$url = url
Vue.prototype.$state = state
Vue.prototype.$filter = filter

//全局select
Vue.component('ent-select', EntSelect)

// 全局过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = sessionStorage.getItem('access_token')
    if (token !== null && token.toString().length > 1) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  //判断cookie 有Authorization吗
  //Authorization有值吗
  //都有 刷新页面 直接跳转 只登陆后的页面
//没有跳转 登陆页面 让操作人登陆啊

  // var name = 'Authorization='
  // var ca = document.cookie.split(';')
  // var authorization = ''
  // for (var i = 0; i < ca.length; i++) {
  //   var c = ca[i]
  //   while (c.charAt(0) === ' ') c = c.substring(1)
  //   if (c.indexOf(name) !== -1) {
  //     authorization = c.substring(name.length, c.length)
  //   }
  // }
  // if (store.getters.token || authorization) {
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
