<template>
  <div id="recharge_manage_new"  >
    <el-form demo-form-inline ref="balanceForm" :model="queryModel" :inline="true" class="toolbar" :rules="rules">
      <el-row>
        <el-form-item label="用户账号" prop="mobile">
          <el-input size="small" placeHolder="请输入用户手机号" v-model="queryModel.mobile"></el-input>
        </el-form-item>
      </el-row>
      <el-row style="margin: 15px 0 10px">
        <el-col :span="3" :offset="1">
          <el-button type="primary" size="small" icon="el-icon-search" :disabled="isLoading" @click="doQuery">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="toolbar" v-loading="isLoading">
      <span class="row">用户姓名 : {{balance.userName}}</span>
      <span class="row">用户手机号 : {{balance.mobile}}</span>
      <span class="row">账号总额 : {{balance.balance}}</span>
      <span class="row">账号冻结金额(元) : {{balance.frozenBalance}}</span>
      <span class="row">账号可提现金额(元) : {{balance.enableBalance}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import * as Api from 'api'
import { ERR_OK } from '../../../api/index'
import * as Validator from 'common/js/validator'

export default {
  data () {
    return {
      isLoading: false,
      queryModel: {
      },
      balance: {
      },
      rules: {
        mobile: {required: true, validator: Validator.validatorMobile, trigger: 'blur'}
      }
    }
  },
  methods: {
    salaryInputSelect (entId) {
      if (entId !== undefined) {
        this.queryModel.entId = entId
      } else {
        this.queryModel.entId = null
      }
      console.log(this.queryModel.entId)
    },
    doQuery() {
      this.$refs.balanceForm.validate(valid => {
        if (valid) {
          this.isLoading = true
          Api.getUserBalance(this.queryModel).then(response => {
            this.isLoading = false
            if (response.data.code === ERR_OK) {
              this.balance = response.data.data
            } else {
              this.balance = {}
              this.$message.error(response.data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .row
    display block
    font-size 14px
    margin 10px 5px
</style>
