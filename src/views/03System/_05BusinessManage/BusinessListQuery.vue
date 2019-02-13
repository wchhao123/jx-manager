<template>
  <div>
    <el-form :inline=true :model="queryModel" label-position="right" class="toolbar form-inline">
       <el-row>
         <el-form-item label="业务名称">
            <el-input size="small" v-model="queryModel.businessName" placeholder="请输入业务名称"></el-input>
         </el-form-item>
         <el-form-item label="默认状态">
           <el-select size="small" v-model="queryModel.defaultState" filterable clearable  placeholder="请选择默认状态">
             <el-option
               v-for="item in _BusinessDefaultStateResource"
               :key="item.key"
               :label="item.value"
               :value="item.key">
             </el-option>
           </el-select>
         </el-form-item>
       </el-row>
      <el-row>
        <el-col :span="2">
          <el-button size="small" type="write" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="doQuery">查询
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" type="danger"  style="margin-bottom: 10px" :disabled="isLoading" @click="doEdit">编辑
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="dataList" style="width: 100%" border v-loading="isLoading"  @selection-change="handleSelectionChange">
      <el-table-column type="selection"   width="55" >
      </el-table-column>
      <el-table-column   align="center" label="业务编号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.businessType}}</span>
        </template>
      </el-table-column>

      <el-table-column   align="center" label="业务名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.businessName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="默认状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.defaultState| filterBusinessDefaultState}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate| filterdateYMDHMS()}}</span>
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
    <el-dialog :title="detail.title" center width="50%"
               :close-on-click-modal="1==0"
               :visible.sync="detail.visiable"
               :before-close="_closeBusinessInfo">
      <business-info :detail="detail.businessInfo"  style="border-top:0px solid white"  @close="_closeBusinessInfo" ></business-info>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as state from 'common/js/state-dic'
  import BusinessInfo from './EditBusinessInfo'
  export default {
    data () {
      return {
        queryUrl: '/business_type',
        isLoading: false,
        totalCount: 0,
        dataList: [],
        detail: {
          title: '编辑业务',
          visiable: false
            },
        multipleSelection: [],
        queryModel: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    components: {
      BusinessInfo
    },
    computed: {
      _BusinessDefaultStateResource() {
        return state.funBusinessDefaultType()
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = []
        val.forEach((item, index, arr) => {
          if (item.businessType && item.defaultState) {
            this.multipleSelection.push(item)
          }
        })
      },
      doQuery() {
        this.isLoading = true
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          this.dataList = response.data.list
          this.totalCount = response.data.totalCount
          this.isLoading = false
        }, err => {
          this.isLoading = false
          console.log(err)
        })
      },
      doEdit() {
        if (!this.multipleSelection.length > 0) {
          this.$message.warning('您未选择业务！')
          return
        }
        this.detail.visiable = true
        this.detail.businessInfo = JSON.stringify(this.multipleSelection)
      },
      _closeBusinessInfo() {
        this.detail.visiable = false
        this.doQuery()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
