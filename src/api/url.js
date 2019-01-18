export function url(query) {
  if (!query) {
    return '/jx/action/login'
  }
  return contractState[query]
}

export const contractState = {
  '/contract_query': '/table/contract/batch', //合同管理
  '/contract_sign': '/table/contract/sign',
  '/contract_export': '/table/contract/exportext', //合同导出
  '/contract_check': '/table/contract/exportcheck',
  '/contract_add': '/table/contract/add', //添加模板
  '/contract_update': '/table/contract/update', //添加模板
  '/salary_ent': '/ent/info/getlist', //发薪单位列表
  '/sign_subject': '/table/cooperate/get', //获取运营主体
  '/sign_add': '/table/cooperate/add',
  '/sign_update': '/table/cooperate/update',
  '/sign_simple': '/table/cooperate/getsimple',
  '/business_type': '/ent/business/get', //获取业务权限类型
  '/auth_add': '/ent/business/add', //业务权限
  '/auth_get': '/ent/get/all/ent/business',
  '/auth_update': '/ent/business/open/again', //更新企业权限
  '/user_image': '/user/info/exportimage', // 下载用户身份证图片
  '/download_list': '/jx/common/downloadlist', //下载中心
  '/download': '/jx/common/download', //下载文件
  '/sales_list': '/ent/get/sale/reparent', //销售代表
  '/task_detail': '/table/task/get/taskinfo', //任务详情
  '/ent_sign': '/ent/sign/tosign', //签约审核
  '/ent_clear_export': '/ent/balance/getclearexport', //企业交易流水导出
  '/sign_in_export': '/table/task/signinexport', //用户报名信息导出
  '/user_clear_export': '/user/account/clearingexport' //用户流水导出
}
