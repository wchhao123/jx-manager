export function url(query) {
  if (!query) {
    return '/jx/action/login'
  }
  return contractState[query]
}

export const contractState = {
  '/contract_query': '/table/contract/batch', //合同管理
  '/contract_sign': '/table/contract/sign',
  '/contract_export': '/table/contract/export', //合同导出
  '/contract_check': '/table/contract/exportcheck',
  '/contract_add': '/table/contract/add', //添加模板
  '/contract_update': '/table/contract/update', //添加模板
  '/salary_ent': '/ent/info/getlist',
  '/sign_subject': '/table/cooperate/get', //获取运营主体
  '/sign_add': '/table/cooperate/add',
  '/sign_update': '/table/cooperate/update',
  '/sign_simple': '/table/cooperate/getsimple',
  '/business_type': '/ent/business/get',
  '/auth_add': '/ent/business/add', //业务权限
  '/auth_get': '/ent/get/all/ent/business',
  '/auth_update': '/ent/business/open/again'
}
