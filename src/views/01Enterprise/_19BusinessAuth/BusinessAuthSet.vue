<template>
  <div>
    <el-col style="width: 50%;border-right:1px solid #99a9bf;padding-right: 10px">
      <el-form :inline=true :model="queryModel" label-position="right" class="toolbar form-inline">
          <el-row>
            <el-col >
              <ent-select title="企业名称" place-holder="请输入企业名称"
                          @input-select="(index) => {index !== undefined ?  this.queryModel.entId = index: this.queryModel.entId = null}">
              </ent-select>
            </el-col>
            <el-col :span="5">
              <el-button size="small" type="primary"  style="margin-bottom: 10px;margin-top: 5px" :disabled="isLoading" @click="resetDoQuery">查询企业
              </el-button>
            </el-col>
          </el-row>
      </el-form>
      <el-table ref="ContractSignTable" :data="dataList" style="width: 100%;background: white !important;" v-loading="isLoading"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column align="center" label="企业编号" width="100%">
          <template slot-scope="scope">
            <span size="small">{{scope.row.entId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="企业名称">
          <template slot-scope="scope">
            <span size="small">{{scope.row.entName }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <div style="display: flex">
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
    </el-col>
    <el-col style="width: 50%;padding-right: 10px" >
      <el-form :inline=true :model="queryModelExt" label-position="right" class="toolbar form-inline">
        <el-row>
          <el-col >
            <el-form-item label="业务类型">
              <el-select size="small" v-model="queryModelExt.businessType" filterable clearable placeholder="请选择业务类型">
                <el-option
                  v-for="(item, index) of this.$state.businessType"
                  :key="index"
                  :label="item"
                  :value="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button size="small" type="primary"  style="margin-bottom: 10px;margin-top: 5px" :disabled="isLoading" @click="resetDoQuery">查询业务
            </el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col>
          <el-table ref="ContractSignTable" :data="dataListExt" style="width: 100%" v-loading="isLoading"
                    @selection-change="handleSelectionChangeExt">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column align="center" label="业务类型">
              <template slot-scope="scope">
                <span size="small">{{scope.row.businessType | filterBusinessType()}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5">
          <el-button size="small" type="danger"  style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQueryExt">确认开通
          </el-button>
        </el-col>
      </el-row>
      <el-col :span="24" class="toolbar">
        <div >
          <el-pagination
            @size-change="(val) =>{console.log('pageChange')
          console.log(val)}"
            @current-change="(val) =>{this.queryModelExt.pageNum = val
          this.doQuery()}"
            :current-page="queryModelExt.pageNum"
            :page-size="queryModelExt.pageSize"
            layout="total, prev, pager, next"
            :total="totalCountExt">
          </el-pagination>
        </div>
      </el-col>
        </el-col>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        queryUrl: '/salary_ent',
        isLoading: false,
        totalCount: 0,
        totalCountExt: 0,
        queryModel: {
          pageNum: 1,
          pageSize: 6
        },
        queryModelExt: {
          pageNum: 1,
          pageSize: 6
        },
        dataListExt: [],
        dataList: []
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
      handleSelectionChangeExt(val) {
        this.multipleSelectionExt = []
        val.forEach((item, index, arr) => {
          if (!item.contractUrl) {
            /*   this.$notify({
                 title: '警告',
                 message: '该用户暂无合同信息！',
                 type: 'warning'
               })*/
          } else {
            this.multipleSelectionExt.push(item.signId)
          }
        })
      },
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery () {
        this.isLoading = true
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          this.dataList = response.data.list
          this.totalCount = response.data.totalCount
          this.isLoading = false
        }, err => {
          this.isLoading = false
          console.log(err)
        })
      }
    }
  }
</script>
<style>
  .el-table th{
    background: white ! important;
    color: black ! important;
  }
</style>
