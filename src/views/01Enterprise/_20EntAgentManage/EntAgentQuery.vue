<template>
  <div>
    <el-form :inline=true :model="queryModel" label-position="right" class="toolbar demo-form-inline" label-width="100px">
      <el-row typeof="flex" justify="space-between">
        <el-col :span="6">
          <ent-select title="企业名称" place-holder="请输入企业名称"
                      @input-select="(index) => {index !== undefined ?  this.queryModel.entId = index: this.queryModel.entId = null}">
          </ent-select>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="短信签名">
            <el-input size="small" v-model="queryModel.smsSign" placeholder="请输入短信签名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="公众号名称">
            <el-input size="small" v-model="queryModel.wppName" placeholder="请输入公众号名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item :span="6" label="运营主企业">
            <el-input size="small" v-model="queryModel.adminEntName" placeholder="请输入运营主企业名称" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row typeof="flex" justify="space-between">
        <el-col :span="10">
          <el-form-item label="添加时间">
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
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button size="small" type="primary"  style="margin-bottom: 10px" :disabled="isLoading" @click="addEntAgent">添加
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="primary"  style="margin-bottom: 10px" :disabled="isLoading" @click="removeEntAgent">删除
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="doQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table   :data="dataList" style="width: 100%" border v-loading="isLoading"
              @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="企业编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="企业名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.adminEntName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公众号名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.wppName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="短信签名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.smsSign }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.cteateDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button  @click="updateAgent(scope.row)"
                      type="primary" plain size="small">编辑
          </el-button>
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
    <el-dialog :title="detail.title" center width="50%"
               :close-on-click-modal="1==0"
               :before-close="closeAdd"
               :visible.sync="detail.visiable">
    <add-ent-agent :agent-info="agentInfo" @close="closeAdd"></add-ent-agent>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as Api from 'api'
  import AddEntAgent from './addEntAgent'
  export default {
    components: {AddEntAgent},
    data () {
      return {
        isLoading: false,
        visible: false,
        totalCount: 0,
        dataList: [],
        queryUrl: '/get_agent',
        multipleSelection: [],
        selectDate: '',
        detail: {
          title: '',
          visiable: false
        },
        agentInfo: {
          hintText: '',
          confirmText: '',
          detail: ''
        },
        queryModel: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    watch: {
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
      handleSelectionChange(val) {
        this.multipleSelection = []
        val.forEach((item, index, arr) => {
          this.multipleSelection.push(item.entId)
        })
      },
      doQuery() {
        this.isLoading = true
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          console.log(response)
          if (response.code === Api.ERR_OK) {
            this.dataList = response.data.list
            this.totalCount = response.data.totalCount
          }
          this.isLoading = false
        }, err => {
          this.isLoading = false
          console.log(err)
        })
      },
      addEntAgent() {
        this.agentInfo.hintText = '添加后，消息通知内容均显示已关联的短信签名和公众号名称'
        this.agentInfo.confirmText = '确认添加'
        this.agentInfo.detail = ''
        this.detail.title = '添加'
        this.agentInfo.flag = '1' //用于判断是否是退出
        this.detail.visiable = true
        console.log(this.agentInfo)
      },
      removeEntAgent() {
        if (this.multipleSelection.length < 1) {
          this.$message.warning('请选择要删除的关联数据')
          return
        }
        this.$confirm('确认解除企业和公众平台的关联？删除后短信内容“公众号名称”将恢复默认值“嘉薪”，短信签名将恢复默认值【嘉薪】', '确认删除', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.queryModel.entIds = encodeURI(JSON.stringify(this.multipleSelection))
          this.isLoading = true
          this.$post(this.$url('/delete_agent'), this.queryModel).then(resp => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.isLoading = false
            this.queryModel.entIds = ''
            this.doQuery()
          }, err => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
            this.isLoading = false
            this.queryModel.signIds = ''
            this.doQuery()
            console.log(err)
          })
          console.log()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      updateAgent(row) {
        console.log(row)
        this.agentInfo.hintText = '修改后，消息通知内容均显示已关联的短信签名和公众号名称'
        this.agentInfo.confirmText = '确认修改'
        this.agentInfo.detail = JSON.stringify(row)
        this.detail.title = '编辑'
        this.agentInfo.flag = '1'
        this.detail.visiable = true
        console.log(this.agentInfo)
      },
      closeAdd() {
        this.detail.visiable = false
        this.agentInfo.hintText =''
        this.agentInfo.detail = ''
        this.doQuery();
      }
    }
  }
  </script>
