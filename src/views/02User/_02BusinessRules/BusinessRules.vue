<template>
  <div>
    <el-form class="toolbar demo-form-inline" :inline="true" :model="queryModel" label-position="right">
      <el-row>
        <el-form-item label="业务类型">
          <el-select size="small" v-model="queryModel.businessType" filterable clearable placeholder="请选择业务类型">
            <el-option
              v-for="item in businessRuleTypeResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则状态">
          <el-select size="small" v-model="queryModel.ruleState" filterable clearable placeholder="">
            <el-option
              v-for="item in businessRuleStateResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="left">
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search"
                     style="margin-bottom: 10px; margin-left: 50px" :disabled="isLoading"
                     @click="resetDoQuery">查询
          </el-button>
        </el-col>
        <!--<el-col :span="3">-->
          <!--<el-button size="small" type="danger" icon="el-icon-check"-->
                     <!--v-show="this.$store.getters.getBtnIsShowByName('btn_user_role_add')"-->
                     <!--style="margin-bottom: 10px; margin-left: 50px"-->
                     <!--@click="addRule">新增规则-->
          <!--</el-button>-->
        <!--</el-col>-->
      </el-row>
    </el-form>
    <el-table ref="businessRule" :data="dataList" style="width: 100%" border v-loading="isLoading">

      <!--业务类型-->
      <el-table-column align="center" label="业务类型" fixed>
        <template slot-scope="scope">
          <span size="small">{{scope.row.businessType|filterUserBusinessRuleType}}</span>
        </template>
      </el-table-column>

      <!--单笔最小金额-->
      <el-table-column align="center" label="单笔最小金额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.amountMin}}</span>
        </template>
      </el-table-column>

      <!--单笔最大金额-->
      <el-table-column align="center" label="单笔最大金额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.amountMax}}</span>
        </template>
      </el-table-column>

      <!--当日最大笔数-->
      <el-table-column align="center" label="当日最大笔数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.dayMaxCount}}</span>
        </template>
      </el-table-column>

      <!--当日最大金额-->
      <el-table-column align="center" label="当日最大金额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.dayMaxAmount}}</span>
        </template>
      </el-table-column>

      <!--当月最大金额-->
      <el-table-column align="center" label="当月最大金额(元)">
        <template slot-scope="scope">
          <span size="small">{{scope.row.monthMaxAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="当月按证件限额全额(元)">
        <template slot-scope="scope">
          <span size="small" v-if="scope.row.monthMaxAmountByIdNumber!=''||scope.row.monthMaxAmountByIdNumber!=null">{{scope.row.monthMaxAmountByIdNumber}}</span>
          <span size="small" v-if="scope.row.monthMaxAmountByIdNumber==null">{{'= ='}}</span>
        </template>
      </el-table-column>

      <!--规则状态-->
      <el-table-column align="center" label="规则状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.ruleState|filterUserBusinessRuleState}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <!--<el-button @click="changeRule(scope.row)"-->
                     <!--:type="scope.row.ruleState.toString() === '0' ? 'danger' : 'warning'"-->
                     <!--v-show="isOwnCloseRole"-->
                     <!--plain size="small">-->
            <!--{{scope.row.ruleState.toString() === '0' ? '启用' : '关闭'}}-->
          <!--</el-button>-->
          <!--<el-button @click="updateRules(scope.row)"-->
                     <!--v-show="isOwnUpdateRole"-->
                     <!--type="primary" plain size="small">修改-->
          <!--</el-button>-->
          <el-button @click="updateRules(scope.row)"
                     v-show="isOwnUpdateRole"
                     type="primary" plain size="small">查看
          </el-button>
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
    <el-dialog :title="ruleDetail.title" center width="40%" :visible.sync="ruleDetail.visible"
               :close-on-click-modal="1===0">
      <rule-detail :istoBank="ruleDetail.istoBank" :model="ruleDetail.model"
                   @cancelEdit="cancelEdit"
      ></rule-detail>
    </el-dialog>
  </div>
</template>

<script>
  import * as Api from 'api'
  import * as state from 'common/js/state-dic'
  import RuleDetail from './RuleDetail'
  import * as filter from 'filters'

  export default {
    data() {
      return {
        isLoading: false,
        totalCount: 1,
        dataList: [],
        queryModel: {
          ruleState: '1',
          pageNum: 1,
          pageSize: 10
        },
        ruleDetail: {
          title: '',
          visible: false,
      //    isAdd: false,
          istoBank:false
        }
      }
    },
    computed: {
      businessRuleTypeResource() {
        return state.funUserBusinessRuleType()
      },
      businessRuleStateResource() {
        return state.funUserBusinessRuleState()
      },
      // isOwnCloseRole() {
      //   return this.$store.getters.getBtnIsShowByName('btn_user_role_close')
      // },
      isOwnUpdateRole() {
        return this.$store.getters.getBtnIsShowByName('btn_user_role_update')
      }
    },
    methods: {
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery() {
        this.isLoading = true
        Api.getBusinessRules(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === Api.ERR_OK) {
            this.dataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        })
      },
      // addRule() {
      //   console.log('新增业务规则')
      //   this.ruleDetail.title = '新增规则'
      //   this.ruleDetail.isAdd = true
      //   this.ruleDetail.model = {}
      //   this.ruleDetail.visible = true
      // },
      updateRules(row) {
        console.log(`业务规则 ${row}`+(filter.filterUserBusinessRuleType(row.businessType)))

        this.ruleDetail.visible = true
        this.ruleDetail.title = filter.filterUserBusinessRuleType(row.businessType)+'业务规则'
     //   this.ruleDetail.c = false
        console.log(row.businessType)
        if(row.businessType === '1'){
          this.ruleDetail.istoBank = true
        }else this.ruleDetail.istoBank = false
        console.log(this.ruleDetail.istoBank)
        this.ruleDetail.model = JSON.parse(JSON.stringify(row))
      },
      pageChange() {
      },
      pageHandelCurrentChange(val) {
        console.log('点击分页查询')
        this.queryModel.pageNum = val
        this.doQuery()
      },
      changeRule(row) {
        row.ruleState = row.ruleState.toString() === '1' ? '0' : '1'
        Api.updateBusinessRule(
          {
            keyId: row.keyId,
            ruleState: row.ruleState,
            businessType: row.businessType
          })
          .then(response => {
            this.$notify({
              message: response.data.msg,
              type: response.data.code === Api.ERR_OK ? 'success' : 'error'
            })
            this.doQuery()
          })
      },
      cancelEdit(isRefresh) {
        this.ruleDetail.visible = false
        if (isRefresh.toString() === '1') {
          this.doQuery()
        }
      }
    },
    components: {
      RuleDetail
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
