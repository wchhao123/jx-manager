<template>
  <section id="accountAssign" v-loading="isLoading">
    <div >
      <el-form :inline="true"  :model="accountAssignInfo" label-position="right" class="toolbar form-inline" >
        <el-row>
          <el-form-item label="订单日期">
          <span  >{{accountAssignInfo.order_date| formatDate}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="订单状态">
          <span  >{{accountAssignInfo.order_state|filterAccountAssignState}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="总金额">
          <span  >{{accountAssignInfo.total_amount+' 元'}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="分配笔数">
          <span   >{{accountAssignInfo.assign_num+' 笔'}}</span>
          </el-form-item>
        </el-row>
        <el-row >
          <el-form-item label="分配信息">
            <li  v-for="(item, key,index) in accountAssignInfo.assign" :key='index' >{{'amount:  '+parseInt(item.amount)/100+'元'}}</li>
            <li  v-for="(item, key,index) in accountAssignInfo.assign" :key='index' >{{'guid:  '+ item.guid}}</li>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      accClearId: ''
    },
    data () {
      return {
        queryUrl: '/get_account_assign',
        isLoading: false,
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
      accClearId: {
        immediate: true,
        handler: function (val) {
          console.log(val)
          this.queryModel.bizId = val
          console.log(this.queryModel.accClearId)
          this.getBsContractInfo()
        }
      }
    },
    methods: {
      getBsContractInfo() {
        if (this.accClearId === '') {
          return
        }
        this.isLoading = true
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          debugger
          this.accountAssignInfo = response.data
          this.accountAssignInfo.assign = JSON.parse(this.accountAssignInfo.assign)
          this.isLoading = false
        }, err => {
          this.isLoading = false
          this.$message.warning(err)
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .el-form-item__label{
    min-width:150px;
    text-align:left;
  }
</style>
