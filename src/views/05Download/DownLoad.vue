<template>
  <div>
    <el-form :inline=true :model="queryModel" label-position="right" class="toolbar form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select size="small" v-model="queryModel.statue" filterable clearable placeholder="请选择业务状态">
              <el-option
                v-for="(item, index) of this.$state.exportState"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="导出时间">
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
        <el-col :span="2">
          <el-button size="small" type="primary" icon="el-icon-search" :disabled="isLoading"
                     @click="resetDoQuery">查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="ContractSignTable" :data="dataList" style="width: 100%" border v-loading="isLoading">
      <el-table-column width="300px" align="center" label="文件名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="导出时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.statue | filterExportState()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作人">
        <template slot-scope="scope">
          <span size="small">{{scope.row.op }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下载">
        <template slot-scope="scope">
<!--
          <el-button>下载</el-button>v-show="scope.row.statue"
-->
          <span v-show="scope.row.statue === '1' ? true : false" style="text-decoration: underline;color: #3850ff;cursor: pointer" @click="doDownLoad(scope.row)">下载</span>
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
  export default {
    data() {
      return {
        queryUrl: '/download_list',
        isLoading: false,
        selectDate: '',
        totalCount: 0,
        multipleSelection: [],
        status: '',
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        dataList: []
      }
    },
    watch: {
      selectDate() {
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
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery() {
        this.isLoading = true
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          this.dataList = response.data.list
          this.totalCount = response.data.totalCount
          this.isLoading = false
        }, err => {
          this.isLoading = false
          console.log(err)
        })
      },
      doDownLoad(data) {
        this.isLoading = true
        this.$export(this.$url('/download'), {
          fileUrl: data.fileUrl
        }).then(response => {
          this.isLoading = false
          if (!response) {
            return
          }
          let objectUrl = URL.createObjectURL(new Blob([response]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = objectUrl
          link.setAttribute('download', data.fileName + '.zip')
          document.body.appendChild(link)
          link.click()
        }, err => {
          this.isLoading = false
          console.log(err)
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
