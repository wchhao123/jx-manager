<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline"   ref="entStatisticsForm">
      <el-row type="flex">
        <el-col :span="7">
        <ent-select title="企业名称" place-holder="请输入企业名称"
                    @input-select="salaryInputSelect">
        </ent-select>
        </el-col>
        <el-col :span="7">
        <el-form-item :span="6" label="运营主企业">
          <el-input size="small" clearable v-model="queryModel.mainEntName" placeholder="请输入运营主企业名称"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="10">
        <el-form-item label="统计时间"  prop="selectDate">
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
      <el-row type="flex" justify="left">
        <el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="doExportSalaryList" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_task_export')">导出
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="entSalaryList" style="width: 100%" border v-loading="isLoading">

      <!--批次号-->
      <el-table-column align="center" label="企业编号" fixed>
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryEntId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="企业名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.salaryEntName}}</span>
        </template>
      </el-table-column>

      <!--运营主企业-->
      <el-table-column align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mainEntName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="工资账户余额（元）">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entBalance}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="工资发放总金额（元）">
        <template slot-scope="scope">
          <span size="small">{{scope.row.wageAmount}}</span>
        </template>
      </el-table-column>
      <!--发放总人数-->
      <el-table-column align="center" label="众包发放总金额（元）">
        <template slot-scope="scope">
          <span size="small">{{scope.row.taskAmount}}</span>
        </template>
      </el-table-column>

      <!--提交时间-->
      <el-table-column width="170" align="center" label="统计时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.statisticsDate | filterdateYMDHMS()}}</span>
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
  import * as Api from 'api'
  import * as filters from 'filters'
  export default {
    data () {
      return {
        isLoading: false,
        selectDate: [new Date().setDate(new Date().getDate() - 31),new Date()],
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
        },
      }
    },
    computed: {
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
        if (this.selectDate == null || this.selectDate=='') {
          this.$message.error("请输入统计时间！")
          return
        }else {
          console.log(((this.selectDate[1]-this.selectDate[0])/60/1000/24/60))
          if(((this.selectDate[1]-this.selectDate[0])/60/1000/24/60)>31){
            this.$message.error("统计时间间隔不能超过31天！")
            return
          }
        }
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery () {
        this.isLoading = true
          this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
          this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
        Api.getEntStatisticsInfo(this.queryModel).then(response => {
          this.isLoading = false
          console.log(response)
          if (response.data.code === Api.ERR_OK) {
            this.entSalaryList = response.data.data.list
           this.totalCount = response.data.data.totalCount
          }
        })
      },
      doExportSalaryList () {
        if (this.selectDate == null || this.selectDate=='') {
          this.$message.error("请输入统计时间！")
          return
        }else {
          console.log(((this.selectDate[1]-this.selectDate[0])/60/1000/24/60))
          if(((this.selectDate[1]-this.selectDate[0])/60/1000/24/60)>31){
            this.$message.error("统计时间间隔不能超过31天！")
            return
          }
        }
        this.$confirm('确认需要导出企业余额报表?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
            this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
            this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
          Api.getEntStatisticsInfoExport(this.queryModel).then(resp => {
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
            link.setAttribute('download', '企业余额报表.xls')
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
