const pickerOptions2 = {
  shortcuts: [{
    text: '最近一周',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}
export {pickerOptions2}

const entVerifyStateMap = {
  0: '未认证',
  1: '认证中',
  2: '认证失败',
  3: '已认证'
}

export const taskSettlementType = {
  1: '线下结算',
  2: '结算到客户端',
  3: '结算到支付宝'
}

const accountAssignStateMap = {
  1: '成功',
  2: '处理中',
  3: '失败'
}

export const businessDefaultState = {
  0: '不开通',
  1: '开通'
}

export {accountAssignStateMap}

export {entVerifyStateMap}

export function entVerifyState () {
  return [
    {'key': 0, 'value': '未认证'},
    {'key': 1, 'value': '认证中'},
    {'key': 2, 'value': '认证失败'},
    {'key': 3, 'value': '已认证'}
  ]
}

// 企业信息管理签约状态
const entSignStateMap = {
  0: '未签约',
  1: '已签约'
}
export {entSignStateMap}
export function entSignState () {
  return [{
    'key': 0,
    'value': '未签约'
  }, {
    'key': 1,
    'value': '已签约'
  }
  ]
}
// 银行卡名称
export function entBankName () {
  return [
    {'key': 1, 'value': '中国银行'},
    {'key': 2, 'value': '农业银行'},
    {'key': 3, 'value': '工商银行'},
    {'key': 4, 'value': '建设银行'},
    {'key': 5, 'value': '交通银行'},
    {'key': 6, 'value': '邮政储蓄银行'},
    {'key': 7, 'value': '广发银行'},
    {'key': 8, 'value': '浦东发展银行'},
    {'key': 9, 'value': '浙江泰隆商业银行'},
    {'key': 10, 'value': '招商银行'},
    {'key': 11, 'value': '民生银行'},
    {'key': 12, 'value': '兴业银行'},
    {'key': 13, 'value': '中信银行'},
    {'key': 14, 'value': '华夏银行'},
    {'key': 15, 'value': '广大银行'},
    {'key': 16, 'value': '北京银行'},
    {'key': 17, 'value': '上海银行'},
    {'key': 18, 'value': '天津银行'},
    {'key': 19, 'value': '大连银行'},
    {'key': 20, 'value': '杭州商业银行'},
    {'key': 21, 'value': '宁波银行'},
    {'key': 22, 'value': '厦门银行'},
    {'key': 23, 'value': '广州银行'},
    {'key': 24, 'value': '平安银行'},
    {'key': 25, 'value': '浙商银行'},
    {'key': 26, 'value': '上海农商银行'},
    {'key': 27, 'value': '重庆银行'},
    {'key': 28, 'value': '江苏银行'},
    {'key': 29, 'value': '北京农村商业银行'},
    {'key': 30, 'value': '济宁银行'},
    {'key': 31, 'value': '台州银行'},
    {'key': 32, 'value': '深圳发展银行'},
    {'key': 33, 'value': '成都商业银行'},
    {'key': 34, 'value': '徽商银行'}
  ]
}

const typeEntMoneyManageAuthState = {
  1: '开户成功',
  2: '审核中',
  3: '审核不通过'
}
export {typeEntMoneyManageAuthState}

export function funEntMoneyManageAuthState() {
  return [
    {'key': 1, 'value': '开户成功'},
    {'key': 2, 'value': '审核中'},
    {'key': 3, 'value': '审核不通过'}
  ]
}

// 企业交易类型
const typeEntTransfer = {
  1: '工资发放',
  2: '工资代发充值',
  3: '工资发放退款',
  7: '工资发放撤回',
  12: '工资发放',
  13: '工资发放退款',
  14: '工资发放',
  15: '众包结算',
  16: '众包结算撤回',
  17: '众包结算退款',
  18: '众包结算',
  19: '众包结算退款'
}
export {typeEntTransfer}
export function funEntTransfer () {
  return [
    {'key': 1, 'value': '工资发放'},
    {'key': 2, 'value': '工资代发充值'},
    {'key': 7, 'value': '工资发放撤回'},
    {'key': 13, 'value': '工资发放退款'},
    {'key': 15, 'value': '众包结算'},
    {'key': 16, 'value': '众包结算撤回'},
    {'key': 17, 'value': '众包结算退款'},
  ]
}

// 实名认证企业审核状态
const typeEntAudit = {
  1: '待审批',
  2: '拒绝',
  3: '审批通过'
}
export {typeEntAudit}
export function funEntAudit () {
  return [
    {'key': 1, 'value': '待审批'},
    {'key': 2, 'value': '拒绝'},
    {'key': 3, 'value': '审批通过'}
  ]
}

// 企业签约审核 审批状态
export const typeEntSignState = {
  0: '待审批',
  1: '审批通过'
}
export function funEntSignState () {
  return [
    {'key': 1, 'value': '审批通过'},
    {'key': 0, 'value': '待审批'}
  ]
}

// 企业充值订单 审批状态
export const typeEntRechargeOrderVerifyState = {
  0: '审核失败',
  1: '审核通过',
  2: '待审核'
}
export function funRechargeOrderVerifyType () {
  return [
    {'key': 0, 'value': '审核失败'},
    {'key': 1, 'value': '审核通过'},
    {'key': 2, 'value': '待审核'}
  ]
}

// 企业充值订单 充值方式
export const typeEntRechargeOrderRechargeType = {
  4: '线上网银充值',
  5: '线下打款充值',
  6: '线上网银充值',
  7: '线上网银充值'
}

// 企业充值订单 充值方式
export function funEntRechargeOrderRechargeType() {
  return [
    // {'key': '04', 'value': '线下打款充值'},
    {'key': '05', 'value': '线下打款充值'},
    {'key': '06', 'value': '线上网银充值'}
  ]
}

// 企业充值订单 详情页 渠道名称 (汇潮支付交易号:)
export const typeEntRechargeOrderChanelTipType = {
  4: '汇潮支付交易号:',
  5: '线下打款(旧)',
  6: '环迅支付交易号:',
  7: '新浪支付交易号:'
}

// 企业充值订单 订单状态
export const typeEntRechargeOrderState = {
  0: '等待打款',
  1: '充值成功',
  3: '充值中',
  9: '充值失败',
  5: '订单关闭'
}
export function funRechargeOrderStateType () {
  return [
    {'key': 0, 'value': '等待打款'},
    {'key': 1, 'value': '充值成功'},
    {'key': 3, 'value': '充值中'},
    {'key': 9, 'value': '充值失败'},
    {'key': 5, 'value': '订单关闭'}
  ]
}

// 工资发放类型 (显示的时候有三种)
const typeSalaryType = {
  1: '工资发放至客户端',
  2: '发工资条',
  3: '工资发放至客户端',
  5: '工资发放至银行卡',
  6: '工资发放至银行卡'
}

const typeRefundSalaryType = {
  1: '工资发放至客户端',
  3: '工资发放至客户端',
  5: '工资发放至银行卡',
  6: '工资发放至银行卡',
  7: '众包结算到客户端',
  8: '众包结算到客户端',
  9: '众包结算到支付宝'
}
export {typeRefundSalaryType}
export {typeSalaryType}

// 前端查询时只传两种
export function funSalaryType () {
  return [
    {'key': 1, 'value': '工资发放至客户端'},
    {'key': 2, 'value': '发工资条'},
    {'key': 5, 'value': '工资发放至银行卡'}
  ]
}

export function funRefundSalaryType () {
  return [
    {'key': 1, 'value': '工资发放至客户端'},
    {'key': 5, 'value': '工资发放至银行卡'},
    {'key': 7, 'value': '众包结算到客户端'},
    {'key': 9, 'value': '众包结算到支付宝'}
  ]
}

// 工资发放状态
export const typeSalaryState = {
  1: '发放成功',
  0: '发放失败',
  3: '待付款',
  4: '订单关闭',
  5: '发放中',
  7: '发放成功（有撤回）',
  8: '部分退款',
  10: '待发送',
  12: '已退款'
}
export function funSalaryState () {
  return [
    {'key': 3, 'value': '待付款'},
    {'key': 10, 'value': '待发送'},
    {'key': 5, 'value': '发放中'},
    {'key': 1, 'value': '发放成功'},
    {'key': 7, 'value': '发放成功（有撤回）'},
    {'key': 0, 'value': '发放失败'},
    {'key': 12, 'value': '已退款'},
    {'key': 8, 'value': '部分退款'},
    {'key': 4, 'value': '订单关闭'},
  ]
}
// 工资发放详情状态
export const typeSalaryDetailState = {
  1: '发放成功',
  0: '发放失败',
  3: '待付款',
  4: '订单关闭',
  5: '发放中',
  7: '已撤回',
  8: '已退款',
  10: '待发送',
}
export function funSalaryDetailState () {
  return [
    {'key': 1, 'value': '发放成功'},
    {'key': 0, 'value': '发放失败'},
    {'key': 3, 'value': '待付款'},
    {'key': 4, 'value': '订单关闭'},
    {'key': 5, 'value': '发放中'},
    {'key': 7, 'value': '已撤回'},
    {'key': 8, 'value': '已退款'},
  ]
}

export const typeTaskState = {
  1: '发放成功',
  0: '发放失败',
  3: '待付款',
  4: '订单关闭',
  5: '发放中',
  7: '发放成功（有撤回）',
  8: '部分退款',
  12:'已退款'
}
export function funTaskDetailState () {
  return [
    {'key': 3, 'value': '待付款'},
    {'key': 5, 'value': '发放中'},
    {'key': 1, 'value': '发放成功'},
    {'key': 0, 'value': '发放失败'},
    {'key': 8, 'value': '已退款'},
    {'key': 7, 'value': '已撤回'},
    {'key': 4, 'value': '订单关闭'},
  ]
}
export function funTaskState () {
  return [
    {'key': 3, 'value': '待付款'},
    {'key': 5, 'value': '发放中'},
    {'key': 1, 'value': '发放成功'},
    {'key': 7, 'value': '发放成功（有撤回）'},
    {'key': 0, 'value': '发放失败'},
    {'key': 12, 'value': '已退款'},
    {'key': 8, 'value': '部分退款'},
    {'key': 4, 'value': '订单关闭'}
  ]
}
export const contractType = {
  1: '双方协议',
  2: '三方协议'
}
export const businessType = {
  '01': '工资发放至员工银行卡'
}
export const signBusinessType = {
  '1': '薪资代发',
  '2': '灵活用工'
}
export const IdType = {
  '0': '居民身份证',
  '1': '护照',
  'B': '港澳居民来往内地通行证',
  'C': '台湾居民来往大陆通行证'
//0-居民身份证 1 护照 B港澳通行证 C台湾通行证 E户口簿 F临时居民身份证
}
export const sealState = {//1表示已生成 2 表示生成中3 表示生成失败
  '1': '已生成',
  '2': '生成中',
  '3': '生成失败'
}
export const contractUpdate = {
  1: '更新',
  0: '删除'
}
export const businessState = {
  1: '已开通',
  0: '已关闭'

}
export const exportState = {
  1: '已导出',
  0: '正在导出'

}
export const uploadState = {
  1: '已上传',
  0: '未上传'

}
export const contractState = {
  0: '未发送',
  1: '发送成功',
  2: '发送失败',
  3: '部分失败',
  4: '发送中'

}

export const userImageState = {
  1: '已上传',
  0: '未上传'
}
export const contractSignState = {
  0: '未发送',
  1: '已签约',
  2: '签署中',
  3: '发送失败',
  4: '已撤销',
  5: '已失效',
  6: '发送中',
  7: '签署异常'
}

export const contractStatus = {
  2: '已创建',
  3: '已发送,正在签署中',
  4: '拒绝签署，已取消',
  5: '已完成',
  9: '已过期'
}
export const signInState = {
  1: '待处理',
  2: '报名取消',
  3: '已录用',
  4: '已淘汰',
  5: '过期失效'
}
export const taskSignUpState = {
  1: '未开始',
  2: '报名中',
  3: '报名结束'
}

export const taskIsShowState = {
  0: '否',
  1: '是'
}
export const taskIsSendContract = {
  1: '发送',
  2: '不发送'
}
export function funSignInState () {
  return [
    {'key': 1, 'value': '待处理'},
    {'key': 2, 'value': '报名取消'},
    {'key': 3, 'value': '已录用'},
    {'key': 4, 'value': '已淘汰'},
    {'key': 5, 'value': '过期失效'}
  ]
}

export function funTaskListState () {
  return [
    {'key': 1, 'value': '待发布'},
    {'key': 2, 'value': '进行中'},
    {'key': 3, 'value': '已完成'},
    {'key': 4, 'value': '已关闭'}
  ]
}

export function funTaskDeliveryType () {
  return [
    {'key': 1, 'value': '验收附件'},
    {'key': 2, 'value': '任务交付附件'},
  ]
}
export const typeTaskDelivery = {
  1: '验收附件',
  2: '任务交付附件',

}

export const typeTaskListState = {
  1: '待发布',
  2: '进行中',
  3: '已完成',
  4: '已关闭'
}
export function funTaskWorkState (){
  return [
    {'key': 1, 'value': '工作中'},
    {'key': 2, 'value': '待验收'},
    {'key': 3, 'value': '验收通过'},
    {'key': 4, 'value': '验收中'}
  ]
}
export const typeTaskWorkState = {
  1: '工作中',
  2: '待验收',
  3: '验收通过',
  4: '验收中'
}
export const typeTaskWorkReportState = {
  1: '反馈内容',
  2: '提交验收',
  3: '验收通过',
}

//用户激活状态
export const typeUserActiveState = {
  1: '已激活',
  0: '未激活'
}
export function funUserActiviState () {
  return [
    {'key': 1, 'value': '已激活'},
    {'key': 0, 'value': '未激活'}
  ]
}

//用户实名认证状态
export const typeUserVerifyState = {
  0: '未认证',
  1: '已认证',
  2: '审核中',
  3: '审核不通过'
}
export function funUserVerifyState () {
  return [
    {'key': 0, 'value': '未认证'},
    {'key': 1, 'value': '已认证'},
    {'key': 2, 'value': '审核中'},
    {'key': 3, 'value': '审核不通过'}
  ]
}

// 用户业务规则状态
export const typeUserBusinessRule = {
  1: '提现到银行卡',
  2: '工资发放到银行卡',
  4: '提现到支付宝',
  5: '众包结算到支付宝'
}
export function funUserBusinessRuleType () {
  return [
    {'key': '1', 'value': '提现到银行卡'},
    {'key': '2', 'value': '工资发放到银行卡'},
    {'key': '4', 'value': '提现到支付宝'},
    {'key': '5', 'value': '众包结算到支付宝'}
  ]
}

// 用户业务规则状态
export const typeUserBusinessRuleState = {
  0: '未启用',
  1: '启用'
}
export function funUserBusinessRuleState () {
  return [
    {'key': '0', 'value': '未启用'},
    {'key': '1', 'value': '启用'}
  ]
}

//用户交易类型
export const typeUserTrade = {
  1: '工资发放',
  2: '转账 (出)',
  3: '转账 (入)',
  4: '消费',
  5: '消费退款',
  6: '提现退款',
  7: '发薪撤回',
  8: '余额提现',
  10: '充值',
  11: '充值退款',
  14: '个体经营所得',
  15:'个体经营所得撤回 ',
  16: '转账 (出)',
  17: '转账 (入)',
}
export function funUserTradeType () {
  return [
    {'key': 1, 'value': '工资发放'},
    {'key': 2, 'value': '转账 (出)'},
    {'key': 3, 'value': '转账 (入)'},
    {'key': 4, 'value': '消费'},
    {'key': 5, 'value': '消费退款'},
    {'key': 6, 'value': '提现退款'},
    {'key': 7, 'value': '发薪撤回'},
    {'key': 8, 'value': '余额提现'},
    {'key': 10, 'value': '充值'},
    {'key': 11, 'value': '充值退款'},
    {'key': 14, 'value': '个体经营所得'},
    {'key': 15, 'value': '个体经营所得撤回'}
  ]
}

// 用户订单类型
export const typeUserOrderType = {
  '01': '提现到银行卡（手动提现）',
  '02': '转账-转出',
  '03': '转账-转入',
  '08': '提现到银行卡（自动提现）',
  '09': '提现到支付宝（手动提现）',
  '10':  '转账-转出(余额归集)',
  '11':  '转账-转入(余额归集)',
 '0039':  '美团订单',
 '0046': '惠购商城订单',
 '0041': '滴滴出行订单',
 '0052': '火车票订单',
 '0008': '话费充值',
 '0007': '加油卡充值',
 '0062': '生活缴费',
 '0081': '银联线下付款',
}

export const  typeUserOrderPayType = {
  '1': '收入余额',
  '2': '微信支付',
  '3': '工资预支'
}

export function funUserOrderPayType () {
  return [
    {'key': '1', 'value': '收入余额'},
    {'key': '2', 'value': '微信支付'},
    {'key': '3', 'value': '工资预支'},
  ]
}
export function funUserOrderType () {
  return [
    {'key': '01', 'value': '提现到银行卡（手动提现）'},
    {'key': '09', 'value': '提现到支付宝（手动提现）'},
    {'key': '08', 'value': '提现到银行卡（自动提现）'},
    {'key': '02', 'value': '转账-转出'},
    {'key': '03', 'value': '转账-转入'},
    {'key': '10', 'value': '转账-转出(余额归集)'},
    {'key': '11', 'value': '转账-转入(余额归集)'},
    {'key': '0039', 'value': '美团订单'},
    {'key': '0046', 'value': '惠购商城订单'},
    {'key': '0041', 'value': '滴滴出行订单'},
    {'key': '0052', 'value': '火车票订单'},
    {'key': '0008', 'value': '话费充值'},
    {'key': '0007', 'value': '加油卡充值'},
    {'key': '0062', 'value': '生活缴费'},
    {'key': '0081', 'value': '银联线下付款'},
  ]
}

// 用户订单状态
export const typeUserOrderState = {
  '0': '待支付',
  '1': '成功',
  '2': '已支付',
  '3': '处理中',
  '4': '已退款',
  '5': '订单关闭',
  '7': '退款中'
}
export const typeWithdrawType = {
  '01': '手动提现',
  '08': '自动提现',
  '09': '手动提现'
}
export function funUserOrderState () {
  return [
    {'key': '0', 'value': '待支付'},
    {'key': '1', 'value': '成功'},
    {'key': '2', 'value': '已支付'},
    {'key': '3', 'value': '处理中'},
    {'key': '4', 'value': '已退款'},
    {'key': '5', 'value': '订单关闭'},
    {'key': '7', 'value': '退款中'}
  ]
}

// 员工实名认证 审批状态
export const typeUserVerifyAuthState = {
  '0': '待审批',
  '1': '审批通过',
  '2': '审批中',
  '3': '审批不通过'
}
export function funUserVerifyAuthState() {
  return [
    {'key': '0', 'value': '待审批'},
    {'key': '1', 'value': '审批通过'},
    {'key': '2', 'value': '审批中'},
    {'key': '3', 'value': '审批不通过'}
  ]
}

// 用户证件类型
export const typeUserIdType = {
  '1': '身份证',
  '2': '护照',
  '3': '港澳居民来往内地通行证',
  '4': '台湾居民来往大陆通行证',
  '5': '临时身份证'
}
export function funUserIdType() {
  return [
    {'key': '1', 'value': '身份证'},
    {'key': '2', 'value': '护照'},
    {'key': '3', 'value': '港澳居民来往内地通行证'},
    {'key': '4', 'value': '台湾居民来往大陆通行证'},
    {'key': '5', 'value': '临时身份证'}
  ]
}

export const typeSystemErrorType = {
  '1': '企业流水更改异常',
  '2': '用户流水更改异常',
  '3': '更改发薪及详情状态异常',
  '4': 'JF成功开户更改本地状态异常',
  '6': '用户提现异常',
  '7': '福利分配异常',
  '10': '充值订单异常',
  '11': '任务结算异常',
  '12': '发薪更新状态异常',
  '13': '合同异常',
  '14': '小批次福利分配异常',
  '15':"更新福利分配多批次状态异常",
  '16': '福利分配MQ开户失败',
  '17':"工资发放到银行卡异常",
  '18': "任务结算到支付宝分配异常",
  '19': '任务结算到支付宝发放异常',
  '20':'任务结算到支付宝退款异常',
  '21': '任务结算福利分配异常',
  '22': '任务结算更新多批次状态异常',
  '23': '用户资金归集异常'
}

export function funSystemErrorType () {
  return [
    {'key': '1', 'value': '企业流水更改异常'},
    {'key': '2', 'value': '用户流水更改异常'},
    {'key': '3', 'value': '更改发薪及详情状态异常'},
    {'key': '4', 'value': 'JF成功开户更改本地状态异常'},
    {'key': '6', 'value': '用户提现异常'},
    {'key': '7', 'value': '福利分配异常'},
    {'key': '10', 'value': '充值订单异常'},
    {'key': '11', 'value': '任务结算异常'},
    {'key': '12', 'value': '发薪更新状态异常'},
    {'key': '13', 'value': '合同异常'},
    {'key': '14', 'value': '小批次福利分配异常'},
    {'key': '15', 'value': '更新福利分配多批次状态异常'},
    {'key': '16', 'value': '福利分配MQ开户失败'},
    {'key': '17', 'value': '工资发放到银行卡异常'},
    {'key': '18', 'value': '任务结算到支付宝分配异常'},
    {'key': '19', 'value': '任务结算到支付宝发放异常'},
    {'key': '20', 'value': '任务结算到支付宝退款异常'},
    {'key': '21', 'value': '任务结算福利分配异常'},
    {'key': '22', 'value': '任务结算更新多批次状态异常'},
    {'key': '23', 'value': '用户资金归集异常'}
  ]
}

export const typeSystemJobState = {
  '0': 'job等待执行ing',
  '1': 'job执行成功',
  '2': 'job执行失败',
  '3': '需要人工介入'
}

export function funSystemJobState () {
  return [
    {'key': '0', 'value': 'job等待执行ing'},
    {'key': '1', 'value': 'job执行成功'},
    {'key': '2', 'value': 'job执行失败'},
    {'key': '3', 'value': '需要人工介入'}
  ]
}

export function funErrorJobHopeState () {
  return [
    {'key': 'success', 'value': '执行为成功'},
    {'key': 'fail', 'value': '执行为失败'}
  ]
}

// JF开放平台流水类型
export const typeJFFlowType = {
  '1': '消费',
  '2': '消费退款',
  '3': '充值',
  '4': '充值退款',
  '5': '转出',
  '6': '转入'
}

export const typeResourceLevel = {
    '1': '超级管理员',
    '2': '管理员',
    '3': '子操作',
    '4': '公共操作'
}

// 权限级别
export function funResourceLevel () {
  return [
    {'key': '1', 'value': '超级管理员'},
    {'key': '2', 'value': '管理员'},
    {'key': '3', 'value': '子操作'},
    {'key': '4', 'value': '公共操作'},
    {'key': '5', 'value': '业务权限'}
  ]
}

export const typeAuthority = {
  '1': '按钮',
  '2': '菜单'
}
// 权限类型
export function funAuthorityType () {
  return [
    {'key': '1', 'value': '按钮'},
    {'key': '2', 'value': '菜单'},
    {'key': '01', 'value': '工资发放到员工银行卡'},
    {'key': '02', 'value': '工资发放至客户端'},
    {'key': '03', 'value': '工资条发放'},
    {'key': '04', 'value': '花名册'},
    {'key': '05', 'value': '众包平台'},
    {'key': '06', 'value': '合同管理'}
  ]
}

// 角色状态
export const typeAdminRole = {
  '0': '无效',
  '1': '有效'
}

// 角色状态
export function funAdminRoleType () {
  return [
    {'key': '0', 'value': '无效'},
    {'key': '1', 'value': '有效'}
  ]
}

export function funBusinessDefaultType() {
  return [
    {'key': '0', 'value': '不开通'},
    {'key': '1', 'value': '开通'}
  ]
}

// 管理员在职状态
export const typeAdminJobState = {
  '0': '在职',
  '1': '离职'
}

export function funAdminJobStateType () {
  return [
    {'key': '1', 'value': '离职'},
    {'key': '0', 'value': '在职'}
  ]
}

export function dataAdminStatus () {
  return [
    {'key': '0', 'value': '不开通'},
    {'key': '1', 'value': '开通'}
  ]
}

export function dataUserSource () {
  return [
    {'key': '0', 'value': '企业平台'},
    {'key': '2', 'value': '开放平台'},
    {'key': '1', 'value': '自主注册'}
  ]
}


export const dataUserSourceView = {
  0: '企业平台',
  1: '自主注册',
  2: '开放平台'
}

export function dataOrderSource () {
  return [
    {'key': '0', 'value': '企业平台'},
    {'key': '2', 'value': '开放平台'}
  ]
}
