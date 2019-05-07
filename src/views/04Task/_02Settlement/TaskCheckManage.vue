<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">
        <ent-select title="发布企业" place-holder="请输入发布企业"
                    @input-select="salaryInputSelect">
        </ent-select>
        <el-form-item :span="6" label="手机号码">
          <el-input size="small" clearable v-model="queryModel.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="任务名称">
          <el-input size="small" clearable v-model="queryModel.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="运营主企业">
          <el-input size="small" clearable v-model="queryModel.operationEntName" placeholder="请输入运营主企业名称"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item :span="6" label="姓名">
          <el-input size="small" clearable v-model="queryModel.userName" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="工作状态">
          <el-select size="small" v-model="queryModel.workState" filterable clearable placeholder="请选择工作状态">
            <el-option
              v-for="item in taskWorkSource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :span="6" label="任务编号">
          <el-input size="small" clearable v-model="queryModel.taskId" placeholder="请输入任务编号"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="left">
      <el-col>
        <el-form-item label="开始工作时间">
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
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="entSignAuditTable" :data="entTaskList" style="width: 100%" border v-loading="isLoading">

      <el-table-column align="center" label="用户姓名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <!--发薪企业-->
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <!--运营主企业-->
      <el-table-column align="center" label="工作状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.workState| filterTaskWorkState()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="验收次数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.checkNum}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.taskId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务名称">
        <template slot-scope="scope">
          <span >{{scope.row.taskName}}</span>
        </template>
      </el-table-column>
      <!--发放总人数-->
      <el-table-column align="center" label="发布企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.operationEntName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="170" align="center" label="开始工作时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.startDate| filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button  @click="readWorkReport(scope.row)"
                      type="primary" plain size="small">查看工作汇报
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-col :span="24" class="toolbar">
      <div class="block">
        <el-pagination
          @size-change="pageChange"
          @current-change="pageHandelCurrentChange"
          :current-page="queryModel.pageNum"
          :page-size="queryModel.pageSize"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-col>
    <el-dialog title="工作进展汇报" center :close-on-click-modal=false
               :visible.sync="detail.visiable"
               width="60%">
      <task-work-report :recordId="detail.recordId" @Close="closeDiaLog"></task-work-report>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import * as filters from 'filters'
  import { ERR_OK } from '../../../api/index'
  import TaskWorkReport from './TaskWorkReport'
  export default {
    data () {
      return {
        detail: {
          visiable: false
        },
        isLoading: false,
        selectDate: '',
        tableSpan: 2,
        totalCount: 0,
        inputDataList: {
          salaryDataList: []
        },
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        entTaskList: [],
        editIndex: null,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    components: {
      TaskWorkReport
    },
    computed: {
      taskWorkSource () {
        return state.funTaskWorkState()
      }
    },
    methods: {
      salaryInputSelect (entId) {
        if (entId !== undefined) {
          this.queryModel.salaryEntId = entId
        } else {
          this.queryModel.salaryEntId = null
        }
        console.log(this.queryModel.salaryEntId)
      },
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery () {
        this.isLoading = true
        let _salaryMonth = this.queryModel.salaryMonth
        this.queryModel.salaryMonth = filters.filterDateYYYYMM(this.queryModel.salaryMonth)
        if (this.selectDate !== null && this.selectDate) {
          this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
          this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        Api.getTaskCheckList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.entTaskList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
          this.queryModel.salaryMonth = _salaryMonth
        })
      },
      closeDiaLog(){
        this.detail.visiable = false
      },
      readWorkReport(row) {
        console.log(row)
        this.detail.visiable = true;
        this.detail.recordId = row.recordId
      },
      pageHandelCurrentChange (val) {
        this.queryModel.pageNum = val
        this.doQuery()
        console.log('pageHandelCurrentChange')
        console.log(this.queryModel)
        console.log(val)
      },
      pageChange (val) {
        console.log('pageChange')
        console.log(val)
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
