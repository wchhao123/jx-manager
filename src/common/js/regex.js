// 特殊字符正则 regEn.test(value) === true 不合法
export const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
export const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im

// 身份证号正则 regIDCard.test(value) === false 不合法
export const regIDCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 金额校验  === false 不合法
export const regMoney = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/

// 正整数  true 合法
export const regPositive = /^(\d)|(∞)+$/

// 密码 false 不合法
export const regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

// 名称 中英文
export const regNameCN = /^[\u4e00-\u9fa5\s·]+$/

// 英文姓名
export const regNameEN = /^([a-zA-Z\s]+)$/

// 手机号
export const regMobile = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/

// 企业名称正则
export const regEntName = /^[\u4e00-\u9fa5a-zA-Z\\（\\）]{2,32}$/

// 校验银行卡
export const regBankCard = /^[1-9]\d{14,18}$/
