<template>
  <div class="customDialog">
    <el-form ref="entInfo" :model="detail" v-if="detail" :rules="rules" class="toobar"
             label-position="left">
      <span v-show="detail.orderNo" class="item-title">{{detail.orderType | filterRechargeOrderChanelTipType }} {{detail.orderNo}}</span>
      <span class="item-title">订单基本信息</span>
      <el-row type="flex">
        <el-form-item label="订单号:" :span="10">
          <span>{{detail.orderId}}</span>
        </el-form-item>

        <el-form-item label="充值企业:" :span="10">
          <span>{{detail.entName}}</span>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="订单状态:">
          <span>{{detail.orderState | filterEntRechargeOrderState}}</span>
        </el-form-item>

        <!--<el-form-item label="提交时间:">-->
          <!--<span>{{detail.createTime | filterdateYMDHMS}}</span>-->
        <!--</el-form-item>-->
        <el-form-item label="订单时间:">
          <span>{{detail.createDate | filterdateYMDHMS}}</span>
        </el-form-item>
      </el-row>
      <!--<el-row type="flex">-->
        <!--<el-form-item label="审批状态:">-->
          <!--<span>{{detail.verifyState | filterEntRechargeOrderVerifyState}}</span>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="审批时间:">-->
          <!--<span>{{detail.verifyDate | filterdateYMDHMS()}}</span>-->
        <!--</el-form-item>-->
      <!--</el-row>-->
      <span class="item-title">充值基本信息</span>
      <el-row type="flex">
        <el-form-item label="订单总金额(元):">
          <span>{{detail.payAmount}}</span>
        </el-form-item>

        <el-form-item label="充值金额(元):">
          <span>{{detail.orderAmount}}</span>
        </el-form-item>
      </el-row>

      <el-row type="flex">
        <el-form-item label="服务费(元):">
          <span>{{detail.freeAmount}}</span>
        </el-form-item>

        <el-form-item label="服务费率:">
          <span>{{detail.rate}}%</span>
        </el-form-item>
      </el-row>

      <span class="item-title">提交信息</span>

      <el-row type="flex">
        <el-form-item label="提交人:">
          <span>{{detail.subName}}</span>
        </el-form-item>

        <el-form-item label="提交人账号:">
          <span>{{detail.subMobile}}</span>
        </el-form-item>
      </el-row>

      <el-row type="flex">
        <el-form-item label="关联主企业:">
          <span>{{detail.operationEntName}}</span>
        </el-form-item>

        <el-form-item label="超级管理员账号:">
          <span>{{detail.adminMobile}}</span>
        </el-form-item>
      </el-row>

      <section v-show="detail.orderType === '04' || detail.orderType === '05'">
      <span class="item-title">收款信息</span>
      <el-row type="flex">
        <el-form-item label="收款方:">
          <span>{{detail.receiverBankAccountName}}</span>
        </el-form-item>
        <el-form-item label="银行名称:">
          <span>{{detail.receiverBankName}}</span>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="银行账号:">
          <span>{{detail.receiverBankcardNo}}</span>
        </el-form-item>
      </el-row>
      </section>
      <!--<span class="item-title">付款信息</span>-->
      <!--<el-row type="flex">-->
        <!--<el-form-item label="付款方:">-->
          <!--<span>{{detail.payerBankAccountName}}</span>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="银行名称:">-->
          <!--<span>{{detail.payerBankName}}</span>-->
        <!--</el-form-item>-->
      <!--</el-row>-->
      <!--<el-row type="flex">-->
        <!--<el-form-item label="银行账号:">-->
          <!--<span>{{detail.payerBankcardNo}}</span>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="扣款凭证:" v-show="detail.voucher">-->
          <!--<img ref="voucher" style="width: 50px; height: 50px" :src="detail.voucher" @click="showEntImg">-->
          <!--<img  style="width: 50px; height: 50px; visibility: hidden">-->
        <!--</el-form-item>-->
      <!--</el-row>-->

    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { doEntVerify } from 'api'
  import { ERR_OK } from '../../../api/index'
  import ElForm from '../../../../node_modules/element-ui/packages/form/src/form.vue'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item.vue'

  export default {
    props: {
      isAudit: {
        type: Boolean,
        default: false
      },
      detail: {},
      isEdit: false,
      rules: {}
    },
    beforeUpdate() {
      this.isShowBigImg = false
      console.log('beforeUpdate')
    },
    updated() {
//      this.isShowBigImg = false
      console.log('updated')
    },
    data () {
      return {
        style: {
          inputspan: 14
        },
        isShowBigImg: false,
        model: {}
      }
    },
    computed: {
      entAddress () {
        return this.model.province + this.model.city + this.model.address
      }
    },
    watch: {
      isShowBigImg(val) {
        if (this.isShowBigImg === true) {
          this.$refs.voucher.style = `width:500px;height:700px;position:absolute;left:50%;margin-left:-400px;top:10;margin-top:-500px;z-index:100`
        } else {
          this.$refs.voucher.style = `width: 50px; height: 50px`
        }
      }
    },
    methods: {
      _doEntVerify (state) {
        // 2 拒绝 3 通过
        doEntVerify({entId: this.detail.entId, verifyState: state}).then(response => {
          if (response.data.code === ERR_OK) {
            this.detail.verifyState = state
            this.$message({
              message: '操作已完成',
              type: 'sucess'
            })
          } else {
            this.$message({
              message: '操作异常',
              type: 'warning'
            })
          }
          this.$emit('done', this.detail.verifyState)
        })
      },
      showEntImg () {
        console.log('你点击了图片')
        this.isShowBigImg = !this.isShowBigImg
      }
    },
    components: {
      ElFormItem,
      ElRow,
      ElForm
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
