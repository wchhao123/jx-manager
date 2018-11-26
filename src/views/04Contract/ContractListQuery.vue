<template>
  <div>
    <el-form :inline=true :model="queryModel" label-position="right" class="toolbar form-inline">
      <el-row>
        <!-- 批次号-->
        <el-form-item label="批次号">
          <el-input size="small" clearable v-model="queryModel.batchId" placeholder="请输入批次号"></el-input>
        </el-form-item>
        <el-form-item label="合同名称">
          <el-input size="small" clearable v-model="queryModel.contractName" placeholder="请输入合同名称"></el-input>
        </el-form-item>
        <el-form-item label="合同类型">
          <el-select size="small" v-model="queryModel.contractType" filterable clearable placeholder="请选择合同类型">
            <el-option
              v-for="item in contractTypeSource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同状态">
          <el-select size="small" v-model="queryModel.state" filterable clearable placeholder="请选择合同状态">
            <el-option
              v-for="item in contractStateSource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
        <el-row>
          <el-col :span="6">
          <ent-select title="签约企业" place-holder="请输入签约企业"
                    @input-select="salaryInputSelect">
        </ent-select>
          </el-col>
          <el-col :span="15">
          <el-form-item label="签约发起时间">
            <el-date-picker
              v-model="selectDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="请输入开始时间"
              end-placeholder="请输入结束时间"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
            </el-button>
          </el-col>
        </el-row>
    </el-form>

    <el-table ref="ContractListTable" :data="dataList" style="width: 100%" border v-loading="isLoading">
      <!--批次号-->
      <el-table-column align="center" label="批次号" fixed>
        <template slot-scope="scope">
          <span class="globalPointer" size="small" @click="getContractSignDetail(scope.row)">{{scope.row.batchId}}</span>
        </template>
      </el-table-column>
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
      <el-table-column align="center" label="合同份数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.sendCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已签约人数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="撤销合同份数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.cancelCount}}</span>
        </template>
      </el-table-column>
      <!--发放总人数-->
      <el-table-column align="center" label="合同状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.state| filterContractState()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签约企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="合同到期日">
        <template slot-scope="scope">
          <span size="small">{{scope.row.abortDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="签约截止日期">
        <template slot-scope="scope">
          <span size="small">{{scope.row.abortDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签约发起时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button  @click="toSalaryDetail(scope.row)"
                     type="primary" plain size="small">查看详情
          </el-button>
        </template>
      </el-table-column>-->
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
          pageSize: 10,
          salaryType: 7
        },
        dataList: [],
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
      contractTypeSource () {
        return state.funContractType()
      },
      contractStateSource () {
        return state.funContractState()
      }
    },
    methods: {
      getContractSignDetail (row) {
        this.$router.push({
          path: '/contract_sign',
          name: '合同签约管理',
          params: {batchId: row.batchId}
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
        Api.getContractBatchList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.dataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
          this.queryModel.salaryMonth = _salaryMonth
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
