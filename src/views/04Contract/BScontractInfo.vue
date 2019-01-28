<template>
  <section id="contractInfo" v-loading="isLoading">
    <div>
    <el-form :inline="true"  :model="contractDetail" label-position="right" class="toolbar form-inline">
      <el-row>
        <el-form-item label="合同编号">
          <span  >{{contractDetail.contractId}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="文件编号">
          <span   >{{contractDetail.fid}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="用户编号">
          <span   >{{contractDetail.userId}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="合同创建者">
          <span >{{contractDetail.senderAccount}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="合同标题">
          <span  >{{contractDetail.title}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="合同签署截止时间">
          <span >{{contractDetail.expireTime}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="发送时间">
          <span >{{contractDetail.sendTime}}</span>
        </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="完成时间">
        <span >{{contractDetail.finishTime}}</span>
      </el-form-item>
    </el-row>
      <el-row>
        <el-form-item label="合同签署者">
          <span  >{{contractDetail.signers}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="合同页数">
          <span>{{contractDetail.pages+' 页'}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="合同状态">
          <span>{{contractDetail.status}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="开发者编号">
          <span>{{contractDetail.developerId}}</span>
        </el-form-item>
      </el-row>
    </el-form>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      extContractId: ''
    },
    data () {
      return {
        queryUrl: '/get_contract_info',
        isLoading: false,
        contractDetail: {
          fid: '',
          senderAccount: '',
          userId: '',
          expireTime: null,
          title: '',
          sendTime: '',
          finishTime: '',
          signers: [],
          developerId: '',
          pages: '',
          contractId: '',
          status: ''
        },
        queryModel: {
          extContractId: ''
        },
        detail: {
          title: '',
          visiable: false,
          entInfo: {}
        }
      }
    },
    watch: {
      extContractId: {
        immediate: true,
        handler: function (val) {
          console.log(val)
          this.queryModel.extContractId = val
          console.log(this.queryModel.extContractId)
          this.getBsContractInfo()
        }
      }
    },
    methods: {
      getBsContractInfo() {
        if (this.extContractId === '') {
          return
        }
        this.isLoading = true
        debugger
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          this.contractDetail = response.data
          this.contractDetail.expireTime = this.$filter.filterDateYYYYMMDD(parseInt(this.contractDetail.expireTime) * 1000)
          this.contractDetail.signers = JSON.parse(this.contractDetail.signers)
          console.log(this.contractDetail)
          this.isLoading = false
        }, err => {
          this.isLoading = false
          console.log(err)
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
