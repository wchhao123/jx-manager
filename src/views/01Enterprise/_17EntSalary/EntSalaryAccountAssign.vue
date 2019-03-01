<template>
  <section id="accountAssign" v-loading="isLoading">
    <div >
        <el-form :inline=true :model="queryModel" label-position="right" class="toolbar">
          <el-row>
           <el-col>
             <el-form-item label="业务编号：">
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="queryModel.bizId"
                :fetch-suggestions="querySearch"
                placeholder="请选业务编号"
                @select="setBusinessId"
              >
                <i class="el-icon-edit el-input__icon"
                   slot="suffix">
                </i>
                <template slot-scope="{ item }">
                  <span >{{ item}}</span>
                </template>
              </el-autocomplete>
             </el-form-item>
         </el-col>
            <el-col >
              <el-button size="small" type="primary"  style="margin-bottom: 0px;margin-top: 5px" :disabled="isLoading" @click="getBsContractInfo()">查询分配信息
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      <div class="toolbar" v-loading="isLoading">
        <span class="row">订单日期:{{accountAssignInfo.order_date| formatDate}}</span>
        <span class="row">订单状态：{{accountAssignInfo.order_state|filterAccountAssignState}}</span>
        <span class="row">总金额：{{accountAssignInfo.total_amount}}</span>
        <span class="row">分配笔数：{{accountAssignInfo.assign_num}}</span>
        <span class="row">分配信息：
           <li  v-for="(item, key,index) in accountAssignInfo.assign" :key='index' >{{'amount:  '+parseInt(item.amount)/100+'元,   guid:  '+ item.guid}}</li>

        </span>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      salaryId: ''
    },
    data () {
      return {
        queryUrl: '/get_account_assign',
        isLoading: false,
        businessIds: [],
        salary: '',
        accountAssignInfo: {
          order_date: '',
          order_state: '',
          total_amount: '',
          assign_num: '',
          assign: []
        },
        queryModel: {
          bizId: ''
        }
      }
    },
    watch: {
      salaryId: {
        immediate: true,
        handler: function (val) {
          this.businessIds = []
          this.salary = ''
          this.queryModel.bizId = ''
          this.accountAssignInfo = {}
          this.salary = val
          console.log(this.salary)
        }
      }
    },
    methods: {
      querySearch(queryString, cb) {
        console.log(this.queryModel)
        this.businessIds = []
        this.$post(this.$url('/get_business_ids'), {salaryId: this.salary}).then(res => {
          console.log(res.data)
          res.data.forEach((item) => {
            this.businessIds.push(item)
          })
          cb(this.businessIds)
        })
      },
      getBsContractInfo() {
        if (this.queryModel.bizId === '') {
          return
        }
        this.isLoading = true
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          this.accountAssignInfo = response.data
          this.accountAssignInfo.assign = JSON.parse(this.accountAssignInfo.assign)
          this.accountAssignInfo.total_amount = this.accountAssignInfo.total_amount + '元'
          this.accountAssignInfo.assign_num = this.accountAssignInfo.assign_num + '笔'
          this.isLoading = false
        }, err => {
          this.isLoading = false
          this.$message.warning(err)
        })
      },
      setBusinessId(item) {
        this.queryModel.bizId = ''
        console.log(item)
        this.queryModel.bizId = item
        console.log(this.queryModel.bizId)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-form-item__label{
    min-width:150px;
    text-align:left;
  }
  .toolbar {
    padding-left 20px
  }
  .row {
    display block
    font-size 14px
    margin 10px 5px
  }
</style>
