import Router from 'vue-router'
import Login from 'views/Login'
import Home from 'views/Home.vue'
import EnterpriseQuery from 'views/01Enterprise/_11EntInfoManage/EnterpriseQuery.vue'
import EntTradeQuery from 'views/01Enterprise/_12EntBusiness/EntTradeQuery.vue'
import EntBalanceQuery from 'views/01Enterprise/_13EntBalance/EntBalanceQuery.vue'
import MoneyManage from 'views/01Enterprise/_13MoneyManage/MoneyManage'
import EntRealNameAudit from 'views/01Enterprise/_14EntRealName/EntRealNameAudit.vue'
import EntSignAudit from 'views/01Enterprise/_15EntSign/EntSignAudit.vue'
import EntRechargeOrder from 'views/01Enterprise/_16EntOrder/EntRechargeOrder.vue'
import EntSalaryList from 'views/01Enterprise/_17EntSalary/EntSalaryListQuery.vue'
import EntSalaryDetail from 'views/01Enterprise/_17EntSalary/EntSalaryDetailQuery.vue'
import EntSalaryRefund from 'views/01Enterprise/_17EntSalary/EntSalaryRefundQuery.vue'
import JFTrade from 'views/01Enterprise/_18JFTrade/JFEntTrade'
import ContractQuery from 'views/04Contract/ContractListQuery.vue'
import ContractSign from 'views/04Contract/ContractSignQuery.vue'
import BusinessAuth from 'views/01Enterprise/_19BusinessAuth/BusinessAuthQuery'
import SignSubject from 'views/01Enterprise/_15EntSign/EntSignSubject'
import EntAgentQuery from 'views/01Enterprise/_20EntAgentManage/EntAgentQuery.vue'

import TaskSettlementList from 'views/04Task/_02Settlement/SettlementListQuery.vue'
import TaskSettlementDetailList from 'views/04Task/_02Settlement/EntTaskDetailQuery.vue'
import TaskManageList from 'views/04Task/_02Settlement/TaskManage.vue'
import TaskSignInList from 'views/04Task/_02Settlement/TaskSignIn.vue'
import BusinessListQuery from 'views/03System/_05BusinessManage/BusinessListQuery.vue'
import TaskAndContract from 'views/04Task/_02Settlement/TaskAndContract.vue'
import  TaskCheckManage from 'views/04Task/_02Settlement/TaskCheckManage.vue'
import TaskDeliveryQuery from 'views/04Task/_02Settlement/TaskDeliveryQuery.vue'
import  EntStatisticsQuery from 'views/06Finance/EntStatisticsQuery.vue'
//import UserResume from 'views/04Task/_02Settlement/UserResume.vue'

import NOFOUND from 'views/404'

import UserInfo from 'views/02User/_01UserInfo/UserInfo'
import BusinessRule from 'views/02User/_02BusinessRules/BusinessRules'
import UserTrade from 'views/02User/_03UserTrade/UserTradeQuery'
import UserBalance from 'views/02User/_04UserBalance/UserBalanceQuery'
import UserOrder from 'views/02User/_05UserOrder/UserOrder'
import UserVerifyAuth from 'views/02User/_06UserVerifyAuth/UserVerifyAuth'

import UserManage from 'views/03System/_01UserManage/UserManage'
import RoleManage from 'views/03System/_02RoleManage/RoleManage'
import SystemLog from 'views/03System/_09SystemLog/SystemLog'
import EntMenu from 'views/03System/_04EntMenuAuthority/EntMenuAuthority'
import AdminMenu from 'views/03System/_03AdminMenuAuthority/AdminMenuAuthority'
import HtmlPanel from 'components/HtmlPanel'
import ContractUpdate from 'views/03System/ContractTemplate'

