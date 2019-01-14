<template>
  <div>
    <el-row>
      <el-form  :inline=true ref="verifyForm" :rules="rules" :model="queryModel" class="toolbar form-inline">
      <el-table :data="dataList" style="width: 100%" v-loading="isLoading"
                >
        <el-table-column align="center" label="企业编号" width="120px">
          <template slot-scope="scope">
            <span size="small">{{scope.row.entId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="企业名称" width="250px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span size="small">{{scope.row.entName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="销售代表" width="200px">
          <template slot-scope="scope">
              <el-form-item :prop="scope.row.error" :rules='rules.sale'>
                <el-select size="small" @input="getSalesList" v-model="this.dataList[scope.$index].saleId" @change="setEntSale(scope.row, scope.$index)" clearable placeholder="请选择销售代表">
                  <el-option
                    v-for="(item, index) of $store.getters.salesList"
                    :key="index"
                    :label="item"
                    :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
          </template>
        </el-table-column>
 <!--       <el-table-column width="10px">
          <template slot-scope="scope">
            <span style="color: red">{{scope.row.error}}</span>
          </template>
        </el-table-column>-->
      </el-table>
      </el-form>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 30px">
      <el-button style="width: 120px" size="small" @click="()=> {this.$emit('close')}">取 消</el-button>
      <el-button style="margin-left: 100px;width: 120px" size="small" type="primary" :disabled="isLoading"
                 @click="submitSalesAndVerify">确 认
      </el-button>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      detail: {}
    },
    data() {
      return {
        queryUrl: '/',
        isLoading: false,
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        dataList: [],
        rules: {
          sale: [
            {required: true, message: '请选择销售代表', trigger: 'change'}
          ]}
      }
    },
    watch: {
      detail: {
        immediate: true,
        handler: function () {
          this.dataList = this.detail
        }
      }
    },
    methods: {
      setEntSale(val, index) {

      },
      submitSalesAndVerify() {

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
      getSalesList({commit}, saleName) {
        post(url('/sales_list'), {saleName: saleName}).then(res => {
          let array = {}
          res.data.forEach((item, index, arr) => {
            array[item.sales_id] = item.sales_name
          })
          commit(vuexTypes.SALES_LIST, {salesList: array})
        })
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  /deep/ .el-table th {
    height: 10px !important;
    background: #89bebf !important;
    color: black !important;
  }

  /deep/ .el-table td {
    border-bottom: hidden;
    padding: 3px 0px;
  }

  /deep/ .el-row {
    margin-bottom 0px
  }

  /deep/ .el-checkbox__inner {
    border-color #99a9bf
  }
</style>
