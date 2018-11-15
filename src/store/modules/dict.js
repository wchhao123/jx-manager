import * as types from '../types'

const state = {
  DATA: {
    USER_ACTIVE: {
      '0': '未激活',
      '1': '已激活'
    }
  }
}

const mutations = {
  [types.INIT_USER_TYPE] (state, {type}) {
  }
}

export default {
  state,
  mutations
}
