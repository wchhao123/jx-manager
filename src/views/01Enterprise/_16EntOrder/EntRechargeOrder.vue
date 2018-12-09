<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">

        <!-- 订单号-->
        <el-form-item :span="6" label="订单号">
          <el-input size="small" v-model="queryModel.orderId" placeholder="请输入订单号"></el-input>
        </el-form-item>

        <el-form-item :span="6" label="第三方订单号">
          <el-input size="small" v-model="queryModel.extOrderId" placeholder="请输入第三方订单号"></el-input>
        </el-form-item>

        <el-form-item>
          <ent-select title="发薪企业" place-holder="发薪企业查询"
                      @input-select="salaryInputSelect">
          </ent-select>
        </el-form-item>
        <!--<el-form-item label="审批状态">-->
          <!--<el-select size="small" v-model="queryModel.verifyState" filterable clearable placeholder="请选择审批状态">-->
            <!--<el-option-->
              <!--v-for="item in entOrderAuditStateSource"-->
              <!--:key="item.key"-->
              <!--:label="item.value"-->
              <!--:value="item.key">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      </el-row>
      <el-row type="flex">

          <el-form-item label="订单状态">
            <el-select size="small" v-model="queryModel.orderState" filterable clearable placeholder="请选择订单状态">
              <el-option
                v-for="item in entOrderStateSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="提交时间">
          <el-date-picker
            size="small"
            v-model="selectDateRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="充值方式">
        <el-select size="small" v-model="queryModel.orderType" filterable clearable placeholder="全部">
        <el-option
        v-for="item in entOrderRechargeTypeSource"
        :key="item.key"
        :label="item.value"
        :value="item.key">
        </el-option>
        </el-select>
        </el-form-item>

      </el-row>
      <el-row type="flex" justify="left">
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" @click="resetDoQuery" :disabled="isLoading">查询
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_recharge_order_auth')" icon="el-icon-check" style="margin-bottom: 10px" @click="doSign">审核
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="entSignAuditTable" :data="entRechargeOrderList" style="width: 100%" border
              highlight-current-row
              v-loading="isLoading"
              @row-click="tableRowClick"
    >

      <!--订单号-->
      <el-table-column prop="enterpriseId" align="center" label="订单号" fixed>
        <template slot-scope="scope">
          <span class="globalPointer" size="small"
                @click.stop="toRechargeDetail(scope.$index,scope.row)">{{scope.row.orderId}}</span>
        </template>
      </el-table-column>

      <!--第三方订单号-->
      <el-table-column prop="enterpriseId" align="center" label="第三方订单号" fixed>
        <template slot-scope="scope">
          <span class="globalPointer" size="small"
                >{{scope.row.extOrderId}}</span>
        </template>
      </el-table-column>

      <!--充值企业-->
      <el-table-column prop="enterpriseId" align="center" label="充值企业">
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

      <!--充值金额-->
      <el-table-column prop="enterpriseId" align="center" label="充值金额(元)">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.orderAmount"></span>
        </template>
      </el-table-column>

      <!--服务费-->
      <el-table-column prop="enterpriseId" align="center" label="服务费(元)">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.freeAmount"></span>
        </template>
      </el-table-column>

      <!--服务费率-->
      <el-table-column prop="enterpriseId" align="center" label="服务费率%">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.rate"></span>
        </template>
      </el-table-column>

      <!--订单总额-->
      <el-table-column prop="enterpriseId" align="center" label="订单总金额(元)">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.payAmount"></span>
        </template>
      </el-table-column>

      <!--订单状态-->
      <el-table-column prop="enterpriseId" align="center" label="订单状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.orderState | filterEntRechargeOrderState()}}</span>
        </template>
      </el-table-column>

      <!--&lt;!&ndash;提交时间&ndash;&gt;-->
      <!--<el-table-column width="170" prop="enterpriseId" align="center" label="提交时间">-->
        <!--<template slot-scope="scope">-->
          <!--<span size="small">{{scope.row.createTime | filterdateYMDHMS()}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--&lt;!&ndash;审批状态&ndash;&gt;-->
      <!--<el-table-column prop="enterpriseId" align="center" label="审批状态">-->
        <!--<template slot-scope="scope">-->
          <!--<span size="small">{{scope.row.verifyState | filterEntRechargeOrderVerifyState() }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--&lt;!&ndash;审批时间&ndash;&gt;-->
      <!--<el-table-column width="170" prop="enterpriseId" align="center" label="审批时间">-->
        <!--<template slot-scope="scope">-->
          <!--<span size="small">{{scope.row.verifyDate | filterdateYMDHMS()}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--充值方式-->
      <el-table-column prop="enterpriseId" align="center" label="充值方式">
        <template slot-scope="scope">
          <span size="small">{{scope.row.orderType | filterEntRechargeOrderRechargeType()}}</span>
        </template>
      </el-table-column>

      <!--订单创建时间-->
      <el-table-column width="170" prop="enterpriseId" align="center" label="订单创建时间">
      <template slot-scope="scope">
      <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
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
    <el-dialog title="充值订单详情" center :close-on-click-modal="1===0"
               :visible.sync="detail.visiable"
               width="50%">
      <ent-recharge-detail :detail="this.detail.model"></ent-recharge-detail>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import { ERR_OK } from '../../../api/index'
  import EntRechargeDetail from './EntRechargeDetail.vue'
  import * as filters from 'filters'
  export default {
    data () {
      return {
        isLoading: false,
        tableSpan: 2,
        totalCount: 0,
        inputDataList: {
          salaryDataList: []
        },
        queryModel: {
          orderId: '',
          extOrderId: '',
          entId: '',
          orderType: '',
          startDate: null,
          endDate: null,
          pageNum: 1,
          pageSize: 10
        },
        selectDateRange: '',
        selectEntInfo: null, // 待审核企业数据
        detail: {
          visiable: false,
          model: ''
        },
        entRechargeOrderList: [],
        editIndex: null,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    computed: {
      entOrderRechargeTypeSource() {
        return state.funEntRechargeOrderRechargeType()
      },
      entOrderAuditStateSource () {
        return state.funRechargeOrderVerifyType()
      },
      entOrderStateSource () {
        return state.funRechargeOrderStateType()
      }
    },
    methods: {
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
        if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
          this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDateRange[0])
          this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDateRange[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        Api.getEntRechargeOrder(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.entRechargeOrderList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        })
      },
      toRechargeDetail (index, row) {
        console.log(`点击查看充值订单详情 index ${index}}`)
        console.log(row)
        this.detail.model = row
        this.detail.visiable = true
      },
      doSign () {
        if (this.selectEntInfo === null) {
          this.$message({
            type: 'error',
            message: '请先点击选中需要审核的企业'
          })
          return
        }
        if (this.selectEntInfo.verifyState.toString() === '1') {
          this.$message({
            type: 'error',
            message: '该订单已被审批'
          })
          return
        }

        this.$prompt('请输入嘉福JOC充值订单号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*/,
          inputErrorMessage: '可以设置订单号正则'
        }).then(({value}) => {
          Api.doEntRechargeOrderVerify({
            keyId: this.selectEntInfo.keyId,
            entId: this.selectEntInfo.entId,
            orderId: value
          }).then(response => {
            if (response.data.code === ERR_OK) {
              this.$notify({
                type: 'success',
                message: '订单 ' + this.selectEntInfo.keyId + ' 审批通过'
              })
              this.selectEntInfo = null
              this.doQuery()
            } else {
              this.$notify({
                type: 'error',
                message: '订单 ' + this.selectEntInfo.keyId + ' 数据异常,审批未通过!'
              })
            }
          })
          this.$message(
            '你输入的: ' + value + '审批已提交'
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消审批!'
          })
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
      },
      tableRowClick(row, event, column) {
        this.selectEntInfo = row
      }
    },
    components: {
      EntRechargeDetail
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
