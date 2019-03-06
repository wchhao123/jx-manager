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
          <span>{{contractDetail.pages}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="合同总状态">
          <span>{{contractDetail.status|filterContractStatus()}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="开发者编号">
          <span>{{contractDetail.developerId}}</span>
        </el-form-item>
      </el-row>
      <el-row>
      <el-col :span="3">
        <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px"  v-if="isShow"  @click="refreshContract">刷新数据
        </el-button>
      </el-col>
      </el-row>
    </el-form>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import * as Api from 'api'
  export default {
    props: {
      detailInfo: {}
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
        isShow: false,
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
      detailInfo: {
        immediate: true,
        handler: function (val) {
          this.detailInfo = val
          console.log(this.detailInfo)
          if (this.detailInfo!='') {
          this.queryModel.extContractId = this.detailInfo.extContractId
          console.log(this.queryModel.extContractId)
                    this.getBsContractInfo()
          }
        }
      }
    },
    methods: {
      getBsContractInfo() {
        if (this.extContractId === '') {
          return
        }
        this.isLoading = true
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          this.contractDetail = response.data
          this.contractDetail.expireTime = this.$filter.filterDateYYYYMMDD(parseInt(this.contractDetail.expireTime) * 1000)
          this.contractDetail.signers = JSON.parse(this.contractDetail.signers)
          this.contractDetail.pages = this.contractDetail.pages + '页'
          if (this.contractDetail.status == '5' && this.detailInfo.signState == '2') {
           this.isShow = true
          }
          if (this.contractDetail.status == '3' && this.detailInfo.signState == '2') {
            this.$post(this.$url('/get_signer_status'), this.queryModel).then(response => {
              if (response.data === '2') {
                this.isShow = true
              }
            })
          }
          console.log(this.contractDetail)
          this.isLoading = false
        }, err => {
          this.isLoading = false
          console.log(err)
        })
      },
      refreshContract () {
        this.$post(this.$url('/refresh_contract'), this.queryModel).then(response => {
          this.$message({
            type: response.code === Api.ERR_OK ? 'success' : 'error',
            message: response.msg
          })
          this.$emit('cancelEdit')
        }, err => {
          this.$message.warning('刷新失败！')
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  /deep/ .el-form-item__label{
   min-width:160px;
   text-align:left;
 }
</style>
