<template>
  <div>
    <el-row>
<!--      <el-form style="width: 100%" ref="verifyForm" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' }
    ]">-->
        <el-table :data="dataList" style="width: 100%" v-loading="isLoading"
        >
          <el-table-column align="center" label="企业编号" width="120px">
            <template slot-scope="scope">
              <span size="small">{{scope.row.entId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="企业名称" width="270px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span size="small">{{scope.row.entName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="销售代表">
            <template slot-scope="scope">
<!--
              <el-form-item :prop="salesIds[scope.$index]">
-->
                <el-autocomplete
                  popper-class="my-autocomplete"
                  v-model="salesIds[scope.$index]"
                  :fetch-suggestions="querySearch"
                  placeholder="请选择销售代表"
                  @click="setEntSale"
                  @select="setEntSale"
                >
                  <i class="el-icon-edit el-input__icon"
                     slot="suffix"
                     @click="setEntSale">
                  </i>
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.value }}</div>
                    <span class="addr">{{ item.saleId }}</span>
                  </template>
                </el-autocomplete>
<!--
              </el-form-item>
-->
            </template>
          </el-table-column>
          <!--       <el-table-column width="10px">
                   <template slot-scope="scope">
                     <span style="color: red">{{scope.row.error}}</span>
                   </template>
                 </el-table-column>-->
        </el-table>
  <!--    </el-form>-->
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
        restaurants: [],
        state3: '',
        salesIds: [],
        salesList: [],
        params: [],
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        dataList: [],
        rules: {
          sale: [
            {required: true, message: '请选择销售代表', trigger: 'change'}
          ]
        }
      }
    },
    watch: {
      detail: {
        immediate: true,
        handler: function () {
          this.salesIds = []
          this.dataList = JSON.parse(this.detail)
        }
      }
    },
    methods: {
      querySearch(queryString, cb) {
        if (!queryString) queryString = '张'
        this.$post(this.$url('/sales_list'), {saleName: queryString}).then(res => {
          let array = []
          let list = {}
          res.data.forEach((item, index, arr) => {
            //array[item.sales_id] = item.sales_name
            //array[item.sales_name] = item.sales_id
            list[item.sales_id] = item.sales_name
            array.push({
              saleId: item.sales_id,
              value: item.sales_name
            })
          })
          this.params = list
          cb(array)
        })
      },
      setEntSale(item) {
        let saleName = this.params[item.saleId]
        for (let index in this.salesIds) {
          let saleName1 = this.salesIds[index]
          if (saleName1 === saleName) {
            this.dataList[index].saleName = saleName
            this.dataList[index].saleId = item.saleId
          }
        }
        console.log(item)
      },
      submitSalesAndVerify() {
        this.dataList.forEach((item, index, arr) => {
          //array[item.sales_id] = item.sales_name
          //array[item.sales_name] = item.sales_id
          let array = []
          array.push({
            saleId: item.sales_id,
            value: item.sales_name
          })
        })
        this.$confirm('是否同意所选企业的签约申请?', '提示', {
          confirmButtonText: '同意',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let array = []
          for (let index in this.dataList) {
            let item = this.dataList[index]
            let saleName = this.salesIds[index]
            if (item.entId && item.saleId && item.saleName) {
              if (saleName !== item.saleName) {
                index = Number(index) + 1
                this.$message.warning('第' + index + '条数据请点选列表内容')
                return
              }
              array.push({
                entId: item.entId,
                saleId: item.saleId,
                saleName: item.saleName
              })
            } else {
              index = Number(index) + 1
              this.$message.warning('第' + index + '条数据销售代表有误，请重新填选')
              return
            }
          }
          let config = {
            headers: {'data': encodeURI(JSON.stringify(array))}
          }
          let formData = new FormData()
          formData.append('saleReparentDTOS', encodeURI(JSON.stringify(array)))
          console.log(this.$url('/ent_sign'))
          /*axios.post('http://jxtest.99payroll.cn/jx-manage/ent/sign/tosign', formData, config)*/
          this.$json(this.$url('/ent_sign'), {}, config.headers).then(response => {
            console.log('ok')
            this.$message.success('审核成功！')
            this.$emit('close')
            this.isLoading = false
          }, err => {
            this.isLoading = false
            this.$message.error(err)
            console.log(err)
          })
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
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  /deep/ .el-table th {
    height: 10px !important;
    /*background: #89bebf !important;
    color: black !important;*/
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
