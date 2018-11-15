<template>
  <div class="customDialog">

    <span class="item-title">发放信息</span>

    <el-row type="flex" justify="center">
      <el-col :span="10"><span>银行卡号: </span><span>{{detail.bankNo}}</span></el-col>
      <el-col :span="10"><span>开户行名称: </span><span>{{detail.bankName}}</span></el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :span="10"><span>开户行所在省份: </span><span>{{detail.province}}</span></el-col>
      <el-col :span="10"><span>开户行所在城市: </span><span>{{detail.city}}</span></el-col>
    </el-row>
    <div v-show="detail.remark && detail.remark.length > 0">
      <span class="item-title">退款原因</span>
      <el-row>
        <span>{{detail.remark}}</span>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      detail: {}
    },
    data() {
      return {}
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

  .el-col
    span
      font-size 14px
</style>
