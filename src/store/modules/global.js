import * as Api from 'api'
import * as vuexTypes from '../types'

const state = {
  provinces: [],
  salaryEnts: []
}
const mutations = {
  [vuexTypes.SAVE_PROVINCE]: (state, obj) => {
    state.provinces = obj.provinces
  },
  [vuexTypes.SAVE_SALARY_ENTS]: (state, obj) => {
    state.salaryEnts = obj.salaryEnts
  }
}
const actions = {
  getProvinces({commit}) {
    Api.getProvinces({}).then(response => {
      if (response.data.code === Api.ERR_OK) {
        commit(vuexTypes.SAVE_PROVINCE, {provinces: response.data.data})
      }
    })
  },
  getSalaryEnts({commit}) {
    Api.getSalaryEnt().then(res => {
      commit(vuexTypes.SAVE_SALARY_ENTS, {salaryEnts: res.data.data})
    })
  }
}

export default {
  state,
  mutations,
  actions
}
