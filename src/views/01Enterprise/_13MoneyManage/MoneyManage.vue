<template>
  <section id="recharge_manage_new">
    <el-form :inline="true" :model="queryModel" class="toolbar demo-form-inline" label-position="right" label-width="100px">
      <el-row type="flex">
        <el-col :span="6">
            <ent-select title="企业名称"
                        place-holder="请输入企业编号或名称"
                        @input-select="salaryInputSelect"
            ></ent-select>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开户状态">
            <el-select size="small" v-model="queryModel.openingState" filterable clearable placeholder="审核状态">
              <el-option
                v-for="item in _entTradeType"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运营主企业">
            <el-input size="small" clearable v-model="queryModel.operationEntName" placeholder="请输入运营主企业名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="10">
        <el-form-item label="申请时间" >
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
        </el-col>

        <el-col  :span="8">
          <el-button size="small" type="primary" icon="el-icon-search" @click="resetDoQuery" :disabled="isLoading">查询
          </el-button>
        </el-col>
      </el-row>

    </el-form>

    <el-table
      ref="entTradeTable" :data="entTradeList" style="width: 100%" border
      v-loading="isLoading"
      @row-click="tableRowClick" highlight-current-row>

      <el-table-column :span="6" align="center"
                       label="企业编号">
        <template slot-scope="scope">{{scope.row.identityId}}
        </template>
      </el-table-column>

      <!--企业名称-->
      <el-table-column :span="6" align="center" label="企业名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName}}</span>
        </template>
      </el-table-column>

      <!--运营主企业-->
      <el-table-column :span="6" align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.operationEntName}}</span>
        </template>
      </el-table-column>

      <el-table-column :span="6" align="center" label="资金托管机构" width="120px">
        <template slot-scope="scope">
          <span size="small">{{scope.row.organization === '1' ? '新浪支付' : ''}}</span>
        </template>
      </el-table-column>

      <el-table-column :span="6" align="center" label="开户状态" width="100px">
        <template slot-scope="scope">
          <span size="small">{{scope.row.openingState | filterEntMoneyManageAuthState}}</span>
        </template>
      </el-table-column>

      <el-table-column :span="6" align="center"
                       label="申请时间">
        <template slot-scope="scope">{{scope.row.commitTime | filterdateYMDHMS}}
        </template>
      </el-table-column>

      <el-table-column :span="6" align="center"
                       label="审核通过时间">
        <template slot-scope="scope">{{scope.row.passTime | filterdateYMDHMS}}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="lookApplyInfo(scope.row)"
                     type="primary" plain size="small">查看申请资料
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
          :total="total">
        </el-pagination>
      </div>
    </el-col>

    <el-dialog title="企业申请资料" center width="60%" :visible.sync="detail.visiable" :close-on-click-modal="1===0">
      <money-manage-detail :identityId="detail.identityId">
      </money-manage-detail>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import * as Api from 'api'
  import * as State from 'common/js/state-dic'
  import * as filters from 'filters'
  import MoneyManageDetail from './MoneyManageDetail'

  export default {
    data () {
      return {
        isLoading: false,
        selectDate: '',
        total: 10,
        salaryDataList: [],
        entTradeList: [],
        detail: {visiable: false},
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
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
      _entTradeType () {
        return State.funEntMoneyManageAuthState()
      }
    },
    methods: {
      resetDoQuery () {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      salaryInputSelect (entId) {
        if (entId !== undefined) {
          this.queryModel.salaryEntId = entId
        } else {
          this.queryModel.salaryEntId = null
        }
        console.log(this.queryModel.salaryEntId)
      },
      doQuery () {
        console.log('查询交易记录')
        this.isLoading = true
        if (this.selectDate !== null && this.selectDate) {
          this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
          this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }

        Api.getEntMoneyMangeList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === '0000') {
            this.entTradeList = response.data.data.list
            this.total = parseInt(response.data.data.totalCount)
          }
        })
      },
      lookApplyInfo(row) {
        console.log('查看资金托管详情')
        console.log(row)
        this.detail.identityId = row.identityId
        this.detail.visiable = true
      },
      pageChange () {
        console.log('pageChange')
      },
      pageHandelCurrentChange (val) {
        console.log('pageHandelCurrentChange')
        this.queryModel.pageNum = val
        this.doQuery()
      },
      tableRowClick () {
      }
    },
    components: {
      MoneyManageDetail
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
