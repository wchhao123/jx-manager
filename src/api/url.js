export function url(query) {
  if (!query) {
    return '/jx/action/login'
  }
  return contractState[query]
}

export const contractState = {
  '/contract_query': '/table/contract/batch', //合同管理
  '/contract_sign': '/table/contract/sign',
  '/contract_export': '/table/contract/export' ,//合同导出
  '/contract_add': '/table/contract/add'   //添加模板
}
