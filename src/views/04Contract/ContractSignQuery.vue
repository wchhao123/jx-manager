<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline" label-width="100px">
      <el-row typeof="flex" justify="space-between">
        <!-- 批次号-->
        <el-col :span="7">
        <el-form-item  label="批次号">
          <el-input size="small" clearable v-model="queryModel.batchId" placeholder="请输入批次号"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="7">
        <el-form-item label="合同编号">
          <el-input size="small" clearable v-model="queryModel.signId" placeholder="请输入合同编号"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="7">
        <el-form-item  label="用户姓名">
          <el-input size="small" clearable v-model="queryModel.userName" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        </el-col>

      </el-row>
      <el-row typeof="flex" justify="space-between">
        <el-col :span="7">
          <el-form-item  label="用户手机号">
            <el-input size="small" clearable v-model="queryModel.mobile" placeholder="请输入用户手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
        <el-form-item label="签约状态">
          <el-select size="small" v-model="queryModel.signState" filterable clearable placeholder="请选择签约状态">
            <el-option
              v-for="(item, index) in this.$state.contractSignState"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="7">
        <ent-select title="企业名称" place-holder="请输入企业名称"
                    @input-select="(index) => {index !== undefined ?  this.queryModel.entId = index: this.queryModel.entId = null}">
        </ent-select>
        </el-col>

      </el-row>
      <el-row typeof="flex" justify="space-between">
        <el-col :span="7">
          <el-form-item label="合同类型">
            <el-select size="small" v-model="queryModel.contractType" filterable clearable placeholder="请选择合同类型">
              <el-option
                v-for="(item, index) in this.$state.contractType"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="签约主体">
            <el-select size="small" v-model="queryModel.cooperateEntName" filterable clearable placeholder="请输入签约主体名称">
              <el-option
                v-for="(item, index) of this.$store.getters.cooperateEntName"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
        <el-form-item label="签约发起时间">
          <el-date-picker
            v-model="selectDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="请输入开始时间"
            end-placeholder="请输入结束时间"
            :picker-options="this.$state.pickerOptions2">
          </el-date-picker>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="left">
          <el-col :span="3">
            <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="doExportList" >导出明细
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button size="small" type="danger" icon="el-icon-download" style="margin-bottom: 10px" @click="doExportSalaryList" >下載合同
            </el-button>
          </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger"  icon="el-icon-check"  style="margin-bottom: 10px" @click="rollBack" >撤销合同
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger"   icon="el-icon-check" style="margin-bottom: 10px" @click="sendAgain" >重新发送
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger"  icon="el-icon-check"  style="margin-bottom: 10px" @click="signRemind" >签约提醒
          </el-button>
        </el-col>
          <el-col :span="3">
            <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
            </el-button>
          </el-col>
      </el-row>
    </el-form>

    <el-table ref="ContractSignTable" :data="dataList" style="width: 100%" border v-loading="isLoading"
              @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!--批次号-->
      <el-table-column align="center" label="批次号" fixed>
        <template slot-scope="scope">
          <span size="small">{{scope.row.batchId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="第三方合同编号">
        <template slot-scope="scope">
          <span  class="globalPointer" size="small" @click="getContractInfo(scope.row)">{{scope.row.extContractId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同名称">
        <template slot-scope="scope">
          <span class="globalPointer" size="small"  @click="getContractPage(scope.row)">{{scope.row.contractName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.contractType | filterContractType()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="企业名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签约主体">
        <template slot-scope="scope">
          <span size="small">{{scope.row.contractType === '2'? scope.row.cooperateEntName:'==' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签约状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signState | filterContractSignState()}}</span>
        </template>
      </el-table-column>
      <!--批次状态-->
  <!--    <el-table-column align="center" label="合同到期日">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createTime | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>-->

      <!--提交时间-->
     <!-- <el-table-column align="center" label="签约截止日期">
        <template slot-scope="scope">
          <span size="small">{{scope.row.abortDate | filterDateYYYYMMDD()}}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="签约发起时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签署时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <div class="block">
        <el-pagination
          @size-change="(val) =>{console.log('pageChange')
          console.log(val)}"
          @current-change="(val) =>{this.queryModel.pageNum = val
          this.doQuery()}"
          :current-page="queryModel.pageNum"
          :page-size="queryModel.pageSize"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-col>
    <el-dialog :title="detail.title" center width="50%"
               :close-on-click-modal="1==0"
               @close="() => {this.detail.contractInfo=''}"
               :visible.sync="detail.visiable">
      <contract-info :detail-info="detail.contractInfo"  @cancelEdit="_closeContractInfo"></contract-info>
    </el-dialog>
    <el-dialog :title="confirm.title" center width="50%"
               :close-on-click-modal="1==0"
               :before-close="_closeConfirm"
               :visible.sync="confirm.visiable">
      <confirm-send :detail="confirm.contractSignDetails" @close="_closeConfirm"></confirm-send>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import contractInfo from './BScontractInfo'
import confirmSend from 'views/04Task/_02Settlement/confirmSend.vue'
import axios from 'axios'
import { http } from '../../api/index'
  export default {
    data () {
      return {
        detail: {
          title: '上上签合同信息详情',
          visiable: false,
          contractInfo: {}
        },
        contractTitle: '合同协议',
        queryUrl: '/contract_sign',
        multipleSelection: [],
        details:[],
        signIds:[],
        isLoading: false,
        visible: false,
        selectDate: '',
        totalCount: 0,
        queryModel: {
          pageNum: 1,
          pageSize: 10,
          salaryType: 7
        },
        dataList: [],
        editIndex: null,
        contractSignDetails:'',
        confirm: {
          title: '确认重新给以下用户发送合同',
          visiable: false
        },
      }
    },
    components: {
     contractInfo,
      confirmSend
    },
    watch: {
      '$route': {
        immediate: true,
        handler: 'getParams'
      },
      selectDate () {
        if (this.selectDate !== null && this.selectDate) {
          this.queryModel.startDate = this.$filter.filterDateYYYYMMDD(this.selectDate[0])
          this.queryModel.endDate = this.$filter.filterDateYYYYMMDD(this.selectDate[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.ContractSignTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.ContractSignTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = []
        this.details = []
        val.forEach((item, index, arr) => {
          this.details.push(item)
          this.multipleSelection.push(item.signId)
        })
      },
      getContractPage(row) {
        if (row.contractUrl) {
          window.open(row.contractUrl)
        } else {
          this.$notify({
            title: '警告',
            message: '该用户暂无合同信息！',
            type: 'warning'
          })
        }
      },
      getParams(r) {
        let name = this.$route.name
        if (name === '合同签约管理' && this.$route.params.batchId !== undefined) {
          this.queryModel = {
            pageNum: 1,
            pageSize: 10
          }
          this.selectDateRange = ''
          let batchId = this.$route.params.batchId
          this.queryModel.batchId = batchId
          if (!batchId || batchId.length < 1) {
            return
          }
          this.doQuery()
        }
      },
      doExportList() {
        this.$confirm('确认需要导出合同明细?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          let _salaryMonth = this.queryModel.salaryMonth
          this.queryModel.signIds = this.multipleSelection.toString()
          this.$export(this.$url('/contract_export'), this.queryModel).then(resp => {
            this.queryModel.salaryMonth = _salaryMonth
            this.isLoading = false
            let data = resp
            if (!data) {
              return
            }
            let blob = new Blob([data], {type: 'application/vnd.ms-excel'})
            let objectUrl = URL.createObjectURL(blob)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = objectUrl
            link.setAttribute('download', '合同明细.xls')
            document.body.appendChild(link)
            link.click()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      salaryInputSelect(entId) {
        if (entId !== undefined) {
          this.queryModel.entId = entId
        } else {
          this.queryModel.entId = null
        }
        console.log(this.queryModel.entId)
      },
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery() {
        this.isLoading = true
        this.queryModel.signIds = ''
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          this.dataList = response.data.list
          this.totalCount = response.data.totalCount
          this.isLoading = false
        }, err => {
          this.isLoading = false
          console.log(err)
        })
      },
      doExportSalaryList() {
        if (this.dataList.length < 1) {
          this.$notify({
            title: '警告',
            message: '暂无可导出合同签约信息！',
            type: 'warning'
          })
          return
        }
        this.$confirm('确认需要导出合同签约信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //contract_export
          this.isLoading = true
          this.queryModel.signIds = this.multipleSelection.toString()
          this.$post(this.$url('/contract_check'), this.queryModel).then(response => {
            console.log(response.date)
            // this.$export(this.$url('/contract_export'), this.queryModel).then(response => {
            //   this.isLoading = false
            //   if (!response) {
            //     return
            //   }
            //   let blob = new Blob([response])
            //   let objectUrl = URL.createObjectURL(blob)
            //   let link = document.createElement('a')
            //   link.style.display = 'none'
            //   link.href = objectUrl
            //   link.setAttribute('download', '合同文件.zip')
            //   document.body.appendChild(link)
            //   link.click()
            // }, err => {
            //   this.isLoading = false
            //   console.log(err)
            // })
          }, err => {
            this.isLoading = false
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      getContractInfo(contractInfo) {
        console.log(contractInfo)
        this.detail.contractInfo = contractInfo
        console.log(this.detail.contractInfo)
        this.detail.visiable = true
      },
      _closeContractInfo() {
        this.detail.visiable = false
        this.resetDoQuery()
      },
      rollBack() {
        this.signIds = []
        if (this.details.length < 1) {
          this.$message.warning('请选择需要撤销的合同！')
          return
        }
        this.details.forEach((item, index, arr) => {
          if (item.signState != '2') {
            this.$message.warning('只有签署中的合同才可以撤销！')
            throw new Error('error')
          }
          this.signIds.push(item.signId)
        })
        this.$confirm('撤销后收件人将无法查看合同，确认撤销所选合同?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          this.queryModel.signIds = encodeURI(JSON.stringify(this.signIds))
          this.$post(this.$url('/rollback_contract'), this.queryModel).then(resp => {
            this.$message({
              type: 'success',
              message: '撤回成功'
            })
            this.isLoading = false
            this.queryModel.signIds = ''
            this.doQuery()
          }, err => {
            this.$message({
              type: 'success',
              message: '撤回失败'
            })
            this.isLoading = false
            this.queryModel.signIds = ''
            this.doQuery()
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      sendAgain() {
        if (this.details.length < 1) {
          this.$message.warning('请选择需要重新发送的合同！')
          return
        }

        this.details.forEach((item, index, arr) => {
          if (item.signState != '7' && item.signState != '3') {
            this.$message.warning('只有签署异常和发送失败的合同才可重新发送！')
            throw new Error('error')
          }
        })
        for (var i = 0; i < this.details.length; i++) {
          for (var j = i + 1; j < this.details.length; j++) {
            if (this.details[i].entId == this.details[j].entId &&
              this.details[i].cooperateEntId == this.details[j].cooperateEntId &&
              this.details[i].templateId == this.details[j].templateId &&
              this.details[i].userId == this.details[j].userId) {
              this.$message.warning(this.details[i].signId + '和' + this.details[j].signId + '为重复合同，不能给同一用户发送相同合同！')
              throw new Error('error')
            }
          }
        }
        this.isLoading = true
        this.contractSignDetails = encodeURI(JSON.stringify(this.details))
        let token = sessionStorage.getItem('access_token')
        let config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }
        if (token !== null && token.toString().length > 1) {
          config.headers['Authorization-manage'] = token
        }
       // config.headers['Access-Control-Allow-Origin'] = '*'
        let formData = new FormData()
        formData.append('contractSignDetails', this.contractSignDetails)
        axios.post(http.prefix+'/table/task/confirmsendagain', formData, config).then(res => {
          this.isLoading = false
          this.confirm.visiable = true
          this.confirm.contractSignDetails = JSON.stringify(res.data.data)
          console.log(this.confirm.contractSignDetails)
        }, err => {
          console.log(err)
          this.$message.warning('系统繁忙！')
        })
      },
      _closeConfirm() {
        this.confirm.visiable = false
        this.confirm.contractSignDetails = ''
        this.resetDoQuery()
      },
      signRemind() {
        if (this.details.length < 1) {
          this.$message.warning('请选择需要发送签约提醒的合同！')
          return
        }
        this.details.forEach((item, index, arr) => {
          if (item.signState != '2') {
            this.$message.warning('只有签署中的合同才可发送签约提醒！')
            throw new Error('error')
          }
        })
        this.$confirm('确认发送签约提醒?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          this.queryModel.signIdList = encodeURI(JSON.stringify(this.multipleSelection))
          this.$post(this.$url('/send_signremind'), this.queryModel).then(resp => {
            this.$message({
              type: 'success',
              message: '发送成功'
            })
            this.isLoading = false
          }, err => {
            this.$message({
              type: 'success',
              message: '发送失败'
            })
            this.isLoading = false
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #recharge_manage_new .el-form-item {
    width: 100%;
  }

  #recharge_manage_new .el-form-item__label {
    width: 30%;
  }

  #recharge_manage_new .el-form-item__content {
    width: 70%;
  }

  #recharge_manage_new .el-form-item__content .el-select {
    width: 100%;
  }

  #recharge_manage_new .el-date-editor {
    width: 100%;
  }
</style>
