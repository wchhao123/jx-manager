<template>
  <div>
    <el-form :inline="true" :model="queryModel" class="toolbar demo-form-inline">
      <el-row type="flex" >
        <ent-select  title="企业名称" place-holder="企业名称"
                    @input-select="salaryInputSelect">
        </ent-select>
        <el-form-item>
        </el-form-item>
        <el-form-item  label="申请人账号">
          <el-input size="small" v-model="queryModel.mobile" placeholder="请输入申请人账号"></el-input>
        </el-form-item>
          <el-form-item  label="审批状态">
            <el-select size="small" v-model="queryModel.verifyState" filterable clearable placeholder="请选择审批状态">
              <el-option
                v-for="item in entSignStateSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="销售代表">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="queryModel.saleId"
            :fetch-suggestions="querySearch"
            placeholder="请选择销售代表"
            @select="setEntSale"
          >
            <i class="el-icon-edit el-input__icon"
               slot="suffix">
            </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.saleName }}</div>
              <span class="addr">{{ item.value }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
      </el-row>

      <el-row type="flex">
        <!--// 审批人-->
        <el-form-item  label="审批人">
          <el-input size="small" placeholder="请输入审批人" v-model="queryModel.verifyPerson"></el-input>
        </el-form-item>
          <el-form-item label="提交时间">
            <el-date-picker
              class="startDate"
              size="small"
              :editable=false
              v-model="queryModel.startDate"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item >
            <el-date-picker
              class="endDate"
              size="small"
              :editable=false
              v-model="queryModel.endDate"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
      </el-row>
      <el-row type="flex" justify="left">
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_sign_auth')" icon="el-icon-check" style="margin-bottom: 10px" @click="doAddSale">审核
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="entSignAuditTable" :data="entSignDataList" style="width: 100%" border v-loading="isLoading"
              @selection-change="handleSelectionChange">

      <el-table-column
        type="selection" width="55">
      </el-table-column>

      <!--企业Id-->
      <el-table-column prop="enterpriseId" align="center" label="企业编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entId}}</span>
        </template>
      </el-table-column>

      <!--企业名称-->
      <el-table-column prop="enterpriseId" align="center" label="企业名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName}}</span>
        </template>
      </el-table-column>

      <!--运营主企业-->
      <el-table-column prop="enterpriseId" align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.operationEntName}}</span>
        </template>
      </el-table-column>

      <!--申请人账号-->
      <el-table-column prop="enterpriseId" align="center" label="申请人账号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column :span="6"  align="center" label="销售代表" >
        <template slot-scope="scope">
          <span  size="small">{{scope.row.saleName}}</span>
        </template>
      </el-table-column>
      <!--提交时间-->
      <el-table-column width="170" prop="enterpriseId" align="center" label="提交时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.submitDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>

      <!--审批状态-->
      <el-table-column prop="enterpriseId" align="center" label="审批状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.verifyState | filterEntSignAuditState}}</span>
        </template>
      </el-table-column>

      <!--审批人-->
      <el-table-column prop="enterpriseId" align="center" label="审批人">
        <template slot-scope="scope">
          <span size="small">{{scope.row.verifyPerson}}</span>
        </template>
      </el-table-column>

      <!--审批时间-->
      <el-table-column width="170" prop="enterpriseId" align="center" label="审批时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.verifyDate | filterdateYMDHMS}}</span>
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
    <el-dialog :title="detail.title" height="100px" center width="50%" :visible.sync="detail.visiable" :close-on-click-modal="false">
      <sale-set @close="closeDiaLog"  style="border-top:1px solid #99a9bf;" :detail="detail.entInfo"></sale-set>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import EntAuditDetail from '../_14EntRealName/EntAuditDetail.vue'
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import { ERR_OK } from '../../../api/index'
  import SaleSet from './SaleSet'
  export default {
    data () {
      return {
        detail: {
          title: '填写审批信息',
          visiable: false
        },
        isLoading: false,
        tableSpan: 2,
        totalCount: 0,
        multipleSelection: [],
        inputDataList: {
          salaryDataList: []
        },
        queryModel: {
          entId: null,
          mobile: null,
          verifyState: null,
          startDate: null,
          endDate: null,
          verifyPerson: null,
          pageNum: 1,
          pageSize: 10
        },
        entSignDataList: [],
        editIndex: null,
        waitSignEnt: []
      }
    },
    computed: {
      entSignStateSource () {
        return state.funEntSignState()
      }
    },
    methods: {
      querySearch(queryString, cb) {
        if (!queryString) queryString = '张'
        this.$post(this.$url('/sales_list'), {saleName: queryString}).then(res => {
          let array = []
          res.data.forEach((item, index, arr) => {
            array.push({
              value: item.sales_id,
              saleName: item.sales_name
            })
          })
          cb(array)
        })
      },
      closeDiaLog() {
        this.detail.entInfo = {}
        this.detail.visiable = false
        this.resetDoQuery()
      },
      openDiaLog() {
        this.detail.visiable = true
      },
      salaryInputSelect (entId) {
        if (entId !== undefined) {
          this.queryModel.entId = entId
        } else {
          this.queryModel.entId = null
        }
        console.log(this.queryModel.salaryEntId)
      },
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery () {
        this.isLoading = true
        Api.getEntSignInfo(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.entSignDataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        })
      },
      doAddSale() {
        if (this.multipleSelection.length <= 0) {
          this.$message({
            type: 'warning',
            message: '请勾选需要审核的企业'
          })
          return
        }
        this.detail.entInfo = JSON.stringify(this.multipleSelection)
        this.detail.visiable = true
      },
      doVerify () {
        if (this.waitSignEnt === null || this.waitSignEnt.length === 0) {
          this.$message({
            type: 'warning',
            message: '请勾选需要审核的企业'
          })
          return
        }
        this.$confirm('是否同意所选企业的签约申请?', '提示', {
          confirmButtonText: '同意',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let index in this.waitSignEnt) {
            let ent = this.waitSignEnt[index]
            Api.doEntSign({entId: ent.entId}).then(response => {
              this.$notify({
                message: response.data.msg,
                type: response.data.code === Api.ERR_OK ? 'success' : 'error'
              })
              this.doQuery()
            })
          }
          this.$message({
            message: '操作已完成!'
          })
        })
      },
      tableSelectionChange(val) {
        this.waitSignEnt = val
      },
      handleSelectionChange(val) {
        this.multipleSelection = []
        val.forEach((item, index, arr) => {
          if (item.entId && item.signState !== '1') {
            this.multipleSelection.push(item)
          }
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
    },
    components: {
      EntAuditDetail,
      SaleSet
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
/*  .el-row{
    height: 40px;
  }*/
.el-input__inner {
  height 30px
}
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
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
