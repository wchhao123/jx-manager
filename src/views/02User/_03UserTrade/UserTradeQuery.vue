<template>
  <div>
    <el-form class="toolbar demo-form-inline" :inline="true" :model="queryModel" label-position="right">
      <el-row>
        <el-form-item label="用户账号">
          <el-input size="small" placeholder="请输入用户手机号" v-model="queryModel.mobile"></el-input>
        </el-form-item>

        <el-form-item label="交易类型">
          <el-select size="small" v-model="queryModel.transType" filterable clearable placeholder="请选择交易类型">
            <el-option
              v-for="item in _userTradeTypeResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="交易时间">
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
          <el-button size="small" type="primary" icon="el-icon-search"
                     style="margin-bottom: 10px; margin-left: 50px"
                     :disabled="isLoading"
                     @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="userTradeTable" :data="dataList" style="width: 100%" border v-loading="isLoading">
      <!--交易时间-->
      <el-table-column align="center" label="交易时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.clearingDate | filterdateYMDHMS}}</span>
        </template>
      </el-table-column>

      <!--用户账号-->
      <el-table-column align="center" label="用户账号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <!--交易金额(元)-->
      <el-table-column align="center" label="交易金额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.transAmt}}</span>
        </template>
      </el-table-column>

      <!--交易后余额-->
      <el-table-column align="center" label="交易后余额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.afterBalance}}</span>
        </template>
      </el-table-column>

      <!--交易类型-->
      <el-table-column align="center" label="交易类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.transType | filterUserTradeType}}</span>
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

<script>
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import * as filters from 'filters'
  export default {
    data () {
      return {
        isLoading: false,
        selectDate: '',
        totalCount: 10,
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        dataList: [],
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
      _userTradeTypeResource () {
        return state.funUserTradeType()
      }
    },
    methods: {
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery () {
        this.isLoading = true
        if (this.selectDate !== null && this.selectDate) {
          this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
          this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        Api.getUserTrade(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === Api.ERR_OK) {
            this.dataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        })
      },
      pageChange() {},
      pageHandelCurrentChange (val) {
        console.log('点击分页查询')
        this.queryModel.pageNum = val
        this.doQuery()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
