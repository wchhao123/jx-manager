<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">

        <!-- 批次号-->
        <el-form-item :span="6" label="批次号" >
          <el-input size="small" v-model="queryModel.salaryId" placeholder="请输入批次号"></el-input>
        </el-form-item>

        <!-- 明细编号-->
        <el-form-item :span="6" label="明细编号">
          <el-input size="small" v-model="queryModel.salaryDetailId" placeholder="请输入明细编号"></el-input>
        </el-form-item>

        <!-- 姓名-->
        <el-form-item :span="6" label="姓名">
          <el-input size="small" v-model="queryModel.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <!-- 手机号-->
        <el-form-item :span="6" label="手机号">
          <el-input size="small" v-model="queryModel.mobile" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
      </el-row>

      <el-row  type="flex">
        <el-form-item :span="6" label="证件号码">
          <el-input size="small" v-model="queryModel.idNumber" placeholder="请输入证件号码"  clearable></el-input>
        </el-form-item>

        <ent-select title="企业名称" place-holder="请输入企业名称"
                    @input-select="salaryInputSelect">
        </ent-select>
        <!--工资月份-->

        <el-form-item :span="6" label="运营主企业">
          <el-input size="small" v-model="queryModel.entName" placeholder="请输入运营主企业名称" clearable></el-input>
        </el-form-item>

        <el-form-item label="订单类型">
          <el-select size="small" v-model="queryModel.salaryType" filterable clearable placeholder="请选择订单类型">
            <el-option
              v-for="item in salaryDetailTypeSource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row  type="flex">
        <el-form-item label="退款/撤回时间">
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

        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="doExportSalaryDetailList" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_salary_detail_export')">导出
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="entSignAuditTable" :data="salaryRefundList" style="width: 100%" border v-loading="isLoading">

      <!--批次号-->
      <el-table-column  align="center" label="批次号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryId}}</span>
        </template>
      </el-table-column>

      <!--明细编号-->
      <el-table-column  align="center" label="明细编号">
        <template slot-scope="scope">
          <span size="small" >{{scope.row.salaryDetailId}}</span>
        </template>
      </el-table-column>
      <!--用户姓名-->
      <el-table-column  align="center" label="用户姓名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <!--手机号-->
      <el-table-column  align="center" label="手机号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <!--证件类型-->
      <el-table-column align="center" label="证件类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.idType | filterUserIdNumType}}</span>
        </template>
      </el-table-column>

      <!--证件号-->
      <el-table-column align="center" label="证件号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.idNumber}}</span>
        </template>
      </el-table-column>

      <!--发薪企业-->
      <el-table-column  align="center" label="企业名称" width="100">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.salaryEntName"></span>
        </template>
      </el-table-column>

      <!--运营主企业-->
      <el-table-column  align="center" label="运营主企业" width="100">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName}}</span>
        </template>
      </el-table-column>

      <!--发放类型-->
      <el-table-column  align="center" label="订单类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryType | filterRefundSalaryType()}}</span>
        </template>
      </el-table-column>

      <!--应发金额-->
      <!--<el-table-column  align="center" label="应发金额(元)">-->
      <!--<template slot-scope="scope">-->
      <!--<span size="small">{{scope.row.payableAmount }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--实发金额-->
      <el-table-column  align="center" label="实发金额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.realAmount }}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="退款/撤回金额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.realAmount }}</span>
        </template>
      </el-table-column>

      <!--发新状态-->
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryState |filterSalaryDetailState()}}</span>
        </template>
      </el-table-column>

      <!--<el-table-column width="170"  align="center" label="业务编号">-->
      <!--<template slot-scope="scope">-->
      <!--<span size="small">{{scope.row.businessId}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--提交时间-->
      <el-table-column width="150"  align="center" label="订单创建时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createTime | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150"  align="center" label="订单完成时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.completeTime | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150"  align="center" label="撤回/退款时间">
        <template slot-scope="scope">
          <span size="small" v-show="scope.row.salaryState == '7'">{{scope.row.withdrawalTime | filterdateYMDHMS()}}</span>
          <span size="small" v-show="scope.row.salaryState == '8'">{{scope.row.refundTime | filterdateYMDHMS()}}</span>
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
  import SalarySheet from './EntSalarySheet.vue'
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import * as filters from 'filters'
  import { ERR_OK } from '../../../api/index'

  export default {
    data () {
      return {
        isLoading: false,
        totalCount: 0,

        inputDataList: {
          salaryDataList: []
        },
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        selectDateRange: '',
        salaryRefundList: [],
        editIndex: null,
        detail: {
          model: null,
          visiable: false
        },
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
      salaryDetailStateSource () {
        return state.funSalaryDetailState()
      },
      salaryDetailTypeSource () {
        return state.funRefundSalaryType()
      }
    },
    methods: {

      // pickTime (val) {
      //  this.isLoading = true
      //   this.queryModel.salaryMonth = filters.filterDateYYYYMM(this.queryModel.salaryMonth)
      //  this.isLoading = false
      // //  Vue.set(this.queryModel, 'salaryMonth', filters.filterDateYYYYMM(val))
      //   console.log(this.queryModel.salaryMonth)
      // },
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
        if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
          this.queryModel.startDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[0])
          this.queryModel.endDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        Api.getSalaryRefundList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.salaryRefundList = response.data.data.list
            this.totalCount = response.data.data.totalCount
            // this.salaryDetailList.forEach(
            //
            // )
          }
        })
      },
      doExportSalaryDetailList () {
        this.$confirm('确认导出发放撤回明细?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true

          if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
            this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDateRange[0])
            this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDateRange[1])
          } else {
            this.queryModel.startDate = null
            this.queryModel.endDate = null
          }
          console.log(this.queryModel)
          Api.exportSalaryRefundList(this.queryModel).then(resp => {
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
            link.setAttribute('download', '撤回退款明细.xls')
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
      // 点击查看工资条明细

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
    },
    components: {
      SalarySheet
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
