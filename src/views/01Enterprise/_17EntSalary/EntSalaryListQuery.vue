<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline" label-width="100px">
      <el-row typeof="flex" justify="space-between">

        <!-- 批次号-->
        <el-col :span="7">
        <el-form-item  label="批次号" >
          <el-input size="small" v-model="queryModel.salaryId" placeholder="请输入批次号"></el-input>
        </el-form-item>
        </el-col>
        <!--工资月份-->
        <el-col :span="7" >
          <el-form-item label="工资月份" >
            <el-date-picker
              size="small"
              :editable=false
              v-model="queryModel.salaryMonth"
              type="month"
              placeholder="请选择工资月份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7" >
        <ent-select title="发薪企业" place-holder="发薪企业名称"
                    @input-select="salaryInputSelect">
        </ent-select>
        </el-col>
      </el-row>

      <el-row typeof="flex" justify="space-between">
        <el-col :span="7" >
          <el-form-item label="批次状态" >
            <el-select size="small" v-model="queryModel.salaryState"   filterable clearable placeholder="请选择批次状态">
              <el-option
                v-for="item in salaryStateSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="发放类型" >
            <el-select size="small" v-model="queryModel.salaryType"   filterable clearable placeholder="请选择发放类型">
              <el-option
                v-for="item in salaryTypeSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" >
          <el-form-item label="创建时间" >
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

      </el-row>
      <el-row typeof="flex" justify="space-between">
        <el-col  :span="3" >
          <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="doExportSalaryList" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_salary_export')">导出
          </el-button>
        </el-col>
        <el-col  :span="3" >
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="entSignAuditTable" :data="entSalaryList" style="width: 100%" border v-loading="isLoading">

      <!--批次号-->
      <el-table-column align="center" label="批次号">
        <template slot-scope="scope">
          <span   class="globalPointer" size="small"  @click.stop="getAccountAssign(scope.row.salaryId)">{{scope.row.salaryId}}</span>
        </template>

      </el-table-column>
      <!--<el-table-column width="100" align="center" label="业务编号" >-->
        <!--<template slot-scope="scope">-->
          <!--<span size="small" class="globalPointer"  @click="getAccountAssign(scope.row.accClearId)">{{scope.row.accClearId}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--工资表名称-->
      <!--<el-table-column align="center" label="工资表名称">-->
        <!--<template slot-scope="scope">-->
          <!--<span size="small">{{scope.row.salaryName}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--工资月份-->
      <el-table-column width="80" align="center" label="工资月份">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryMonth}}</span>
        </template>
      </el-table-column>

      <!--发薪企业-->
      <el-table-column align="center" label="发薪企业">
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

      <!--发放类型-->
      <el-table-column align="center" label="发放类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryType | filterSalaryType}}</span>
        </template>
      </el-table-column>

      <!--发放总人数-->
      <el-table-column align="center" label="发放总人数">
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

      <!--批次状态-->
      <el-table-column align="center" label="批次状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryState | filterSalaryState()}}</span>
        </template>
      </el-table-column>

      <!--撤回总额-->
      <el-table-column align="center" label="撤回总额(元)">
        <template slot-scope="scope">
          <span size="small" v-if="scope.row.salaryType=='2'||scope.row.salaryType=='5'||scope.row.salaryType=='6'">{{'— —'}}</span>
          <span size="small" v-else>{{ scope.row.refundAmount}}</span>
        </template>
      </el-table-column>

      <!--到银行卡退款总额-->
      <el-table-column align="center" label="退款总额(元)">
        <template slot-scope="scope">
          <span size="small" v-if="scope.row.salaryType=='2'">{{'— —'}}</span>
          <span size="small" v-else>{{ scope.row.drawbackAmount }}</span>
        </template>
      </el-table-column>

      <!--提交时间-->
      <el-table-column width="170" align="center" label="提交时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createTime | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="操作" width="120" align="center">
      <template slot-scope="scope">
        <el-button  @click="toSalaryDetail(scope.row)"
                    type="primary" plain size="small">查看发放明细
        </el-button>
      </template>
   </el-table-column>
      <!--<el-table-column fixed="right" label="操作" width="140" align="center"  >-->
        <!--<template slot-scope="scope">-->
          <!--<el-button  @click="getAccountAssign(scope.row.salaryId)"-->
                      <!--type="primary" plain size="small">查看业务编号详情-->
          <!--</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->

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
    <el-dialog :title="detail.title" center width="40%"
               :close-on-click-modal="1==0"
               @close="() => {this.detail.salaryId=''}"
               :visible.sync="detail.visiable">
      <account-assign :salary-id="detail.salaryId"  @cancelEdit="_closeAccountAssignInfo"></account-assign>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import EntAuditDetail from '../_14EntRealName/EntAuditDetail.vue'
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import * as filters from 'filters'
  import { ERR_OK } from '../../../api/index'
  import AccountAssign from './EntSalaryAccountAssign'

  export default {
    data () {
      return {
        detail: {
          title: '账户分配详情',
          visiable: false,
          accClearId: '',
        //  isShow: true
        },
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
      salaryStateSource () {
        return state.funSalaryState()
      },
      salaryTypeSource () {
        return state.funSalaryType()
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
        Api.getEntSalaryList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.entSalaryList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
          this.queryModel.salaryMonth = _salaryMonth
        },err=>{
          this.isLoading = false
          console.log(err)
        })
      },
      doExportSalaryList () {
        this.$confirm('确认需要导出工资发放批次数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          this.queryModel.salaryMonth = filters.filterDateYYYYMM(this.queryModel.salaryMonth)
          let _salaryMonth = this.queryModel.salaryMonth
          if (this.selectDate !== null && this.selectDate) {
            this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
            this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
          } else {
            this.queryModel.startDate = null
            this.queryModel.endDate = null
          }
          Api.exportSalaryList(this.queryModel).then(resp => {
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
            link.setAttribute('download', '工资发放批次.xls')
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
          path: '/enterprise_salary_detail',
          name: '发放明细查询',
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
      },
      getAccountAssign(salaryId) {
        console.log(salaryId)
        this.detail.salaryId = salaryId
        this.detail.visiable = true
      },
      _closeAccountAssignInfo() {
        this.detail.visiable = false
      }
    },
    components: {
      EntAuditDetail,
      AccountAssign
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
