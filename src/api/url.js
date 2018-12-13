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
  '/contract_add': '/table/contract/add', //添加模板
  '/contract_update': '/table/contract/update', //添加模板
  '/salary_ent': '/ent/info/getlist',
  '/sign_subject': '/table/cooperate/get' //获取运营主体
}
