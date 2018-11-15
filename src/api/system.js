import fetch from '../utils/fetch'
import { http } from './enterprise'

export function getMenus (param) {
  return fetch({
    url: http.prefix + '/jx/common/getmenu',
    method: http.get,
    params: param
  })
}

// 获取该用户下所有的按钮
export function getMenuBtns (param) {
  return fetch({
    url: http.prefix + '/jx/common/getbutton',
    method: http.get,
    params: param
  })
}

export function refreshEntMenuCache(param) {
  return fetch({
    url: http.prefix + '/cache/auth/refresh',
    method: http.get,
    params: param
  })
}

export function refreshMsCache(param) {
  return fetch({
    url: http.prefix + '/cache/key/refresh',
    method: http.get,
    params: param
  })
}

// 获取管理员信息
export function getAdminInfo (para) {
  return fetch({
    url: http.prefix + '/admin/child/getinfo',
    method: http.get,
    params: para
  })
} ;

// 获取管理员信息详情
export function getAdminDetail (para) {
  return fetch({
    url: http.prefix + '/admin/child/infodetail',
    method: http.get,
    params: para
  })
} ;

// 添加管理员信息
export function addAdminInfo (para) {
  return fetch({
    url: http.prefix + '/admin/child/addinfo',
    method: http.post,
    params: para
  })
} ;

// 更新管理员信息
export function updateAdminInfo (para) {
  return fetch({
    url: http.prefix + '/admin/child/updateinfo',
    method: http.post,
    params: para
  })
} ;

// 删除管理员信息
export function deleteAdminInfo (para) {
  return fetch({
    url: http.prefix + '/admin/child/delinfo',
    method: http.get,
    params: para
  })
} ;

// 修改管理员密码
export function updateAdminPwd (para) {
  return fetch({
    url: http.prefix + '/admin/child/changepwd',
    method: http.post,
    params: para
  })
} ;

// 获取角色下拉列表
export function getAdminRoleSelectList (para) {
  return fetch({
    url: http.prefix + '/admin/role/getlist',
    method: http.get,
    params: para
  })
} ;

// 获取角色
export function getAdminRoleInfo (para) {
  return fetch({
    url: http.prefix + '/admin/role/getinfo',
    method: http.get,
    params: para
  })
} ;

// 添加角色
export function addAdminRole (para) {
  return fetch({
    url: http.prefix + '/admin/role/addinfo',
    method: http.post,
    params: para
  })
} ;

// 更新角色
export function updateAdminRole (para) {
  return fetch({
    url: http.prefix + '/admin/role/updateinfo',
    method: http.post,
    params: para
  })
} ;

// 删除角色
export function deleteAdminRole (para) {
  return fetch({
    url: http.prefix + '/admin/role/delinfo',
    method: http.get,
    params: para
  })
} ;

// 系统 查询错误日志
export function getErrorLog (para) {
  return fetch({
    url: http.prefix + '/log/get/errorlog',
    method: http.post,
    params: para
  })
} ;

// 系统 更新错误日志对应的业务 job
export function updateJobByError (para) {
  return fetch({
    url: http.prefix + '/log/update/errorlog',
    method: http.post,
    params: para
  })
} ;

// ent目录权限列表
export function getEntMenuList (para) {
  return fetch({
    url: http.prefix + '/set/ent/getmenu',
    method: http.get,
    params: para
  })
}

export function addEntMenu (para) {
  return fetch({
    url: http.prefix + '/set/ent/addmenu',
    method: http.post,
    params: para
  })
}

export function deleteEntMenu (para) {
  return fetch({
    url: http.prefix + '/set/ent/deletemenu',
    method: http.get,
    params: para
  })
}

export function updateEntMenu (para) {
  return fetch({
    url: http.prefix + '/set/ent/updatemenu',
    method: http.post,
    params: para
  })
}

// 管理后台目录权限列表
export function getAdminMenuList (para) {
  return fetch({
    url: http.prefix + '/set/manage/getmenu',
    method: http.post,
    params: para
  })
}

export function addAdminMenu (para) {
  return fetch({
    url: http.prefix + '/set/manage/addmenu',
    method: http.post,
    params: para
  })
}

export function deleteAdminMenu (para) {
  return fetch({
    url: http.prefix + '/set/manage/deletemenu',
    method: http.get,
    params: para
  })
}

export function updateAdminMenu (para) {
  return fetch({
    url: http.prefix + '/set/manage/updatemenu',
    method: http.post,
    params: para
  })
}
