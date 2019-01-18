<template>
  <div>
    <el-col style="width: 50%;border-right:1px solid #99a9bf;padding-right: 10px;height: 500px">
        <el-form :inline=true :model="queryModel" label-position="right" class="toolbar form-inline">
          <el-row>
            <el-col >
              <ent-select title="企业名称" place-holder="请输入企业名称"
                          @input-select="(index) => {index !== undefined ?  this.queryModel.key = index: this.queryModel.key = null}">
              </ent-select>
            </el-col>
            <el-col :span="5">
              <el-button size="small" type="primary"  style="margin-bottom: 0px;margin-top: 5px" :disabled="isLoading" @click="resetDoQuery">查询企业
              </el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="dataList" style="width: 100%" v-loading="isLoading"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column align="center" label="企业编号" width="110px">
            <template slot-scope="scope">
              <span size="small">{{scope.row.entId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="企业名称" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span size="small">{{scope.row.entName }}</span>
            </template>
          </el-table-column>
        </el-table>
      <el-col :span="24" class="toolbar" >
        <div style="float: right">
          <el-pagination
            @size-change="(val) =>{console.log('pageChange')
          console.log(val)}"
            @current-change="(val) =>{this.queryModel.pageNum = val
          this.doQuery()}"
            :current-page="queryModel.pageNum"
            :page-size="queryModel.pageSize"
            layout="total, prev, pager, next"
            :small="true"
            :total="totalCount">
          </el-pagination>
        </div>
      </el-col>
    </el-col>

    <el-col style="width: 50%;padding:0px 10px;height: 500px" >
      <el-row>
        <el-col >
          <el-form :inline=true :model="queryModelExt" label-position="right" class="toolbar form-inline">
            <el-form-item label="业务类型">
              <el-select size="small" v-model="queryModelExt.businessName" filterable clearable placeholder="请选择业务类型">
                <el-option
                  v-for="(item, index) of this.$store.getters.businessType"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-table :data="dataListExt" style="width: 95%" v-loading="isLoadingExt"
                    @selection-change="handleSelectionChangeExt">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column align="center" label="业务类型">
              <template slot-scope="scope">
                <span size="small">{{scope.row.businessName}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5">
          <el-row>
            <el-button size="small" type="primary"  style="margin-bottom: 10px;margin-top: 10px" :disabled="isLoadingExt" @click="getBusinessType">查询业务
            </el-button>
          </el-row>
          <el-row>
            <el-button size="small" type="danger"  style="margin-bottom: 10px" :disabled="isLoadingExt" @click="resetDoQueryExt">确认开通
            </el-button>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="toolbar">
          <div style="float: right">
            <el-pagination
              @size-change="(val) =>{console.log('pageChange')
          console.log(val)}"
              @current-change="(val) =>{this.queryModelExt.pageNum = val
          this.getBusinessType()}"
              :current-page="queryModelExt.pageNum"
              :page-size="queryModelExt.pageSize"
              layout="total, prev, pager, next"
              :small="true"
              :total="totalCountExt">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
        </el-col>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        queryUrl: '/salary_ent',
        isLoading: false,
        isLoadingExt: false,
        totalCount: 0,
        totalCountExt: 0,
        multipleSelectionExt: [],
        multipleSelection: [],
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        queryModelExt: {
          pageNum: 1,
          pageSize: 10
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
          if (!item.entId) {
          } else {
            this.multipleSelection.push(item.entId)
          }
        })
      },
      handleSelectionChangeExt(val) {
        this.multipleSelectionExt = []
        val.forEach((item, index, arr) => {
          if (!item.businessType) {
          } else {
            this.multipleSelectionExt.push(item.businessType)
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
      },
      getBusinessType() {
        this.$post(this.$url('/business_type'), this.queryModelExt).then(res => {
          this.dataListExt = res.data
          this.totalCountExt = res.data.totalCount
        }, err => {
          this.isLoadingExt = false
          console.log(err)
        })
      },
      resetDoQueryExt() {
        if (!this.multipleSelection.length > 0) {
          this.$message.warning('您未选择企业！')
          return
        }
        if (!this.multipleSelectionExt.length > 0) {
          this.$message.warning('您未选择业务类型！')
          return
        }
        this.isLoadingExt = true
        this.isLoading = true
        this.$post(this.$url('/auth_add'), {
          entIds: this.multipleSelection.toString(),
          businessTypes: this.multipleSelectionExt.toString()
        }).then(response => {
          this.$emit('Close')
          this.dataList = {}
          this.dataListExt = {}
          this.queryModelExt = {}
          this.isLoadingExt = false
          this.isLoading = false
          this.$message.success(response.msg)
        }, err => {
          this.isLoadingExt = false
          this.isLoading = false
          this.$message.error(err)
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  /deep/ .el-table th{
    background: white !important;
    color: black !important;
  }
  /deep/ .el-table td {
    border-bottom: hidden;
    padding: 6px 0px;
  }
  /deep/ .el-row{
    margin-bottom 0px
  }
  /deep/ .el-checkbox__inner{
    border-color #99a9bf
  }
</style>
