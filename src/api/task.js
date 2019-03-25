import fetch from '../utils/fetch'
import { http } from './enterprise'
// 获取企业任务批次
export function getEntTaskList (param) {
  return fetch({
    url: http.prefix + '/table/salary/record/salaryinfo',
    method: http.post,
    params: param
  })
}

// 获取企业发薪批次
export function getTaskDetailList (param) {
  return fetch({
    url: http.prefix + '/table/salary/record/salarydetail',
    method: http.post,
    params: param
  })
}

// 获取企业发薪批次
export function getSignInList (param) {
  return fetch({
    url: http.prefix + '/table/task/signin',
    method: http.post,
    params: param
  })
}

// 获取企业发薪批次
export function getTaskList (param) {
  return fetch({
    url: http.prefix + '/table/task/tasklist',
    method: http.post,
    params: param
  })
}

export function getTaskCheckList (param) {
  return fetch({
    url: http.prefix + '/table/task/checklist',
    method: http.post,
    params: param
  })
}
export function getTaskDeliveryList (param) {
  return fetch({
    url: http.prefix + '/table/task/gettaskenclosure',
    method: http.post,
    params: param
  })
}
  // 获取用户履历/table/task
export function getUserResume (param) {
    return fetch({
      url: http.prefix + '/table/task/userinfo',
      method: http.post,
      params: param
    })
}
 export function getTaskExport (param) {
    return fetch({
      url: http.prefix + '/table/task/export',
      method: http.post,
      params: param,
      responseType: http.responseType.arraybuffer
    })
}

export function getTaskDetailExport (param) {
  return fetch({
    url: http.prefix + '/table/task/detailexport',
    method: http.post,
    params: param,
    responseType: http.responseType.arraybuffer
  })
}
