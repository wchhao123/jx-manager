export function url(query) {
  debugger
  if (!query) {
    return ''
  }
  return contractState[query]
}

export const contractState = {
  '/contract_query': '/table/contract/batch'
}
