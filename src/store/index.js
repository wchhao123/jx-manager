import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import getters from './getters'
import user from './modules/user'
import dict from './modules/dict'
import global from './modules/global'
import menu from './modules/menu'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user: user,
    menu: menu,
    global: global,
    dict: dict
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
