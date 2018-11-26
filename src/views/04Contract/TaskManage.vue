<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">
        <ent-select title="结算企业" place-holder="请选择结算企业"
                    @input-select="salaryInputSelect">
        </ent-select>
        <el-form-item :span="1">
        </el-form-item>
        <el-form-item :span="6" label="任务名称">
          <el-input size="small" clearable v-model="queryModel.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="任务编号">
          <el-input size="small" clearable v-model="queryModel.taskId" placeholder="请输入任务编号"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
          <el-form-item label="任务状态">
            <el-select size="small" v-model="queryModel.state" filterable clearable placeholder="请选择任务状态">
              <el-option
                v-for="item in taskStateSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="创建时间">
            <el-date-picker
              v-model="selectDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
      </el-row>
      <el-row type="flex" justify="left">
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="entSignAuditTable" :data="entTaskList" style="width: 100%" border v-loading="isLoading">

      <el-table-column align="center" label="企业编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entId}}</span>
        </template>
      </el-table-column>
      <!--发薪企业-->
      <el-table-column align="center" label="企业名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName}}</span>
        </template>
      </el-table-column>

      <!--运营主企业-->
      <el-table-column align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.operationEntName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="企业管理员">
        <template slot-scope="scope">
          <span size="small">{{scope.row.adminName}}</span>
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
      <!--发放总人数-->
      <el-table-column align="center" label="需要人数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.peopleCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名人数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signUpTotal}}</span>
        </template>
      </el-table-column>
      <!--批次状态-->
      <el-table-column align="center" label="任务状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.state | filterTaskListState()}}</span>
        </template>
      </el-table-column>
      <!--提交时间-->
      <el-table-column width="170" align="center" label="创建时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button  @click="toSignInList(scope.row)"
                     type="primary" plain size="small">查看报名详情
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
  </div>
</template>

<script type="text/ecmascript-6">
  import EntSelect from 'components/select/EntSelect'
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import * as filters from 'filters'
  import { ERR_OK } from '../../api/index'
  export default {
    data () {
      return {
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
    computed: {
      taskStateSource () {
        return state.funTaskListState()
      },
      typeTaskListSource () {
        return state.typeTaskListState()
      }
    },
    methods: {
      salaryInputSelect (entId) {
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
        Api.getTaskList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.entTaskList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
          this.queryModel.salaryMonth = _salaryMonth
        })
      },
      toSignInList(row) {
        console.log(row)
        debugger
        if (row.signUpTotal === '0') {
          this.open4()
          return
        }
        this.$router.push({
          path: '/task_sign_in',
          name: '报名管理',
          params: {taskId: row.taskId}
        })
      },
      open4() {
        this.$notify({
          title: '警告',
          message: '该任务暂无用户报名！',
          type: 'warning'
        })
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
    },
    components: {
      EntSelect
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
