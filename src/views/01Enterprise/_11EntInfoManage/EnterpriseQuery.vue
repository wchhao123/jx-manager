<template>
   <div>
      <el-form :inline="true" :model="queryModel" class="toolbar demo-form-inline" label-position="right">
        <el-row type="flex">
            <ent-select title="发薪企业" place-holder="请选择发薪企业"
                        @input-select="salaryInputSelect">
            </ent-select>
            <el-form-item label="认证状态">
              <el-select size="small" v-model="queryModel.verifyState" filterable clearable placeholder="请选择认证状态">
                <el-option
                  v-for="item in entAuthStateSource"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签约状态">
              <el-select size="small" v-model="queryModel.signState" filterable clearable placeholder="请选择签约状态">
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
                v-model="queryModel.saleName"
                :fetch-suggestions="querySearch"
                placeholder="请选择销售代表"
                @select="setEntSale"
              >
                <i class="el-icon-edit el-input__icon"
                   slot="suffix">
                </i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">{{ item.saleId }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="创建时间开始">
              <el-date-picker
                class="startDate"
                size="small"
                :editable=false
                v-model="queryModel.startDate"
                type="date"
                placeholder="请选择开始时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间结束">
              <el-date-picker
                class="endDate"
                size="small"
                :editable=false
                v-model="queryModel.endDate"
                type="date"
                placeholder="请选择结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="运营主企业">
              <el-input size="small" clearable v-model="queryModel.operationEntName" placeholder="请输入运营主企业名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="3">
            <el-button  size="small" type="primary" icon="el-icon-search" :disabled="isLoading" @click="resetDoQuery">查询</el-button>
          </el-col>
        </el-row>
      </el-form>

     <el-table
       ref="salaryEntTable" :data="entDataList" style="width: 100%" border
       v-loading="isLoading"
       @cell-click="_cellClick"
       @row-click="tableRowClick" >
       <!--企业编号-->
       <el-table-column :span="6" align="center" label="企业编号" >
         <template slot-scope="scope">
           <span class="globalPointer" size="small"  @click.stop="clickEntId(scope.$index, scope.row)">{{scope.row.entId}}</span>
         </template>
       </el-table-column>

       <!--企业名称-->
       <el-table-column  :span="6"  align="center" label="企业名称" >
         <template slot-scope="scope">
           <span  size="small">{{scope.row.entName}}</span>
         </template>
       </el-table-column>

       <!--运营主企业-->
       <el-table-column :span="6"  align="center" label="运营主企业" >
         <template slot-scope="scope">
           <span  size="small">{{scope.row.operationEntName}}</span>
         </template>
       </el-table-column>

       <!--企业管理员-->
       <el-table-column :span="6"  align="center" label="企业管理员" >
         <template slot-scope="scope">
           <span class="globalPointer" size="small"  @click.stop="_entAdminDetail(scope.row)">{{scope.row.entAdminCount}}</span>
         </template>
       </el-table-column>

       <!--银行卡信息-->
       <el-table-column :span="6" align="center" label="银行卡信息" >
         <template slot-scope="scope">
           <span class="globalPointer"  size="small" @click.stop="_entBankCardInfo(scope.row)">{{scope.row.entBankcardCount}}</span>
         </template>
       </el-table-column>
       <el-table-column :span="6"  align="center" label="销售代表" >
         <template slot-scope="scope">
           <span  size="small">{{scope.row.saleName}}</span>
         </template>
       </el-table-column>
       <!--认证状态-->
       <el-table-column :span="6"  align="center" label="认证状态ddd" >
         <template slot-scope="scope">
           <span size="small">{{scope.row.verifyState | filterEntVerifyState}}</span>
           <span style="color: #F56C6C; cursor: pointer;"
                 v-show="scope.row.verifyState==='0' || scope.row.verifyState==='2'"
                 size="small"
                 @click.stop="_helpVerify(scope.row)"
           >帮助认证</span>
           <span style="color: #F56C6C; cursor: pointer;"
                 v-show="scope.row.verifyState=== '3'"
                 size="small"
                 @click.stop="_updateVerify(scope.row)"
           >变更信息</span>
         </template>
       </el-table-column>

       <!--签约状态-->
       <el-table-column :span="6" align="center" label="签约状态" >
         <template slot-scope="scope">
           <span  size="small">{{scope.row.signState | filterEntSignState}}</span>
         </template>
       </el-table-column>

       <!--创建时间-->
       <el-table-column :span="6" align="center"
         label="日期">
         <template slot-scope="scope">{{ scope.row.createDate | filterdateYMDHMS}}</template>
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
           :total="total">
         </el-pagination>
       </div>
     </el-col>
     <el-dialog :title="detail.title" center width="60%"
                @close="() => {this.detail.entId=''}"
                :visible.sync="detail.visible" :close-on-click-modal="1==0" >
       <ent-detail :ent-id="detail.entId" :timestamp="detail.timeStamp" :is-edit="detail.isEdit" @cancelEdit="closeEditDialog"></ent-detail>
     </el-dialog>
     <el-dialog title="企业管理员信息" center width="50%"
                :close-on-click-modal="1==0"
                @close="() => {this.detail.entId=''}"
                :visible.sync="detail.adminVisible">
       <ent-admin :ent-id="detail.entId" @cancelEdit="_closeEntAdmin"></ent-admin>
     </el-dialog>

     <el-dialog title="企业银行卡信息" center width="80%"
                :close-on-click-modal="1==0"
                @close="() => {this.detail.entId=''}"
                :visible.sync="detail.bankCardVisible">
       <ent-bank-card :ent-id="detail.entId" @cancelEdit="_closeEntBankCard"></ent-bank-card>
     </el-dialog>

     <el-dialog title="企业认证" center width="60%"
                :close-on-click-modal="1==0"
                @close="() => {this.detail.entId=''}"
                :visible.sync="detail.helpVerifyVisible">
       <ent-verify :ent-id="detail.entId" @cancelEdit="_closeEntVerify"></ent-verify>
     </el-dialog>
     <el-dialog title="企业认证信息变更" center width="60%"
                :close-on-click-modal="1==0"
                @close="() => {this.detail.entId=''}"
                :visible.sync="detail.updateVerifyVisible">
       <ent-update :ent-id="detail.entId" @cancelEdit="_closeUpdateVerify"></ent-update>
     </el-dialog>
   </div>
