<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">

        <!-- 批次号-->
        <el-form-item :span="6" label="结算批次号">
          <el-input size="small" clearable v-model="queryModel.salaryId" placeholder="请输入结算批次号"></el-input>
        </el-form-item>

        <ent-select title="企业名称" place-holder="请输入企业名称"
                    @input-select="salaryInputSelect">
        </ent-select>
        <el-form-item :span="6" label="任务名称">
          <el-input size="small" clearable v-model="queryModel.salaryName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="结算方式">
          <el-select size="small"  v-model="queryModel.payType" filterable clearable  placeholder="全部">
          <el-option
            v-for="(item, index) of this.$state.taskSettlementType"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row type="flex">
          <el-form-item label="批次状态">
            <el-select size="small" v-model="queryModel.salaryState" filterable clearable placeholder="请选择批次状态">
              <el-option
                v-for="item in taskStateSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item :span="6" label="任务编号">
          <el-input size="small" clearable v-model="queryModel.businessId" placeholder="请输入任务编号"></el-input>
        </el-form-item>
          <el-form-item label="结算时间">
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
        <el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="doExportSalaryList" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_task_export')">导出
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="entSignAuditTable" :data="entSalaryList" style="width: 100%" border v-loading="isLoading">

      <!--批次号-->
      <el-table-column align="center" label="结算批次号" fixed>
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryId}}</span>
        </template>

      </el-table-column>
      <!--工资表名称-->
      <!--<el-table-column align="center" label="工资表名称">-->
        <!--<template slot-scope="scope">-->
          <!--<span size="small">{{scope.row.salaryName}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

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
      <!--<el-table-column align="center" label="企业管理员">-->
        <!--<template slot-scope="scope">-->
          <!--<span size="small">{{scope.row.adminName}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="任务编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.businessId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryName}}</span>
        </template>
      </el-table-column>
      <!--发放总人数-->
      <el-table-column align="center" label="结算人数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.peopleCount}}</span>
        </template>
      </el-table-column>

      <!--应发总额-->
      <!--<el-table-column align="center" label="应发总额(元)">-->
        <!--<template slot-scope="scope">-->
          <!--<span size="small">{{scope.row.payableAmount}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--实发总额-->
      <el-table-column align="center" label="实发总额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.realAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算方式">
        <template slot-scope="scope">
          <span size="small">{{scope.row.payType| filterTaskSettlementType()}}</span>
        </template>
      </el-table-column>
      <!--批次状态-->
      <el-table-column align="center" label="批次状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryState | filterTaskState()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="撤回总额">
        <template slot-scope="scope">
          <span size="small">{{scope.row.refundAmount}}</span>
        </template>
      </el-table-column>


      <!--提交时间-->
      <el-table-column width="170" align="center" label="结算时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createTime | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button  @click="toSalaryDetail(scope.row)"
                     type="primary" plain size="small">查看详情
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
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import * as filters from 'filters'
  import { ERR_OK } from '../../../api/index'
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
          pageSize: 10,
          salaryType: 7
        },
        entSalaryList: [],
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
        return state.funTaskState()
      },
      taskTypeSource () {
        return state.typeTaskState()
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
        Api.getEntTaskList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.entSalaryList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
          this.queryModel.salaryMonth = _salaryMonth
        })
      },
      doExportSalaryList () {
        this.$confirm('确认需要导出结算批次数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
          Api.getTaskExport(this.queryModel).then(resp => {
            this.queryModel.salaryMonth = _salaryMonth
            this.isLoading = false
            let data = resp.data
            if (!data) {
              return
            }
            let blob = new Blob([data], {type: 'application/vnd.ms-excel'})
            let objectUrl = URL.createObjectURL(blob)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = objectUrl
            link.setAttribute('download', '结算批次.xls')
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
      toSalaryDetail(row) {
        console.log('toSalaryDetail')
        console.log(row)
        this.$router.push({
          path: '/task_settlement_detail',
          name: '结算批次详情查询',
          params: {salaryId: row.salaryId}
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
