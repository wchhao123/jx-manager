<template>
  <div>
    <el-form :inline=true :model="queryModel" label-position="right" class="toolbar demo-form-inline" label-width="100px">
      <el-row typeof="flex" justify="space-between">
        <!-- 批次号-->
        <el-col :span="6">
        <el-form-item label="批次号">
          <el-input size="small" clearable v-model="queryModel.batchId" placeholder="请输入批次号"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="合同名称">
          <el-input size="small" clearable v-model="queryModel.contractName" placeholder="请输入合同名称"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="合同类型">
          <el-select size="small" v-model="queryModel.contractType" filterable clearable placeholder="请选择合同类型">
            <el-option
              v-for="(item, index) of this.$state.contractType"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="合同状态">
          <el-select size="small" v-model="queryModel.state" filterable clearable placeholder="请选择合同状态">
            <el-option
              v-for="(item, index) of this.$state.contractState"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
        <el-row typeof="flex" justify="space-between">
          <el-col :span="6" >
            <ent-select title="企业名称" place-holder="请输入企业名称"
                        @input-select="(index) => {index !== undefined ?  this.queryModel.entId = index: this.queryModel.entId = null}">
            </ent-select>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="签约主体">
              <el-select size="small" v-model="queryModel.cooperateEntName" filterable clearable placeholder="请输入签约主体名称">
                <el-option
                  v-for="(item, index) of this.$store.getters.cooperateEntName"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="签约发起时间">
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
            <el-col  style="position: absolute;left: 0px">
              <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
              </el-button>
            </el-col>
          </el-row>
    </el-form>

    <el-table ref="ContractListTable" :data="dataList" style="width: 100%" border v-loading="isLoading">
      <!--批次号-->
      <el-table-column align="center" label="批次号" fixed>
        <template slot-scope="scope">
          <span class="globalPointer" size="small" @click="getContractSignDetail(scope.row)">{{scope.row.batchId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同名称">
        <template slot-scope="scope"><!--contractUrl-->
          <span class="globalPointer" @click="getContractPage(scope.row)" size="small">{{scope.row.contractName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同类型">
        <template slot-scope="scope">
          <span size="small">{{scope.row.contractType | filterContractType()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合同份数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.sendCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已签约人数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signCount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="撤销合同份数">
        <template slot-scope="scope">
          <span size="small">{{scope.row.cancelCount}}</span>
        </template>
      </el-table-column>
      <!--发放总人数-->
      <el-table-column align="center" label="合同状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.state| filterContractState()}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="企业名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签约主体">
        <template slot-scope="scope">
          <span size="small">{{ scope.row.contractType === '2'? scope.row.cooperateEntName:'==' }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="合同到期日">
        <template slot-scope="scope">
          <span size="small">{{scope.row.abortDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>-->
<!--      <el-table-column align="center" label="签约截止日期">
        <template slot-scope="scope">
          <span size="small">{{scope.row.abortDate | filterDateYYYYMMDD()}}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="签约发起时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button  @click="toSalaryDetail(scope.row)"
                     type="primary" plain size="small">查看详情
          </el-button>
        </template>
      </el-table-column>-->
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
  </div>
</template>

<script type="text/ecmascript-6">
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
        dataList: []
      }
    },
    watch: {
      selectDate () {
        console.log('j监听')
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
      getContractPage (row) {
        if (row.contractUrl) {
          window.open(row.contractUrl)
        } else {
          this.$notify({
            title: '警告',
            message: '暂无合同信息！',
            type: 'warning'
          })
        }
      },
      getContractSignDetail (row) {
        this.$router.push({
          path: '/contract_sign',
          name: '合同签约管理',
          params: {batchId: row.batchId}
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
