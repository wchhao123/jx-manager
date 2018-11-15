<template>
  <div id="recharge_manage_new"  >
    <el-form demo-form-inline :model="queryModel" :inline="true" class="toolbar" :rules="rules" ref="balanceForm">
      <el-row>
        <el-form-item prop="entId">
          <ent-select :span="24" title="发薪企业" place-holder="企业名称"
                      @input-select="salaryInputSelect">
          </ent-select>
        </el-form-item>
      </el-row>
      <el-row style="margin: 15px 0 10px">
        <el-col :span="3" :offset="1">
          <el-button type="primary" size="small" icon="el-icon-search" @click="doQuery">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="toolbar" v-loading="isLoading">
      <span class="row">企业编号 : {{balance.entId}}</span>
      <span class="row">企业名称 : {{balance.entName}}</span>
      <span class="row">账号可用余额(元) : {{balance.accountBalance}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import * as Api from 'api'
import { ERR_OK } from '../../../api/index'
import EntSelect from 'components/select/EntSelect'

export default {
  data () {
    return {
      isLoading: false,
      queryModel: {
        entId: null
      },
      balance: {
        entId: null,
        entName: null,
        accountBalance: null
      },
      rules: {
        entId: {required: true, message: '请选择发薪企业'}
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
      this.$refs['balanceForm'].validate((valid) => {
        if (valid) {
          this.isLoading = true
          Api.getEntBalance(this.queryModel).then(response => {
            this.isLoading = false
            if (response.data.code === ERR_OK) {
              this.balance = response.data.data
            } else {
              this.balance = {}
            }
          })
        }
      })
    }
  },
  components: {
    EntSelect
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .toolbar
    padding-left 50px
  .row
    display block
    font-size 14px
    margin 10px 5px
</style>
