<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline" label-width="80px">
      <el-row typeof="flex" justify="space-between">

        <!-- 批次号-->
        <el-col :span="7">
        <el-form-item  label="批次号" >
          <el-input size="small" v-model="queryModel.salaryId" placeholder="请输入批次号"></el-input>
        </el-form-item>
        </el-col>
        <!-- 明细编号-->
        <el-col :span="7">
        <el-form-item  label="明细编号">
          <el-input size="small" v-model="queryModel.salaryDetailId" placeholder="请输入明细编号"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="7">
        <el-form-item  label="姓名">
          <el-input size="small" v-model="queryModel.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        </el-col>


        <!-- 手机号-->
        <el-col :span="7">
        <el-form-item  label="手机号">
          <el-input size="small" v-model="queryModel.phone" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        </el-col>
      </el-row>

      <el-row typeof="flex" justify="space-between">
        <!--工资月份-->
        <el-col :span="7">
          <el-form-item label="工资月份" >
            <el-date-picker
              class="startDate"
              size="small"
              :editable=true
              v-model="salaryMonth"
              type="month"
              placeholder="请选择工资月份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <ent-select title="发薪企业" place-holder="发薪企业名称"
                      @input-select="salaryInputSelect">
          </ent-select>
        </el-col>
        <el-col :span="7">
          <el-form-item label="发放状态">
            <el-select size="small" v-model="queryModel.salaryState" filterable clearable placeholder="请选择发放状态">
              <el-option
                v-for="item in salaryDetailStateSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
        <el-form-item  label="证件号码">
          <el-input size="small" v-model="queryModel.idNumber" placeholder="请输入证件号码"  clearable></el-input>
        </el-form-item>
        </el-col>
      </el-row>


      <el-row  typeof="flex" justify="space-between">
        <el-col :span="6">
          <el-form-item label="发放类型">
            <el-select size="small" v-model="queryModel.salaryType" filterable clearable placeholder="请选择发放类型">
              <el-option
                v-for="item in salaryDetailTypeSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
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
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="doExportSalaryDetailList" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_salary_detail_export')">导出
          </el-button>

        </el-col>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
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
          <span size="small" @click="lookSalarySheet(scope.$index, scope.row)">{{scope.row.salaryDetailId}}</span>
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

      <!--工资月份-->
      <el-table-column align="center" label="工资月份">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryMonth}}</span>
        </template>
      </el-table-column>

      <!--发薪企业-->
      <el-table-column  align="center" label="发薪企业" width="130">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.salaryEntName"></span>
        </template>
      </el-table-column>

      <!--运营主企业-->
      <el-table-column  align="center" label="运营主企业" width="130">
        <template slot-scope="scope">
          <span size="small">{{scope.row.operationEntName}}</span>
        </template>
      </el-table-column>

      <!--发放类型-->
      <el-table-column  align="center" label="发放类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryType | filterSalaryType()}}</span>
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

      <!--发新状态-->
      <el-table-column align="center" label="发放状态">
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
      <!--提交时间-->
      <el-table-column width="150"  align="center" label="订单完成时间">
        <template slot-scope="scope">
          <span size="small" v-show="scope.row.salaryType != '2'" >{{scope.row.completeTime | filterdateYMDHMS()}}</span>
          <span size="small" v-show="scope.row.salaryType == '2'">{{"--"}}</span>
        </template>
      </el-table-column>
      <!--提交时间-->
      <el-table-column width="150"  align="center" label="订单退款/撤回时间">
        <template slot-scope="scope">
          <span size="small" v-show="scope.row.salaryType == '2'">{{"--"}}</span>
          <span size="small" v-show="scope.row.salaryType != '2'&&scope.row.salaryState == '7'">{{scope.row.withdrawalTime | filterdateYMDHMS()}}</span>
          <span size="small" v-show="scope.row.salaryType != '2'&&scope.row.salaryState == '8'">{{scope.row.refundTime | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100"  align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="rollBack(scope.row)"
 v-if="((scope.row.salaryType == '1'||scope.row.salaryType == '3')&&scope.row.salaryState=='1'&&scope.row.isActive=='0')
       ||(scope.row.salaryType == '2'&&scope.row.state =='0'&&scope.row.salaryState == '1')"
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
        salaryMonth: '',
        inputDataList: {
          salaryDataList: []
        },
        queryModel: {
          pageNum: 1,
          pageSize: 10
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
        return state.funSalaryDetailState()
      },
      salaryDetailTypeSource () {
        return state.funSalaryType()
      }
    },
    watch: {
      '$route': {
        immediate: true,
        handler: 'getParams'
      },
      salaryMonth () {
        if (this.salaryMonth !== null && this.salaryMonth) {
          this.salaryMonth = filters.filterDateYYYYMM(this.salaryMonth)
        } else {
          this.salaryMonth = null
        }
      }
    },
    methods: {
      getParams (r) {
        let name = this.$route.name
        if (name === '发放明细查询' && this.$route.params.salaryId !== undefined) {
          this.queryModel = {
            pageNum: 1,
            pageSize: 10
          }
          this.selectDateRange = ''
          this.salaryMonth = ''
          let salaryId = this.$route.params.salaryId
          this.queryModel.salaryId = salaryId
          if (!salaryId || salaryId.length < 1) {
            return
          }
          this.doQuery()
        }
      },
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
        console.log(this.salaryMonth)
        if (this.salaryMonth !== null && this.salaryMonth !== '') {
          this.queryModel.salaryMonth = filters.filterDateYYYYMM(this.salaryMonth)
        } else {
          this.queryModel.salaryMonth = null
        }
        if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
          this.queryModel.startDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[0])
          this.queryModel.endDate = this.$filter.filterDateYYYYMMDD(this.selectDateRange[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        Api.getSalaryDetailList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.salaryDetailList = response.data.data.list
            this.totalCount = response.data.data.totalCount
            // this.salaryDetailList.forEach(
            //
            // )
          }
        })
      },
      doExportSalaryDetailList () {
        this.$confirm('确认导出工资发放明细?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          console.log(this.salaryMonth)
          if (this.salaryMonth !== null && this.salaryMonth !== '') {
          this.queryModel.salaryMonth = filters.filterDateYYYYMM(this.salaryMonth)
          } else {
            this.queryModel.salaryMonth = null
          }
          console.log(this.queryModel)
          if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
            this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDateRange[0])
            this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDateRange[1])
          } else {
            this.queryModel.startDate = null
            this.queryModel.endDate = null
          }
          console.log(this.queryModel)
          Api.exportSalaryDetailList(this.queryModel).then(resp => {
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
            link.setAttribute('download', '工资发放明细.xls')
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
      rollBack(val){
        if(val.salaryType == '1'||val.salaryType == '3'){
          this.$confirm('确认撤回该笔工资?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('撤回工资')
            this.isLoading = true
            this.queryModel.salaryDetailId = val.salaryDetailId
            Api.rollBackSalary(this.queryModel).then(resp => {
              console.log(resp)
              this.isLoading = false
              this.$message({
                type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
                message: resp.data.msg
              })
              this.queryModel.salaryDetailId =''
              this.doQuery()
            }, err => {
              this.isLoading = false
              console.log(err)
              this.queryModel.salaryDetailId =''
              this.doQuery()
            })
          })
        }
        if(val.salaryType == '2'){
          this.$confirm('确认撤回工资条?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('撤回工资条')
            this.isLoading = true
            this.queryModel.salaryDetailId = val.salaryDetailId
            Api.rollBackSalarySlip(this.queryModel).then(resp => {
              this.isLoading = false
              this.$message({
                type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
                message: resp.data.msg
              })
              this.queryModel.salaryDetailId =''
              this.doQuery()
            }, err => {
              this.isLoading = false
              console.log(err)
              this.queryModel.salaryDetailId =''
              this.doQuery()
            })
          })
        }

      }
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
