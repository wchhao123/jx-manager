<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">

        <!-- 订单号-->
        <el-form-item label="订单号">
          <el-input size="small" v-model="queryModel.orderId" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <!-- 账号-->
        <el-form-item label="用户姓名">
          <el-input size="small" v-model="queryModel.userName" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <!-- 账号-->
        <el-form-item label="账号">
          <el-input size="small" v-model="queryModel.mobile" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单类型">
          <el-select size="small" v-model="queryModel.orderType" filterable clearable placeholder="请选择订单类型">
            <el-option
              v-for="item in userOrderTypeResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row type="flex">
          <el-form-item label="订单状态">
            <el-select size="small" v-model="queryModel.orderState" filterable clearable placeholder="请选择订单状态">
              <el-option
                v-for="item in userOrderStateResource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提交时间">
            <el-date-picker
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
        <el-form-item label="第三方订单号">
          <el-input size="small" v-model="queryModel.extOrderId" placeholder="请输入第三方订单号"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="left">
        <el-col :span="3">
          <el-button size="small" type="primary" :disabled="isLoading" icon="el-icon-search" style="margin-bottom: 10px" @click="resetDoQuery">查询
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-check"
                     @click="_exportUserOrder"
                     style="margin-bottom: 10px" >导出
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="entSignAuditTable" :data="dataList" style="width: 100%" border
              highlight-current-row v-loading="isLoading"
    >

      <!--订单号-->
      <el-table-column  align="center" label="订单号" fixed>
        <template slot-scope="scope">
          <span class="globalPointer" size="small"
                @click.stop="toUserOrderDetail(scope.$index,scope.row)">{{scope.row.orderId}}</span>
        </template>

      </el-table-column>

      <el-table-column align="center" label="第三方订单号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.extOrderId}}</span>
        </template>
      </el-table-column>

      <!--用户姓名-->
      <el-table-column align="center" width="120" label="用户姓名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <!--账号-->
      <el-table-column align="center" width="120" label="账号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <!--订单类型-->
      <el-table-column align="center" width="50" label="订单类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.orderType | filterUserOrderType}}</span>
        </template>
      </el-table-column>

      <!--订单状态-->
      <el-table-column align="center" width="80" label="订单状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.orderState | filterUserOrderState}}</span>
        </template>
      </el-table-column>

      <!--订单金额-->
      <el-table-column  align="center" width="100" label="订单金额(元)">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.orderAmount"></span>
        </template>
      </el-table-column>

      <!--支付金额-->
      <el-table-column  align="center" width="100" label="支付金额(元)">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.payAmount"></span>
        </template>
      </el-table-column>

      <!--手续费-->
      <el-table-column  align="center" width="80" label="手续费(元)">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.rateAmount"></span>
        </template>
      </el-table-column>

      <!--优惠-->
      <el-table-column  align="center" width="60" label="优惠(元)">
        <template slot-scope="scope">
          <span size="small" v-text="scope.row.freeAmount"></span>
        </template>
      </el-table-column>

      <!--订单创建时间-->
      <el-table-column  prop="enterpriseId" align="center" label="订单创建时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>

      <!--订单完成时间-->
      <el-table-column prop="enterpriseId" align="center" label="订单完成时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.finishDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
      <!--订单完成时间-->
      <el-table-column prop="enterpriseId" align="center" label="订单退款时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.returnDate | filterdateYMDHMS()}}</span>
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
    <el-dialog title="订单详情" center :close-on-click-modal="1===0"
               :visible.sync="detail.visiable"
               width="40%">
      <user-order-detail :model="this.detail.model"/>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import { ERR_OK } from '../../../api/index'
  import UserOrderDetail from './UserOrderDetail'
  import * as filters from 'filters'
  import * as Const from 'common/js/const'

  export default {
    data () {
      return {
        isLoading: false,
        totalCount: 0,
        inputDataList: {
          salaryDataList: []
        },
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        selectDateRange: '',
        detail: {
          visiable: false,
          model: ''
        },
        dataList: []
      }
    },
    computed: {
      userOrderTypeResource () {
        return state.funUserOrderType()
      },
      userOrderStateResource () {
        return state.funUserOrderState()
      },
      pickerOptions2 () {
        return Const.timePickerOption
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
        Api.getUserOrder(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.dataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        })
      },
      _exportUserOrder() {
        this.$confirm('确认需要导出订单数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          Api.exportUserOrder(this.queryModel).then(resp => {
            this.isLoading = false
            let blob = new Blob([resp.data], {type: 'application/vnd.ms-excel'})
            let objectUrl = URL.createObjectURL(blob)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = objectUrl
            link.setAttribute('download', '用户订单.xls')
            document.body.appendChild(link)
            link.click()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      toUserOrderDetail (index, row) {
        console.log(`点击查看订单详情 index ${index}}`)
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
      },
      pageChange (val) {
        console.log('pageChange')
        console.log(val)
      }
    },
    components: {
      UserOrderDetail
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
