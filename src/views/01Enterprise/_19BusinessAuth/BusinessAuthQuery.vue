<template>
  <div>
    <el-form :inline=true :model="queryModel" label-position="right" class="toolbar form-inline">
      <el-row>
        <el-form-item label="企业编号">
          <el-input size="small" clearable v-model="queryModel.entId" placeholder="请输入企业编号"></el-input>
        </el-form-item>
        <ent-select title="企业名称" place-holder="请输入企业名称"
                    @input-select="(index) => {index !== undefined ?  this.queryModel.entId = index: this.queryModel.entId = null}">
        </ent-select>
        <el-form-item label="业务类型">
          <el-select size="small" v-model="queryModel.businessType" filterable clearable placeholder="请选择业务类型">
            <el-option
              v-for="(item, index) of this.$state.businessType"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="业务状态">
              <el-select size="small" v-model="queryModel.status" filterable clearable placeholder="请选择业务状态">
                <el-option
                  v-for="(item, index) of this.$state.businessState"
                  :key="index"
                  :label="item"
                  :value="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="15">
          <el-form-item label="开通时间">
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
          <el-button size="small" type="write" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" type="danger"  style="margin-bottom: 10px" :disabled="isLoading" @click="openDiaLog">开通业务
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" type="danger"  style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">重新启用
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" type="primary"  style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">关闭
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
          <span size="small">{{scope.row.operationEntName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.businessType | filterBusinessType()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.status | filterBusinessState()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开通时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.openDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="关闭时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.closeDate | filterdateYMDHMS()}}</span>
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
    <el-dialog :title="detail.title" center width="60%" :visible.sync="detail.visiable" :close-on-click-modal="false">
    <business-auth style="height: 500px;border-top:1px solid #99a9bf;"></business-auth>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import BusinessAuth from './BusinessAuthSet'
  export default {
    data () {
      return {
        queryUrl: '/contract_query',
        isLoading: false,
        selectDate: '',
        totalCount: 0,
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        dataList: [],
        detail: {
          title: '开通业务',
          visiable: false
        }
      }
    },
    components: {
      BusinessAuth
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
      openDiaLog() {
        this.detail.visiable = true
      },
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
