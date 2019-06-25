<template>
    <div>
      <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline" label-width="100px">
        <el-row type="flex">
          <el-col :span="6">
          <el-form-item label="姓名:">
            <el-input size="small" placeholder="请输入姓名" v-model="queryModel.userName"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="手机号:">
            <el-input size="small" placeholder="请输入手机号" v-model="queryModel.mobile"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item label="审批状态:">
            <el-select size="small" v-model="queryModel.verifyState" filterable clearable placeholder="请选择审批状态">
              <el-option
                v-for="item in _userVerifyAuthStateResource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>

          <el-col :span="6">
          <el-form-item label="审批人:">
            <el-input size="small" placeholder="请输入审批人" v-model="queryModel.verifyPerson"></el-input>
          </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="10">
          <el-form-item label="提交时间:">
            <el-date-picker  size="small"
              v-model="selectDateRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          </el-col>
          <el-col  :span="6">
          <el-form-item>
            <el-button size="mini" type="primary" icon="el-icon-check"
                       :disabled="isLoading"
                       @click="_doQuery"
                       style="margin-bottom: 10px" >查询
            </el-button>
          </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table  :data="dataList" border style="width: 100%"
                 highlight-current-row v-loading="isLoading">
        <el-table-column align="center" label="姓名">
          <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="手机号">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="证件类型">
          <template slot-scope="scope">
            <span>{{scope.row.idType | filterUserIdNumType}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="证件号">
          <template slot-scope="scope">
            <span>{{scope.row.idNumber}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="提交时间">
          <template slot-scope="scope">
            <span>{{scope.row.submitTime| filterdateYMDHMS}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="审批状态">
          <template slot-scope="scope">
            <span>{{scope.row.verifyState | filterUserVerifyAuthState}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="审批人">
          <template slot-scope="scope">
            <span>{{scope.row.verifyPerson}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="审批时间">
          <template slot-scope="scope">
            <span>{{scope.row.verifyTime| filterdateYMDHMS}}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="120"  align="center">
          <template slot-scope="scope" >
            <el-button type="danger" size="small" plain v-show="scope.row.verifyState === '0' && isOwnAuth"
                       @click="_checkVerifyDetail(scope.row)">审核</el-button>

            <el-button  @click.native.prevent="_checkVerifyDetail(scope.row)"
                        v-show="scope.row.verifyState !== '0' && isOwnSelectDetail"
                        type="primary" plain size="small">查看认证资料</el-button>
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
      <el-dialog title="认证详情" center
                 :close-on-click-modal="1===0"
                 :visible.sync="detail.visiable"
                 width="40%">
        <user-verify-detail
          :detail="detail.model"
          @cancelEdit="closeVerifyDialog"
        >
        </user-verify-detail>
      </el-dialog>
    </div>
</template>

<script>
  import * as Api from 'api'
  import * as Const from 'common/js/const'
  import * as state from 'common/js/state-dic'
  import * as filters from 'filters'

  import UserVerifyDetail from './UserVerifyDetail'
  export default {
    data() {
      return {
        isLoading: false,
        totalCount: 0,
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        selectDateRange: '',
        dataList: [],
        detail: {
          visiable: false,
          title: ''
        }
      }
    },
    computed: {
      pickerOptions() {
        return Const.timePickerOption
      },
      _userVerifyAuthStateResource() {
        return state.funUserVerifyAuthState()
      },
      isOwnSelectDetail() {
        return this.$store.getters.getBtnIsShowByName('btn_user_verify_detail')
      },
      isOwnAuth() {
        return this.$store.getters.getBtnIsShowByName('btn_user_verify_auth')
      }
    },
    methods: {
      _resetQuery() {
        this.queryModel.pageNum = 1
        this._doQuery()
      },
      _doQuery() {
        if (this.selectDateRange !== null && this.selectDateRange.length > 1) {
          this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDateRange[0])
          this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDateRange[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        this.isLoading = true
        Api.getUserVerifyInfoList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === Api.ERR_OK) {
            this.dataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        })
      },
      closeVerifyDialog() {
        this.detail.visiable = false
        this._doQuery()
      },
      _checkVerifyDetail(row) {
        this.detail.model = row
        this.detail.visiable = true
      },
      pageHandelCurrentChange (val) {
        this.queryModel.pageNum = val
        this._doQuery()
      },
      pageChange (val) {
        console.log('pageChange')
        console.log(val)
      }
    },
    components: {
      UserVerifyDetail
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
