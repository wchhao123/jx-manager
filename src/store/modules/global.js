import * as Api from 'api'
import * as vuexTypes from '../types'
import {post} from '../../utils/fetch'
import {url} from '../../api/url'
const state = {
  provinces: [],
  salaryEnts: [],
  businessType: [],
  cooperateEntName: [],
  salesList: []
}
const mutations = {
  [vuexTypes.SAVE_PROVINCE]: (state, obj) => {
    state.provinces = obj.provinces
  },
  [vuexTypes.SAVE_SALARY_ENTS]: (state, obj) => {
    state.salaryEnts = obj.salaryEnts
  },
  [vuexTypes.BUSINESS_TYPE]: (state, obj) => {
    state.businessType = obj.businessType
  },
  [vuexTypes.COOPERATE_ENT_NAME]: (state, obj) => {
    state.cooperateEntName = obj.cooperateEntName
  },
  [vuexTypes.SALES_LIST]: (state, obj) => {
    state.salesList = obj.salesList
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
  },
  getBusinessType({commit}, businessName) {
    post(url('/business_type'), {businessName: businessName}).then(res => {
      let array = {}
      res.data.forEach((item, index, arr) => {
        array[item.businessType] = item.businessName
      })
      commit(vuexTypes.BUSINESS_TYPE, {businessType: array})
    })
  },
  getSalesList({commit}, saleName) {
    post(url('/sales_list'), {saleName: saleName}).then(res => {
      let array = {}
      res.data.forEach((item, index, arr) => {
        array[item.sales_id] = item.sales_name
      })
      commit(vuexTypes.SALES_LIST, {salesList: array})
    })
  },
  getCooperateEntName({commit}, cooperateEntName) {
    post(url('/sign_simple'), {cooperateEntName: cooperateEntName}).then(res => {
      let array = {}
      res.data.forEach((item, index, arr) => {
        debugger
        array[item.cooperateEntId] = item.cooperateEntName
      })
      commit(vuexTypes.COOPERATE_ENT_NAME, {cooperateEntName: array})
    })
  }
}

export default {
  state,
  mutations,
  actions
}