</template>

<script type="text/ecmascript-6">
import * as Api from 'api'
import * as state from 'common/js/state-dic'
import * as filters from 'filters'
import EntDetail from './EntDetail'
import EntAdmin from './EntAdministrator'
import EntBankCard from './EntBankCard'
import EntVerify from './EntVerify'
import EntUpdate from './EntUpdate'
export default {
  data () {
    return {
      total: 10,
      isLoading: false,
      sale: {},
      queryModel: {
        verifyState: null,
        signState: null,
        entName: null,
        salaryEntId: null,
        startDate: null,
        endDate: null,
        pageSize: 10,
        pageNum: 1
      },
      entDataList: [],
      entId: '',
      detail: {
        entId: '',
        title: '企业详情',
        isEdit: false,
        visible: false,
        adminVisible: false,
        bankCardVisible: false,
        helpVerifyVisible: false,
        timeStamp: ''
      },
      selectRow: null
    }
  },
  activated() {
    console.log(this.$store.getters.btns)
  },
  computed: {
    entAuthStateSource() {
      return state.entVerifyState()
    },
    entSignStateSource() {
      return state.entSignState()
    }
  },
  methods: {
    setEntSale(item) {
      this.sale = item
      this.queryModel.saleId = item.saleId
    },
    querySearch(queryString, cb) {
      if (!queryString) queryString = '张'
      this.$post(this.$url('/sales_list'), {saleName: queryString}).then(res => {
        let array = []
        res.data.forEach((item, index, arr) => {
          array.push({
            value: item.sales_name,
            saleId: item.sales_id
          })
        })
        cb(array)
      })
    },
    resetDoQuery() {
      this.queryModel.pageNum = 1
      this.getEntList()
    },
    salaryInputSelect(entId) {
      if (entId !== undefined) {
        this.queryModel.salaryEntId = entId
      } else {
        this.queryModel.salaryEntId = null
      }
      console.log(this.queryModel.salaryEntId)
    },
    updateEnterprise() {
    },
    getEntList() {
      console.log(`企业查询 ${this.queryModel}`)

      let _startDate = this.queryModel.startDate
      let _endDate = this.queryModel.endDate
      if (this.queryModel.startDate !== null) {
        this.queryModel.startDate = filters.parseTime(this.queryModel.startDate, '{y}-{m}-{d}')
      }
      if (this.queryModel.endDate !== null) {
        this.queryModel.endDate = filters.parseTime(this.queryModel.endDate, '{y}-{m}-{d}')
      }
      console.log(this.queryModel)
      this.isLoading = true
      if (this.sale && this.queryModel.saleName !== this.sale.value) {
        this.queryModel.saleId = null
      }
      Api.getEntList(this.queryModel).then(response => {
        this.isLoading = false
        this.entDataList = response.data.data.list
        this.total = parseInt(response.data.data.totalCount)
        this.queryModel.startDate = _startDate
        this.queryModel.endDate = _endDate
      })
    },
    clickEntId(index, row) {
      console.log('clickEntId')

      let r = this.$store.getters.getBtnIsShowByName('btn_ent_detail')
      if (!r) {
        console.log('哈哈, 你木有权限!')
        return
      }
      this.detail.entId = row.entId
      this.detail.isEdit = false
      this.detail.title = '企业详情'
      this.detail.visible = true
      this.detail.timeStamp = new Date().getTime().toString()
      this.selectRow = null
    },
    _entAdminDetail(row) {
      console.log('查看企业管理员信息')
      let r = this.$store.getters.getBtnIsShowByName('btn_ent_detail')
      if (!r) {
        console.log('哈哈, 你木有权限!')
        return
      }
      this.detail.entId = row.entId
      this.detail.adminVisible = true
    },
    _entBankCardInfo(row) {
      console.log('查看企业银行卡信息')
      let r = this.$store.getters.getBtnIsShowByName('btn_ent_detail')
      if (!r) {
        console.log('哈哈, 你木有权限!')
        return
      }
      this.detail.entId = row.entId
      this.detail.bankCardVisible = true
    },
    _helpVerify(row) {
      console.log('帮助企业认证')
      let r = this.$store.getters.getBtnIsShowByName('btn_ent_detail')
      if (!r) {
        console.log('哈哈, 你木有权限!')
        return
      }
      this.detail.entId = row.entId
      this.detail.helpVerifyVisible = true
    },
    _updateVerify(row) {
      console.log('企业认证信息变更')
      let r = this.$store.getters.getBtnIsShowByName('btn_ent_detail')
      if (!r) {
        console.log('哈哈, 你木有权限!')
        return
      }
      this.detail.entId = row.entId
      this.detail.updateVerifyVisible = true
    },
    pageHandelCurrentChange(val) {
      this.queryModel.pageNum = val
      this.getEntList()
      console.log('pageHandelCurrentChange')
      console.log(this.queryModel)
      console.log(val)
    },
    _cellClick(row, column, cell, event) {
      let label = column.label
      this.detail.entId = row.entId
      if (label === '企业管理员') {
        console.log('查看企业管理员信息')
        let r = this.$store.getters.getBtnIsShowByName('btn_ent_detail')
        if (!r) {
          console.log('哈哈, 你木有权限!')
          return
        }
        this.detail.adminVisible = true
      } else if (label === '银行卡信息') {
        console.log('查看企业银行卡信息')
        let r = this.$store.getters.getBtnIsShowByName('btn_ent_detail')
        if (!r) {
          console.log('哈哈, 你木有权限!')
          return
        }
        this.detail.bankCardVisible = true
      }
    },
    tableRowClick(row, event, column) {
      console.log('tableRowClick')
      this.selectRow = row
      this.$refs.salaryEntTable.setCurrentRow(row)
      console.log(this.selectRow)
    },
    pageChange(val) {
      console.log('pageChange')
      console.log(val)
    },
    closeEditDialog() {
      this.detail.visible = false
      this.getEntList()
    },
    _closeEntAdmin() {
      this.detail.adminVisible = false
      this.getEntList()
    },
    _closeEntBankCard() {
      this.detail.bankCardVisible = false
      this.getEntList()
    },
    _closeEntVerify(state) {
      this.detail.helpVerifyVisible = false
      if (state === 1) {
        this.getEntList()
      }
    },
    _closeUpdateVerify(state) {
      this.detail.updateVerifyVisible = false
      if (state === 1) {
        this.getEntList()
      }
    }
  },
  components: {
    EntDetail,
    EntAdmin,
    EntBankCard,
    EntVerify,
    EntUpdate
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
