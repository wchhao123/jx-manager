<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">
        <el-form-item>
          <ent-select :span="6" title="企业名称" place-holder="企业名称"
                      @input-select="salaryInputSelect">
          </ent-select>
        </el-form-item>
        <el-form-item :span="6" label="申请人账号">
          <el-input size="small" v-model="queryModel.mobile" placeholder="请输入申请人账号"></el-input>
        </el-form-item>

        <el-form-item label="审批状态">
          <el-select size="small" v-model="queryModel.verifyState" filterable clearable placeholder="请选择审批状态">
            <el-option
              v-for="item in entAuditSource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <!--// 审批人-->
        <el-form-item label="审批人">
          <el-input size="small" placeholder="请输入审批人"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
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
        <el-form-item>
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
      </el-row>
    </el-form>

    <el-table ref="entAuditTable" :data="entAuditDataList" style="width: 100%" border v-loading="isLoading">
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

      <!--提交时间-->
      <el-table-column width="170" prop="enterpriseId" align="center" label="提交时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.submitDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>

      <!--&lt;!&ndash;第三方认证结果&ndash;&gt;-->
      <!--<el-table-column :span="6" prop="enterpriseId" align="center" label="第三方认证结果" >-->
      <!--<template slot-scope="scope">-->
      <!--<span   size="small"    >{{scope.row.verifyState}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--审批状态-->
      <el-table-column width="100" prop="enterpriseId" align="center" label="审批状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.verifyState | filterEntAudit}}</span>
        </template>
      </el-table-column>

      <!--审批人-->
      <el-table-column width="100" prop="enterpriseId" align="center" label="审批人">
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

      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <!--<el-button v-if="parseInt(scope.row.verifyState) === 1"-->
                     <!--type="danger" size="small" plain-->
                     <!--@click="doAudit(scope.row,scope.$index)">审核-->
          <!--</el-button>-->

          <!--<el-button v-else @click.native.prevent="lookVerifyInfo(scope.row)"-->
                     <!--type="primary" plain size="small">查看认证资料-->
          <!--</el-button>-->

          <el-button v-show="parseInt(scope.row.verifyState) === 1 && isHaveAuth"
                     type="danger" size="small" plain
                     @click="doAudit(scope.row,scope.$index)">审核
          </el-button>

          <el-button v-show="parseInt(scope.row.verifyState) !== 1 && isHaveSee"
                     @click.native.prevent="lookVerifyInfo(scope.row)"
                     type="primary" plain size="small">查看认证资料
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
    <el-dialog :title="detail.title" center width="60%" :visible.sync="detail.visible" :close-on-click-modal="1===0">
      <ent-audit-detail :detail="detail.model" :is-edit="detail.isEdit" @done="closeEditDialog">
      </ent-audit-detail>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import EntSelect from 'components/select/EntSelect'
  import EntAuditDetail from './EntAuditDetail.vue'
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import { ERR_OK } from '../../../api/index'

  export default {
    data () {
      return {
        isLoading: false,
        totalCount: 0,
        detail: {
          isEdit: false,
          visible: false,
          title: '企业详情',
          model: {}
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
        entAuditDataList: [],
        editIndex: null
      }
    },
    computed: {
      entAuditSource () {
        return state.funEntAudit()
      },
      isHaveAuth() {
        return this.$store.getters.getBtnIsShowByName('btn_ent_true_auth')
      },
      isHaveSee() {
        return this.$store.getters.getBtnIsShowByName('btn_ent_true_select')
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
        Api.getEntAuditInfo(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.entAuditDataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
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
      },
      // 查看认证信息
      lookVerifyInfo (detail) {
        this.detail.model = detail
        this.detail.isEdit = false
        // 每次打开将图片变成最小
        this.detail.visible = true
      },
      doAudit (detail, index) {
        this.editIndex = index
        this.detail.model = detail
        this.detail.isEdit = true
        // 每次打开将图片变成最小
        this.detail.visible = true
      },
      closeEditDialog (state) {
        this.detail.visible = false
        let obj = this.entAuditDataList[this.editIndex]
        if (obj !== null && obj !== undefined) {
          if (parseInt(state) === 2) {
            this.entAuditDataList.splice(this.editIndex, 1)
          } else {
            this.entAuditDataList[this.editIndex].verifyState = state
          }
        }
      }
    },
    components: {
      EntSelect,
      EntAuditDetail
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
