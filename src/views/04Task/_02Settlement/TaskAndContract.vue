<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">
        <el-form-item :span="6" label="合同编号">
          <el-input size="small" clearable v-model="queryModel.signId" placeholder="请输入合同编号"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="姓名">
          <el-input size="small" clearable v-model="queryModel.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="手机号">
        <el-input size="small" clearable v-model="queryModel.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item :span="1">
        </el-form-item>
      </el-row>

      <el-row type="flex">
        <el-form-item :span="6" label="合同名称">
          <el-input size="small" clearable v-model="queryModel.contractName" placeholder="请输入合同名称"></el-input>
        </el-form-item>
        <el-form-item label="合同类型">
          <el-select size="small" v-model="queryModel.contractType" filterable clearable placeholder="全部">
            <el-option
              v-for="(item, index) in this.$state.contractType"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <ent-select  title="发布企业" place-holder="请输入企业名称" @input-select="salaryInputSelect">
        </ent-select>
        <el-form-item label="合同状态">
          <el-select size="small" v-model="queryModel.state" filterable clearable placeholder="请选择合同状态">
            <el-option
              v-for="(item, index) of this.$state.contractState"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row type="flex">
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
        <el-form-item :span="6" label="任务编号">
          <el-input size="small" clearable v-model="queryModel.taskId" placeholder="请输入任务编号"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="任务名称">
         <el-input size="small" clearable v-model="queryModel.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
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
      </el-row>

      <el-row type="flex" justify="left">
        <el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="exportList">导出详情
          </el-button>
        </el-col>
        <el-col :span="3">
        <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="downloadContract">下载合同
        </el-button>
      </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="rollBack">撤销合同
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="sendAgain()">重新发送
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-check" style="margin-bottom: 10px" @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>
      <el-table ref="ContractTaskTable" :data="contractSignList"  border v-loading="isLoading"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="35">
        </el-table-column>
      <el-table-column align="center" label="合同编号" >
        <template slot-scope="scope">
          <span size="small">{{scope.row.signId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="证件类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.idType| filterUserIdNumType()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="证件号码">
        <template slot-scope="scope">
          <span size="small">{{scope.row.idNumber}}</span>
        </template>
      </el-table-column>
      <!--发薪企业-->
      <el-table-column align="center" label="合同名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.contractName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.contractType | filterContractType()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.state| filterContractState()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签约状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signState | filterContractSignState()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签约发起时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate| filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签署时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signDate| filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.taskId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.taskName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.selectState | filterSignInState()}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="操作"  align="center">
        <template slot-scope="scope">
          <el-button  @click="getContractPage(scope.row)"
                      type="primary" plain size="mini" style="padding: 2px" >查看合同
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-col :span="24" class="toolbar">
      <div class="block">
        <el-pagination
          @size-change="(val) =>{console.log('pageChange')
          console.log(val)}"
          @current-change="(val) =>{this.queryModel.pageNum = val
          this.resetDoQuery()}"
          :current-page="queryModel.pageNum"
          :page-size="queryModel.pageSize"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-col>
    <el-dialog :title="confirm.title" center width="50%"
               :close-on-click-modal="1==0"
               :before-close="_closeConfirm"
               :visible.sync="confirm.visiable">
      <confirm-send :detail="confirm.contractSignDetails" @close="_closeConfirm"></confirm-send>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import { ERR_OK } from '../../../api/index'
  import axios from 'axios'
  import ConfirmSend from './confirmSend'
  export default {
    components: {ConfirmSend},
    data () {
      return {
        queryUrl: '/get_task_contract',
        multipleSelection: [],
        isLoading: false,
        visible: false,
        totalCount: 0,
        selectDate: '',
        queryModel: {
          pageNum: 1,
          pageSize: 10,
          isTaskContract: '1'
        },
        confirm: {
          title: '确认重新给以下用户发送合同',
          visiable: false
        },
        contractSignList: [],
        contractSignDetails: '',
        signIds: []
      }
    },
    watch: {
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
      handleSelectionChange(val) {
        this.multipleSelection = []
        val.forEach((item, index, arr) => {
            this.multipleSelection.push(item)
        })
      },
      resetDoQuery() {
        this.isLoading = true
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          this.contractSignList = response.data.list
          this.totalCount = response.data.totalCount
          this.isLoading = false
        }, err => {
          this.isLoading = false
          console.log(err)
        })
      },
      salaryInputSelect (entId) {
        if (entId !== undefined) {
          this.queryModel.entId = entId
        } else {
          this.queryModel.entId = null
        }
        console.log(this.queryModel.entId)
      },
      downloadContract () {
        this.signIds = []
        if (this.contractSignList.length < 1) {
          this.$notify({
            title: '警告',
            message: '暂无可下载合同签约信息！',
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
          if (this.multipleSelection.length > 0) {
            this.multipleSelection.forEach((item, index, arr) => {
              this.signIds.push(item.signId)
            })
            this.queryModel.signIds = this.signIds.toString()
          }
          this.$post(this.$url('/contract_check'), this.queryModel).then(response => {
            this.$export(this.$url('/contract_export'), this.queryModel).then(response => {
              this.isLoading = false
              this.queryModel.signIds = ''
              if (!response) {
                return
              }
              let blob = new Blob([response])
              let objectUrl = URL.createObjectURL(blob)
              let link = document.createElement('a')
              link.style.display = 'none'
              link.href = objectUrl
              link.setAttribute('download', '合同文件.zip')
              document.body.appendChild(link)
              link.click()
            }, err => {
              this.isLoading = false
              console.log(err)
            })
          }, err => {
            this.queryModel.signIds = ''
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
      rollBack() {
        this.signIds = []
        if (this.multipleSelection.length < 1) {
          this.$message.warning('请选择需要撤销的合同！')
          return
        }
        this.multipleSelection.forEach((item, index, arr) => {
          if (item.signState!= '2') {
            this.$message.warning('只有签署中的合同才可以撤销！')
            throw new Error('error')
          }
          this.signIds.push(item.signId)
        })
        this.$confirm('确认需要撤销合同?', '提示', {
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
            this.resetDoQuery()
          }, err => {
            this.$message({
              type: 'success',
              message: '撤回失败'
          })
            this.isLoading = false
            this.queryModel.signIds = ''
            this.resetDoQuery()
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
        if (this.multipleSelection.length < 1) {
          this.$message.warning('请选择需要重新发送的合同！')
          return
        }

        this.multipleSelection.forEach((item, index, arr) => {
          if (item.signState != '7' && item.signState != '3') {
            this.$message.warning('只有签署异常和发送失败的合同才可重新发送！')
            throw new Error('error')
          }
        })
        for (var i = 0; i < this.multipleSelection.length; i++) {
          for (var j = i + 1; j < this.multipleSelection.length; j++) {
            if (this.multipleSelection[i].entId == this.multipleSelection[j].entId &&
              this.multipleSelection[i].extEntId == this.multipleSelection[j].extEntId &&
              this.multipleSelection[i].templateId == this.multipleSelection[j].templateId &&
              this.multipleSelection[i].userId == this.multipleSelection[j].userId) {
              this.$message.warning(this.multipleSelection[i].signId + '和' + this.multipleSelection[j].signId + '为重复合同，不能给同一用户发送相同合同！')
              throw new Error('error')
            }
          }
        }
           this.isLoading = true
            this.contractSignDetails = encodeURI(JSON.stringify(this.multipleSelection))
          let token = sessionStorage.getItem('access_token')
          let config = {
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }
        if (token !== null && token.toString().length > 1) {
          config.headers['Authorization-manage'] = token
        }
        let formData = new FormData()
        formData.append('contractSignDetails', this.contractSignDetails)
        axios.post('https://admin.99payroll.cn/jx-manage/table/task/confirmsendagain', formData, config).then(res => {
            this.isLoading = false
            this.confirm.visiable = true
            this.confirm.contractSignDetails = JSON.stringify(res.data.data)
            console.log(this.confirm.contractSignDetails)
          }, err => {
            console.log(err)
            this.$message.warning('系统繁忙！')
          })
      },
      getContractPage (row) {
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
      _closeConfirm() {
        this.confirm.visiable = false
        this.confirm.contractSignDetails = ''
        this.resetDoQuery()
      },
      exportList() {
        this.$confirm('确认需要导出任务合同明细?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          if (this.multipleSelection.length > 0) {
            console.log(JSON.stringify(this.multipleSelection))
            this.queryModel.dataList = encodeURI(JSON.stringify(this.multipleSelection))
          }
          this.$export(this.$url('/export_task_contract'), this.queryModel).then(resp => {
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
            link.setAttribute('download', '任务合同明细.xls')
            document.body.appendChild(link)
            link.click()
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
