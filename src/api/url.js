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
  '/auth_add_all': '/ent/business/addall', //业务权限
  '/update_business': '/ent/business/update', //修改业务权限
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
  '/user_clear_export': '/user/account/clearingexport', //用户流水导出
  '/get_contract_info': '/table/contract/getcontractinfo', //上上签查询合同信息
  '/get_business_ids': '/table/salary/getbusinessids',
  '/get_account_assign': '/table/salary/getaccountassign', //开放平台查询账户分配信息
  '/get_task_contract': '/table/task/get/taskandcontract',
  '/export_task_contract': '/table/task/export/taskandcontract',
  '/rollback_contract': '/table/task/rollback/contract',
  '/send_task_contract': '/table/task/sendtaskcontract'
}
