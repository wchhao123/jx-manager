<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row>
        <!-- 批次号-->
        <el-form-item :span="6" label="批次号">
          <el-input size="small" clearable v-model="queryModel.batchId" placeholder="请输入批次号"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="合同编号">
          <el-input size="small" clearable v-model="queryModel.extContractId" placeholder="请输入合同编号"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="用户姓名">
          <el-input size="small" clearable v-model="queryModel.userName" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="用户手机号">
          <el-input size="small" clearable v-model="queryModel.mobile" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="签约状态">
          <el-select size="small" v-model="queryModel.signState" filterable clearable placeholder="请选择签约状态">
            <el-option
              v-for="(item, index) in this.$state.contractSignState"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <ent-select title="企业名称" place-holder="请输入企业名称"
                    @input-select="(index) => {index !== undefined ?  this.queryModel.entId = index: this.queryModel.entId = null}">
        </ent-select>
          <el-form-item label="签约发起时间">
            <el-date-picker
              v-model="selectDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="请输入开始时间"
              end-placeholder="请输入结束时间"
              :picker-options="this.$state.pickerOptions2">
            </el-date-picker>
          </el-form-item>
      </el-row>
      <el-row justify="left">
        <el-col :span="6">
        <el-form-item label="合同类型">
          <el-select size="small" v-model="queryModel.contractType" filterable clearable placeholder="请选择合同类型">
            <el-option
              v-for="(item, index) in this.$state.contractType"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="签约主体">
            <el-select size="small" v-model="queryModel.cooperateEntName" filterable clearable placeholder="请输入签约主体名称">
              <el-option
                v-for="(item, index) of this.$store.getters.cooperateEntName"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button size="small" type="danger" icon="el-icon-download" style="margin-bottom: 10px" @click="doExportSalaryList" v-show="this.$store.getters.getBtnIsShowByName('btn_contract_sign_export')">下載合同
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="ContractSignTable" :data="dataList" style="width: 100%" border v-loading="isLoading"
              @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!--批次号-->
      <el-table-column align="center" label="批次号" fixed>
        <template slot-scope="scope">
          <span size="small">{{scope.row.batchId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.extContractId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同名称">
        <template slot-scope="scope">
          <span class="globalPointer" size="small"  @click="getContractPage(scope.row)">{{scope.row.contractName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.contractType | filterContractType()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="企业名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签约主体">
        <template slot-scope="scope">
          <span size="small">{{scope.row.contractType === '2'? scope.row.cooperateEntName:'==' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签约状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signState | filterContractSignState()}}</span>
        </template>
      </el-table-column>
      <!--批次状态-->
  <!--    <el-table-column align="center" label="合同到期日">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createTime | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>-->

      <!--提交时间-->
     <!-- <el-table-column align="center" label="签约截止日期">
        <template slot-scope="scope">
          <span size="small">{{scope.row.abortDate | filterDateYYYYMMDD()}}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="签约发起时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签署时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <div class="block">
        <el-pagination
          @size-change="(val) =>{console.log('pageChange')
          console.log(val)}"
          @current-change="(val) =>{this.queryModel.pageNum = val
          this.doQuery()}"
          :current-page="queryModel.pageNum"
          :page-size="queryModel.pageSize"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-col>
    <el-dialog ></el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        contractTitle: '合同协议',
        queryUrl: '/contract_sign',
        multipleSelection: [],
        isLoading: false,
        visible: false,
        selectDate: '',
        totalCount: 0,
        queryModel: {
          pageNum: 1,
          pageSize: 10,
          salaryType: 7
        },
        dataList: [],
        editIndex: null
      }
    },
    watch: {
      '$route': {
        immediate: true,
        handler: 'getParams'
      },
      selectDate () {
        if (this.selectDate !== null && this.selectDate) {
          this.queryModel.startDate = this.$filter.filterDateYYYYMMDD(this.selectDate[0])
          this.queryModel.endDate = this.$filter.filterDateYYYYMMDD(this.selectDate[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.ContractSignTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.ContractSignTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = []
       val.forEach((item, index, arr) => {
         if (!item.contractUrl) {
        /*   this.$notify({
             title: '警告',
             message: '该用户暂无合同信息！',
             type: 'warning'
           })*/
         } else {
           this.multipleSelection.push(item.signId)
         }
       })
      },
      getContractPage (row) {
        if (row.contractUrl) {
          window.open(row.contractUrl)
        } else {
          this.$notify({
            title: '警告',
            message: '该用户暂无合同信息！',
            type: 'warning'
          })
        }
      },
      getParams (r) {
        debugger
        let name = this.$route.name
        if (name === '合同签约管理' && this.$route.params.batchId !== undefined) {
          this.queryModel = {
            pageNum: 1,
            pageSize: 10
          }
          this.selectDateRange = ''
          let batchId = this.$route.params.batchId
          this.queryModel.batchId = batchId
          if (!batchId || batchId.length < 1) {
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
      this.queryModel.signIds = ''
      this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
        this.dataList = response.data.list
        this.totalCount = response.data.totalCount
        this.isLoading = false
      }, err => {
        this.isLoading = false
        console.log(err)
      })
    },
      doExportSalaryList () {
        if (this.dataList.length < 1) {
          this.$notify({
            title: '警告',
            message: '暂无可导出合同签约信息！',
            type: 'warning'
          })
          return
        }
        this.$confirm('确认需要导出合同签约信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //contract_export
          this.isLoading = true
          this.queryModel.signIds = this.multipleSelection.toString()
          this.$post(this.$url('/contract_check'), this.queryModel).then(response => {
            this.$export(this.$url('/contract_export'), this.queryModel).then(response => {
              this.isLoading = false
              if (!response) {
                return
              }
              let blob = new Blob([response])
              let objectUrl = URL.createObjectURL(blob)
              let link = document.createElement('a')
              link.style.display = 'none'
              link.href = objectUrl
              link.setAttribute('download', '合同文件.zip')
              document.body.appendChild(link)
              link.click()
            }, err => {
              this.isLoading = false
              console.log(err)
            })
          }, err => {
            this.isLoading = false
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
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
