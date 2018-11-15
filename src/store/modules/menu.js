import * as Api from 'api'
import * as VuexType from '../types'

const state = {
  btns: []
}

const actions = {
  getBtn({commit}) {
    Api.getMenuBtns().then(resp => {
      if (resp.data.code === Api.ERR_OK) {
        commit(VuexType.SAVE_BUTTON, resp.data.data)
      }
    })
  }
}

const mutations = {
  [VuexType.SAVE_BUTTON]: (state, btns) => {
    state.btns = btns
  }
}

export default {
  state,
  actions,
  mutations
}
