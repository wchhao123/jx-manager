<template>
  <div>
    <el-form :inline=true :model="queryModel" label-position="right" class="toolbar form-inline">
      <el-row>
        <el-form-item label="文件名称">
          <el-input size="small" clearable v-model="queryModel.fileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <ent-select title="发布企业" place-holder="请选择发布企业"
                    @input-select="salaryInputSelect">
        </ent-select>
        <el-form-item label="运营主企业">
          <el-input size="small" clearable v-model="queryModel.entName" placeholder="请输入运营主企业名称"></el-input>
        </el-form-item>
        <el-form-item label="任务编号">
          <el-input size="small" clearable v-model="queryModel.taskId" placeholder="请输入任务编号"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="6">
        <el-form-item label="任务状态">
          <el-select size="small" v-model="queryModel.taskState" filterable clearable placeholder="请选择任务状态">
            <el-option
              v-for="item in taskListStateSource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="上传时间">
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
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型">
            <el-select size="small" v-model="queryModel.workState" filterable clearable placeholder="请选择上传类型">
              <el-option
                v-for="item in taskDeliveryTypeSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="downLoad">下载
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="ContractListTable" :data="dataList" style="width: 100%" border v-loading="isLoading"
              @selection-change="handleSelectionChange">
      <!--批次号-->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="文件名称" fixed>
        <template slot-scope="scope">
          <span  size="small">{{scope.row.fileName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布企业">
        <template slot-scope="scope"><!--contractUrl-->
          <span  size="small">{{scope.row.salaryEntName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.taskId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.taskName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.taskState |filterTaskListState()}}</span>
        </template>
      </el-table-column>
      <!--发放总人数-->
      <el-table-column align="center" label="上传时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>　
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.workState| filterTaskDeliveryState()}}</span>
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
        selectDate: '',
        totalCount: 0,
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        dataList: [],
        fileIds: []
      }
    },
    watch: {
      selectDate () {
        console.log('j监听')
        if (this.selectDate !== null && this.selectDate) {
          this.queryModel.startDate = this.$filter.filterDateYYYYMMDD(this.selectDate[0])
          this.queryModel.endDate = this.$filter.filterDateYYYYMMDD(this.selectDate[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
      }
    },
    computed: {
      taskListStateSource () {
        return state.funTaskListState()
      },
      taskDeliveryTypeSource () {
        return state.funTaskDeliveryType()
      }
    },
    methods: {
      handleSelectionChange(val) {
        debugger
        this.fileIds = []
        val.forEach((item, index, arr) => {
          console.log(item)
            this.fileIds.push(item.fileId)
        })
        console.log( this.fileIds)
      },
      salaryInputSelect(entId) {
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
        this.queryModel.fileIds = []
        Api.getTaskDeliveryList(this.queryModel).then(response => {
          console.log(response)
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.dataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        },err => {
          this.isLoading = false
          console.log(err)
        })
      },
      downLoad () {
        if (this.dataList.length < 1) {
          this.$notify({
            title: '警告',
            message: '暂无可下载的任务交付附件！',
            type: 'warning'
          })
          return
        }
        this.$confirm('确认需要下载任务交付附件', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //contract_export
          this.isLoading = true
          console.log(this.fileIds)
          this.queryModel.fileIds = this.fileIds.toString()
          this.queryModel.pageNum = 1
          this.queryModel.pageSize = 10
          this.$post(this.$url('/task_delivery_check'), this.queryModel).then(response => {
            console.log(response.date)
         //   this.queryModel.fileIds = []
          }, err => {
            this.isLoading = false
            console.log(err)
          })
        }).catch(() => {
      //    this.queryModel.fileIds = []
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
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
