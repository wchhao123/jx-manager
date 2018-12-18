<template>
  <div>
    <el-form :inline=true :model="queryModel" label-position="right" class="toolbar form-inline">
      <el-row>
        <el-form-item label="企业名称">
          <el-input size="small" clearable v-model="queryModel.cooperateEntName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="法人代表姓名">
          <el-input size="small" clearable v-model="queryModel.legalPerson" placeholder="请输入法人代表姓名"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select size="small" v-model="queryModel.businessType" clearable placeholder="请选择业务类型">
            <el-option
              v-for="(item, index) of this.$state.signBusinessType"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
        <el-row>
          <el-form-item label="创建时间">
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
        </el-row>
      <el-row>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="danger"  style="margin-bottom: 10px" :disabled="isLoading" @click="addSignEnt">添加签约主企业
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="ContractListTable" :data="dataList" style="width: 100%" border v-loading="isLoading">
      <el-table-column align="center" label="编号" fixed>
        <template slot-scope="scope">
          <span class="globalPointer" size="small" @click="getEntInfo(scope.row)">{{scope.row.cooperateEntId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="企业名称">
        <template slot-scope="scope"><!--contractUrl-->
          <span size="small">{{scope.row.cooperateEntName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="法人代表姓名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.legalPerson}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="统一社会信用代码">
        <template slot-scope="scope">
          <span size="small">{{scope.row.comid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.businessType| filterSignBusinessType()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="企业印章">
        <template slot-scope="scope">
          <span size="small">{{scope.row.sealState | filterSealState()}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
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
    <el-dialog @close="closeDiaLog" :title="detail.title"  width="50%" :visible.sync="detail.visiable" :close-on-click-modal="false">
      <sign-ent @close="closeDiaLog" @doQuery="resetDoQuery" :is-edit="detail.isEdit" :detail="detail.entInfo" :is-submit="detail.isSubmit"></sign-ent>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import SignEnt from './SignEnt'
  export default {
    data () {
      return {
        queryUrl: '/sign_subject',
        isLoading: false,
        selectDate: '',
        totalCount: 0,
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        dataList: [],
        detail: {
          title: '',
          visiable: false,
          entInfo: {}
        }
      }
    },
    computed: {
      businessType() {
        let provinces = this.$store.getters.businessType
        console.log(provinces)
        return provinces
      }
      },
    components: {
      SignEnt
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
      getEntInfo(val) {
        let string = JSON.stringify(val)
        this.detail.entInfo = JSON.parse(string)
        this.detail.visiable = true
        this.detail.isEdit = false
        this.detail.isSubmit = false
        this.detail.title = '签约主体企业详情'
      },
      closeDiaLog() {
        this.detail.entInfo = {}
        this.detail.visiable = false
        this.detail.isEdit = true
      },
      addSignEnt() {
        this.detail.entInfo = {}
        this.detail.isSubmit = true
        this.detail.isEdit = true
        this.detail.visiable = true
        this.detail.title = '添加签约主体企业'
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
