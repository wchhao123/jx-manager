<template>
  <div class="customDialog" v-loading="isLoading">
    <el-form ref="entInfo" :model="detail" v-if="detail" class="toobar"
             label-position="left">

      <span class="item-title">订单基本信息</span>
      <el-row type="flex">
        <el-form-item label="订单号:" :span="10">
          <span>{{detail.orderId}}</span>
        </el-form-item>

        <el-form-item label="订单时间:">
          <span>{{detail.createDate | filterdateYMDHMS}}</span>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="订单类型:">
          <span>{{detail.orderType | filterUserOrderType}}</span>
        </el-form-item>

        <el-form-item label="订单状态:">
          <span>{{detail.orderState | filterUserOrderState}}</span>
        </el-form-item>
      </el-row>
      <el-row v-show="detail.errorMsg">
        <el-form-item label="退款原因:">
          <span>{{detail.errorMsg}}</span>
        </el-form-item>
      </el-row>
      <el-row type="flex" v-show="detail.toUserMobile">
        <el-form-item label="对方账号:">
          <span>{{detail.toUserMobile }}</span>
        </el-form-item>
      </el-row>

      <el-row type="flex" v-show="detail.remark" >
        <el-form-item label="转账备注:" style="width: 100%;">
          <span>  {{detail.remark}}</span>
        </el-form-item>
      </el-row>

      <span class="item-title">用户信息</span>
      <el-row type="flex">
        <el-form-item label="姓名:">
          <span>{{detail.userName}}</span>
        </el-form-item>

        <el-form-item label="账号:">
          <span>{{detail.mobile}}</span>
        </el-form-item>
      </el-row>

      <el-row type="flex">
        <el-form-item label="提现银行卡号:" v-show="detail.bankNo">
          <span>{{detail.bankNo}}</span>
        </el-form-item>

        <el-form-item label="证件号:">
          <span>{{detail.idNumber}}</span>
        </el-form-item>
      </el-row>

      <span class="item-title">支付信息</span>
      <el-row type="flex">
        <el-form-item label="订单金额(元):">
          <span>{{detail.orderAmount}}</span>
        </el-form-item>

        <el-form-item label="手续费(元):">
          <span>{{detail.rateAmount}}</span>
        </el-form-item>
      </el-row>

      <el-row type="flex">
        <el-form-item label="支付金额(元):">
          <span>{{detail.payAmount}}</span>
        </el-form-item>
        <el-form-item label="优惠(元):">
          <span>{{detail.freeAmount}}</span>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as Api from 'api'

  export default {
    props: {
      model: {}
    },
    data() {
      return {
        isLoading: false,
        detail: {}
      }
    },
    watch: {
      'model': {
        immediate: true,
        handler: function (val) {
          this.model = val
          this._doQuery()
        }
      }
    },
    methods: {
      _doQuery() {
        this.isLoading = true
        Api.getUserOrderDetail({
          orderId: this.model.orderId,
          orderType: this.model.orderType
        }).then(resp => {
          this.isLoading = false
          if (resp.data.code === Api.ERR_OK) {
            this.detail = resp.data.data
          } else {
            this.detail = null
          }
        })
      }
    },
    components: {
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .customDialog
    .item-title {
      width 100%
      font-size 16
      font-weight bold
      color black
      display block
      padding 10px 0
      border-bottom 1px dashed gray
    }
    .el-form-item {
      width: 50%;
      height: 20px
      margin-bottom 10px
    }

    .el-form-item__label {
      width: 30%;
    }

  .el-col
    span
      font-size 14px
</style>
