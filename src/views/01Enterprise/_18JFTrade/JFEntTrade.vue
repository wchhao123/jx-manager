<template>
  <div>
    <el-form :inline="true" :model="queryModel" class="toolbar demo-form-inline">
      <el-row type="flex">
        <el-col>
          <ent-select title="发薪企业名称" place-holder="发薪企业名称"
                      :model="queryModel.e_eid"
                      @input-select="salaryInputSelect">
          </ent-select>
        </el-col>
        <el-col>
          <el-form-item label="员工编号">
            <el-input size="small" v-model="queryModel.e_uid" placeholder="若查询员工 企业名称失效"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="交易时间" required>
            <el-date-picker
              v-model="selectDateRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="dataList" style="width: 100%" border v-loading="isLoading">

      <el-table-column align="center" label="企业编号">
        <template slot-scope="scope">
          <span size="small">{{queryModel.e_eid && queryModel.e_eid.length > 1 ? queryModel.e_eid  : '- -'}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="员工编号">
        <template slot-scope="scope">
          <span size="small">{{queryModel.e_uid && queryModel.e_uid.length > 1 ? queryModel.e_uid  : '- -'}}</span>
        </template>
      </el-table-column>

      <!--交易金额-->
      <el-table-column align="center" label="交易金额">
        <template slot-scope="scope">
          <span size="small">{{scope.row.amount | filterF2Y}}</span>
        </template>
      </el-table-column>

      <!--余额-->
      <el-table-column align="center" label="余额">
        <template slot-scope="scope">
          <span size="small">{{scope.row.balance | filterF2Y}}</span>
        </template>
      </el-table-column>

      <!--类型-->
      <el-table-column align="center" label="交易类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.type | filterJFFlowType}}</span>
        </template>
      </el-table-column>

      <!--日期-->
      <el-table-column align="center" label="交易时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.date | formatDate}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <div class="block">
        <el-pagination
          @size-change="pageChange"
          @current-change="pageHandelCurrentChange"
          :current-page="queryModel.page"
          :page-size="queryModel.size"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
  import EntSelect from 'components/select/EntSelect'
  import * as filters from 'filters'
  import * as Api from 'api'

  export default {
    data () {
      return {
        isLoading: false,
        totalCount: 0,
        queryModel: {
          page: 1,
          size: 10,
          e_uid: '',
          e_eid: ''
        },
        dataList: '',
        selectDateRange: '',
        pickerOptions: {
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
    methods: {
      salaryInputSelect (entId) {
        if (entId !== undefined) {
          this.queryModel.e_eid = entId
        } else {
          this.queryModel.e_eid = null
        }
        console.log(this.queryModel.e_eid)
      },
      resetDoQuery() {
        this.queryModel.page = 1
        this.doQuery()
      },
      doQuery () {
        if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
          this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDateRange[0])
          this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDateRange[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
          this.$message({
            type: 'error',
            message: '请选择交易时间'
          })
          return
        }
        this.isLoading = true
        Api.getJFTradeList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === Api.ERR_OK) {
            this.dataList = response.data.data.data
            this.totalCount = response.data.data.total
          } else {
            this.dataList = []
            this.totalCount = 0
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })
      },
      pageHandelCurrentChange (val) {
        this.queryModel.page = val
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

</style>
