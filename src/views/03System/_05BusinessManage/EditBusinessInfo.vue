<template>
  <div>
    <el-row>
      <el-table :data="dataList" style="width: 250px" v-loading="isLoading">
        <el-table-column align="center" label="业务编号" width="120px">
          <template slot-scope="scope">
            <span size="small">{{scope.row.businessType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="业务名称" width="180px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span size="small">{{scope.row.businessName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="默认状态" >
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.defaultState" filterable clearable  placeholder="请选择默认状态">
              <el-option
                v-for="item in _BusinessDefaultStateResource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 30px">
      <el-button style="width: 120px" size="small" @click="()=> {this.$emit('close')}">取 消</el-button>
      <el-button style="margin-left: 100px;width: 120px" size="small" type="primary" :disabled="isLoading"
                 @click="submitUpdateBussinessInfo">确认修改
      </el-button>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as state from 'common/js/state-dic'
  import axios from 'axios'
  import * as Api from 'api'
  export default {
    props: {
      detail: {}
    },
    computed: {
      _BusinessDefaultStateResource() {
        return state.funBusinessDefaultType()
      }
    },
    watch: {
      detail: {
        immediate: true,
        handler: function () {
          this.dataList = JSON.parse(this.detail)
          console.log(this.dataList)
        }
      }
    },
    data() {
      return {
        queryUrl: '/update_business',
        isLoading: false,
        dataList: [],
        queryModel: {
          dataList: ''
        }
      }
    },
    methods: {
      submitUpdateBussinessInfo() {
        let array = []
        this.dataList.forEach((item, index, arr) => {
          if (item.defaultState) {
            array.push({
              businessType: item.businessType,
              defaultState: item.defaultState
            })
          } else {
            index = Number(index) + 1
            this.$message.warning('第' + index + '条数据请选择默认状态')
          }
        })
        this.queryModel.dataList = encodeURI(JSON.stringify(array))
        this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
          this.$message({
            type: response.code === Api.ERR_OK ? 'success' : 'error',
            message: response.msg
          })
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" >
  /deep/ .el-table th {
    height: 10px !important;
    /*background: #89bebf !important;
    color: black !important;*/
  }

  /deep/ .el-table td {
    border-bottom: 1px solid white
    padding: 3px 0px;
  }

  /deep/ .el-row {
    margin-bottom 0px
  }
  .el-form-item__label{
    min-width:160px;
    text-align:center;
  }

</style>
