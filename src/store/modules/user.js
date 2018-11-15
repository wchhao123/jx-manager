import * as Api from 'api'
import * as vuexTypes from '../types'
import router from '../../routers'
import storage from '../storage'
import store from '../index'

const state = {
  login_state: false,
  token: '',
  user: {}
}

const actions = {
  login ({commit}, {mobile, password, thiss}) {
    Api.loginByMobile(mobile, password).then(response => {
      console.log(response)
      if (response.data.code === '0000') {
        sessionStorage.access_token = response.data.token.access_token
        // 保存token
        commit(vuexTypes.SET_TOKEN, {
          token: response.data.token.access_token
        })

        // 保存用户登录信息
        commit(vuexTypes.SAVE_USER, {
          user: response.data.data
        })
        // sessionStorage.user = JSON.stringify(response.data.data)
        storage.user = JSON.stringify(response.data.data)
        store.dispatch('getBtn')
        let redirect = thiss.$route.query.redirect
        if (redirect !== undefined && redirect.indexOf('http') !== -1) {
          router.push(redirect)
        } else {
          router.push('/')
        }
      } else {
        thiss.$message({message: response.data.msg, type: 'error'})
      }
      /*eslint handle-callback-err: "error"*/
    })
  },
  logout({commit}) {
    commit(vuexTypes.SET_TOKEN, '')
    commit(vuexTypes.SAVE_USER, '')
    sessionStorage.removeItem('access_token')
    Api.logOut()
    router.push('/login')
  }
}

const mutations = {
  [vuexTypes.SET_TOKEN]: (state, obj) => {
    state.token = obj.token
  },
  [vuexTypes.SAVE_USER]: (state, obj) => {
    state.user = obj.user
  }
}

export default {
  state,
  actions,
  mutations
}