import DownLoad from 'views/05Download/DownLoad.vue'
export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
   /* {
      path: '/404',
      component: NOFOUND
    },*/
    {
      path: '/html_panel',
      component: HtmlPanel,
      name: 'htmlPanel'
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/',
      component: Home,
      name: '企业管理',
      iconCls: 'el-icon-message',
      children: [
        {path: '/enterprise_query', component: EnterpriseQuery, name: '企业信息查询'},
        {path: '/enterprise_trade', component: EntTradeQuery, name: '交易查询'},
        {path: '/enterprise_balance', component: EntBalanceQuery, name: '余额查询'},
        {path: '/money_manage', component: MoneyManage, name: '资金托管申请查询'},
        {path: '/enterprise_accreditation', component: EntRealNameAudit, name: '实名认证审核'},
        {path: '/enterprise_sign', component: EntSignAudit, name: '签约审核'},
        {path: '/enterprise_recharge', component: EntRechargeOrder, name: '充值订单'},
        {path: '/enterprise_salary', component: EntSalaryList, name: '发放批次查询'},
        {path: '/enterprise_salary_detail', component: EntSalaryDetail, name: '发放明细查询'},
        {path: '/enterprise_salary_refund', component: EntSalaryRefund, name: '撤回退款记录查询'},
        {path: '/enterprise_jf_trade', component: JFTrade, name: 'JF交易明细查询'},
        {path: '/contract_query', component: ContractQuery, name: '合同批次管理'},
        {path: '/contract_sign', component: ContractSign, name: '合同签约管理'},
        {path: '/business_auth', component: BusinessAuth, name: '业务权限'},
        {path: '/sign_subject', component: SignSubject, name: '签约主体'},
        {path: '/get_agent', component: EntAgentQuery, name: '代运营平台管理'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '众包管理',
      iconCls: 'el-icon-message',
      children: [
        {path: '/task_sign_in', component: TaskSignInList, name: '报名管理'},
        //{path: '/task_userinfo', component: UserResume, name: '个人履历'},
        {path: '/task_manage', component: TaskManageList, name: '任务管理'},
        {path: '/task_settlement', component: TaskSettlementList, name: '结算批次查询'},
        {path: '/task_settlement_detail', component: TaskSettlementDetailList, name: '结算批次详情查询'},
        {path: '/task_and_contract', component: TaskAndContract, name: '合同任务列表'},
        {path: '/task_check', component: TaskCheckManage, name: '验收管理'},
        {path: '/task_delivery', component: TaskDeliveryQuery, name: '验收交付文件管理'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '用户管理',
      iconCls: 'el-icon-message',
      children: [
        {path: '/user_info', component: UserInfo, name: '用户信息查询'},
        {path: '/user_business_rule', component: BusinessRule, name: '业务规则管理'},
        {path: '/user_trade', component: UserTrade, name: '用户交易查询'},
        {path: '/user_balance', component: UserBalance, name: '用户余额查询'},
        {path: '/user_order', component: UserOrder, name: '用户订单查询'},
        {path: '/user_auth', component: UserVerifyAuth, name: '用户实名认证审核'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '权限管理',
      iconCls: 'el-icon-message',
      children: [
        {path: '/system_user', component: UserManage, name: '管理员管理'},
        {path: '/system_role', component: RoleManage, name: '角色管理'},
        {path: '/system_log', component: SystemLog, name: '日志管理'},
        {path: '/system_ent_menu', component: EntMenu, name: '企业端菜单管理'},
        {path: '/system_admin_menu', component: AdminMenu, name: '管理后台菜单管理'},
        {path: '/contract_update', component: ContractUpdate, name: '添加合同模板'},
        {path: '/system_business_manage', component: BusinessListQuery, name: '业务类型管理'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '下载管理',
      iconCls: 'el-icon-message',
      children: [
        {path: '/download_list', component: DownLoad, name: '下载管理'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '财务报表',
      iconCls: 'el-icon-message',
      children: [
        {path: '/ent_statistics_info', component: EntStatisticsQuery, name: '企业日余额报表'}
      ]
    }
  ]
})
