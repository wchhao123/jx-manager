let menu = {
  data: [
    {
      'name': '企业管理',
      'id': '10001',
      'class': 'el-icon-menu',
      'children': [
        {
          'name': '企业信息管理',
          'id': '1000101',
          'parentId': '10001',
          'vueUrl': 'enterprise_query'
        }, {
          'name': '交易查询',
          'id': '1000102',
          'parentId': '10001',
          'vueUrl': 'enterprise_trade'
        }, {
          'name': '余额查询',
          'id': '1000103',
          'parentId': '10001',
          'vueUrl': 'enterprise_balance'
        }, {
          'name': '资金托管申请查询',
          'id': '10001031',
          'parentId': '10001',
          'vueUrl': 'money_manage'
        },
        {
          'name': '实名认证审核',
          'id': '1000104',
          'parentId': '10001',
          'vueUrl': 'enterprise_accreditation'
        }, {
          'name': '签约审核',
          'id': '1000105',
          'parentId': '10001',
          'vueUrl': 'enterprise_sign'
        }, {
          'name': '充值订单',
          'id': '1000106',
          'parentId': '10001',
          'vueUrl': 'enterprise_recharge'
        }, {
          'name': '发放批次查询',
          'id': '1000107',
          'parentId': '10001',
          'vueUrl': 'enterprise_salary'
        }, {
          'name': '发放明细查询',
          'id': '1000108',
          'parentId': '10001',
          'vueUrl': 'enterprise_salary_detail'
        }, {
          'name': 'JF交易明细查询',
          'id': '1000109',
          'parentId': '10001',
          'vueUrl': 'enterprise_jf_trade'
        }
      ]
    }, {
      'name': '用户管理',
      'id': '20001',
      'class': 'el-icon-menu',
      'children': [
        {
          'name': '用户信息管理',
          'id': '2000101',
          'parentId': '20001',
          'vueUrl': 'user_info'
        }, {
          'name': '业务规则管理',
          'id': '2000102',
          'parentId': '20001',
          'vueUrl': 'user_business_rule'
        }, {
          'name': '交易查询',
          'id': '2000103',
          'parentId': '20001',
          'vueUrl': 'user_trade'
        }, {
          'name': '余额查询',
          'id': '2000104',
          'parentId': '20001',
          'vueUrl': 'user_balance'
        }, {
          'name': '订单查询',
          'id': '2000105',
          'parentId': '20001',
          'vueUrl': 'user_order'
        }, {
          'name': '实名认证审核',
          'id': '2000106',
          'parentId': '20001',
          'vueUrl': 'user_auth'
        }
      ]
    }, {
      'name': '权限管理',
      'id': '30001',
      'class': 'el-icon-setting',
      'children': [
        {
          'name': '管理员管理',
          'id': '3000100',
          'parentId': '30001',
          'vueUrl': 'system_user'
        },
        {
          'name': '角色管理',
          'id': '3000100',
          'parentId': '30002',
          'vueUrl': 'system_role'
        },
        {
          'name': '企业端菜单管理',
          'id': '3000101',
          'parentId': '30001',
          'vueUrl': 'system_ent_menu'
        },
        {
          'name': '管理后台菜单管理',
          'id': '3000109',
          'parentId': '30001',
          'vueUrl': 'system_admin_menu'
        },
        {
          'name': '错误日志',
          'id': '3000108',
          'parentId': '30001',
          'vueUrl': 'system_log'
        },
        {
          'name': '业务类型管理',
          'id': '3000107',
          'parentId': '30001',
          'vueUrl': 'system_business_manage'
        }
      ]
    },{
      'name': '财务报表',
      'id': '30001',
      'class': 'el-icon-setting',
    }
  ]
}
export { menu }

const entRoute = {
  EntInfo: {
    route: 'enterprise_query'
  },
  EntTrad: {
    route: 'enterprise_trade'
  },
  EntBalance: {
    route: 'enterprise_balance'
  },
  EntRealName: {
    route: 'enterprise_accreditation'
  },
  EntSign: {
    route: 'enterprise_sign'
  },
  EntRechargeOrder: {
    route: 'enterprise_recharge'
  },
  EntSalary: {
    route: 'enterprise_salary'
  },
  EntSalaryDetail: {
    route: 'enterprise_salary_detail'
  },
  JFTrade: {
    route: 'enterprise_jf_trade'
  },
  EntMoneyManage: {
    route: 'money_manage'
  }
}
export {entRoute}
