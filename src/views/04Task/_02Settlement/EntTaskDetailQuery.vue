<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">

        <!-- 批次号-->
        <el-form-item :span="6" label="批次号" >
          <el-input size="small" clearable v-model="queryModel.salaryId" placeholder="请输入批次号"></el-input>
        </el-form-item>

        <!-- 明细编号-->
        <el-form-item :span="6" label="明细编号">
          <el-input size="small" clearable v-model="queryModel.salaryDetailId" placeholder="请输入明细编号"></el-input>
        </el-form-item>

        <!-- 姓名-->
        <el-form-item :span="6" label="姓名">
          <el-input size="small" clearable v-model="queryModel.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <!-- 手机号-->
        <el-form-item :span="6" label="手机号">
          <el-input size="small" clearable v-model="queryModel.phone" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
      </el-row>

      <el-row  type="flex">
          <el-form-item :span="6" label="发放状态">
            <el-select size="small" v-model="queryModel.salaryState" filterable clearable placeholder="请选择发放状态">
              <el-option
                v-for="item in salaryDetailStateSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <ent-select title="结算企业" place-holder="请输入结算企业"
                      @input-select="salaryInputSelect">
          </ent-select>
        <el-form-item :span="6" label="任务名称">
          <el-input size="small" clearable v-model="queryModel.salaryName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="证件号码">
          <el-input size="small" v-model="queryModel.idNumber" placeholder="请输入证件号码"  clearable></el-input>
        </el-form-item>
      </el-row>

      <el-row  type="flex">
        <el-col>
          <el-form-item label="结算时间">
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
        <el-col >
        <el-form-item :span="6" label="结算方式">
          <el-select size="small" clearable v-model="queryModel.payType" placeholder="全部">
          <el-option
            v-for="(item, index) of this.$state.taskSettlementType"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
          </el-select>
        </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px;margin-right: 50px" @click="doExportSalaryDetailList" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_salary_detail_export')">导出明细
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px;margin-right: 50px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="entSignAuditTable" :data="salaryDetailList" style="width: 100%" border v-loading="isLoading">

      <!--批次号-->
      <el-table-column  align="center" fixed label="批次号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryId}}</span>
        </template>
      </el-table-column>

      <!--明细编号-->
      <el-table-column  align="center" label="明细编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryDetailId}}</span>
        </template>
      </el-table-column>
      <!--用户姓名-->
      <el-table-column  align="center" label="员工姓名">
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
      <el-table-column  align="center" label="证件类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.idType| filterUserIdNumType}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="证件号码">
        <template slot-scope="scope">
          <span size="small">{{scope.row.idNumber}}</span>
        </template>
      </el-table-column>
      <!--发薪企业-->
      <el-table-column  align="center" label="结算企业">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.salaryEntName"></span>
        </template>
      </el-table-column>
      <!--运营主企业-->
      <el-table-column  align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.operationEntName}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="任务名称">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.salaryName"></span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="结算方式">
        <template slot-scope="scope">
          <span size="small">{{scope.row.payType| filterTaskSettlementType()}}</span>
        </template>
      </el-table-column>
      <!--实发金额-->
      <el-table-column  align="center" label="实发金额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.realAmount }}</span>
        </template>
      </el-table-column>

      <!--发新状态-->
      <el-table-column align="center" label="发放状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryState |filterSalaryDetailState()}}</span>
        </template>
      </el-table-column>

      <!--提交时间-->
      <el-table-column width="170"  align="center" label="结算时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createTime | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center"  >
        <template slot-scope="scope" >
          <el-button  @click="refundSettle(scope.row.salaryDetailId)"
                      v-if="scope.row.payType=='2' && scope.row.isActive=='0' && scope.row.salaryState=='1'  "
                      type="primary" plain size="small">撤回
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
    <el-dialog title="发放详情" center :close-on-click-modal="1===0"
               :visible.sync="detail.visiable"
               width="40%">
      <salary-sheet :detail="detail.model"></salary-sheet>
    </el-dialog>
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
        totalCount: 0,
        inputDataList: {
          salaryDataList: []
        },
        queryModel: {
          pageNum: 1,
          pageSize: 10,
          salaryType: 7
        },
        selectDateRange: '',
        salaryDetailList: [],
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
        return state.funTaskState()
      },
      salaryDetailTypeSource () {
        return state.typeTaskState()
      }
    },
    watch: {
      '$route': {
        immediate: true,
        handler: 'getParams'
      }
    },
    methods: {
      getParams (r) {
        let name = this.$route.name
        if (name === '结算批次详情查询' && this.$route.params.salaryId !== undefined) {
          this.queryModel = {
            pageNum: 1,
              pageSize: 10,
              salaryType: 7
          }
          this.selectDateRange = ''
            let salaryId = this.$route.params.salaryId
          this.queryModel.salaryId = salaryId
          if (!salaryId || salaryId.length < 1) {
            return
          }
          this.doQuery()
        }
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
        if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
          this.queryModel.startDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[0])
          this.queryModel.endDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        Api.getTaskDetailList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.salaryDetailList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        })
      },
      doExportSalaryDetailList () {
        this.$confirm('确认需要导出结算明细数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
            this.queryModel.startDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[0])
            this.queryModel.endDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[1])
          } else {
            this.queryModel.startDate = null
            this.queryModel.endDate = null
          }
          Api.getTaskDetailExport(this.queryModel).then(resp => {
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
            link.setAttribute('download', '结算明细.xls')
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
      lookSalarySheet(index, val) {
        console.log(val)
        if (val.salaryType === '5' || val.salaryType === '6') {
          this.detail.model = val
          this.detail.visiable = true
        }
      },
      refundSettle (val) {
        this.$confirm('确认撤回该笔任务结算费用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.queryModel.salaryDetailId = val
          this.isLoading = true
        Api.taskSettleWithdraw(this.queryModel).then(response => {
          this.isLoading = false
          if (response.code === ERR_OK) {
            this.$message.success("撤回成功！")
          }
          this.queryModel.salaryDetailId = ''
          this.doQuery()
        },err=>{
          this.isLoading = false
          this.$message.error("撤回失败！")
          this.queryModel.salaryDetailId = ''
          this.doQuery()
        })
       }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
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
