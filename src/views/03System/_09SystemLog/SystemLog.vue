<template>
    <div>
      <el-form :inline="true" label-position="right" class="toolbar demo-form-inline" label-width="100px">
        <el-row typeof="flex" justify="space-between">
          <el-col :span="8">
          <el-form-item label="错误Id">
            <el-input size="small" v-model="queryModel.errorId"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="错误类型">
            <el-select size="small" v-model="queryModel.errorType" filterable clearable placeholder="请选择错误类型">
              <el-option
                v-for="item in _systemErrorTypeSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="job执行状态">
            <el-select size="small" v-model="queryModel.jobState" filterable clearable placeholder="请选择job执行状态">
              <el-option
                v-for="item in _systemJobTypeSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-form-item label="创建时间">
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
          <el-col style="position: absolute;right: 100px;">
            <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
            </el-button>
          </el-col>
        </el-row>

      </el-form>
      <el-table :data="dataList" style="width: 100%" border v-loading="isLoading">
        <el-table-column align="center" label="错误编号" width="140">
          <template slot-scope="scope">
            <span size="small" class="globalPointer" @click.stop="toErrorDetail(scope.$index,scope.row)">{{scope.row.errorId}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="错误类型" width="140">
          <template slot-scope="scope">
            <span size="small">{{scope.row.errorType | filterSysteErrorType}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="业务编号" width="140">
          <template slot-scope="scope">
            <span size="small">{{scope.row.businessId}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="job状态" width="140">
          <template slot-scope="scope">
            <span size="small">{{scope.row.jobState | filterSystemJobType}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="报错时间" width="180">
          <template slot-scope="scope">
            <span size="small">{{scope.row.createTime | filterdateYMDHMS}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="job提交时间" width="180">
          <template slot-scope="scope">
            <span size="small">{{scope.row.updateTime | filterdateYMDHMS}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="错误信息">
          <template slot-scope="scope">
            <span size="small">{{scope.row.errorMsg}}</span>
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
      <el-dialog title="错误日志详情" center="" :visible.sync="detail.visiable" width="60%">
        <error-detail :detail="this.detail.model" @cancelEdit="cancelEdit">
        </error-detail>
      </el-dialog>
    </div>
</template>

<script>
  import * as Api from 'api'
  import * as state from 'common/js/state-dic'

  import ErrorDetail from './ErrorDetail'
  export default {
    data () {
      return {
        isLoading: false,
        totalCount: 0,
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        dataList: [],
        detail: {
          visiable: false,
          model: ''
        },
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
    computed: {
      _systemErrorTypeSource() {
        return state.funSystemErrorType()
      },
      _systemJobTypeSource() {
        return state.funSystemJobState()
      }
    },
    methods: {
      doQuery() {
        this.isLoading = true
        if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
          this.queryModel.startDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[0])
          this.queryModel.endDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        Api.getErrorLog(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === Api.ERR_OK) {
            this.dataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        })
      },
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      toErrorDetail(index, row) {
        console.log(`点击查看错误详情 row ${row}}`)
        console.log(row)

        this.detail.model = JSON.parse(JSON.stringify(row))
        this.detail.visiable = true
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
      },
      cancelEdit(val) {
        this.detail.visiable = false
        if (val.toString() === '1') {
          this.doQuery()
        }
      }
    },
    components: {
      ErrorDetail
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
