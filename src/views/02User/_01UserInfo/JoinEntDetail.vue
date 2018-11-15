<template>
    <div class="toolbar demo-form-inline">
      <el-table :data="list" v-if="list.length" style="width: 100%">
        <!--加入企业-->
        <el-table-column align="center" label="加入企业">
          <template slot-scope="scope">
            <span size="small">{{scope.row.entName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="运营主企业">
          <template slot-scope="scope">
            <span size="small">{{scope.row.operationEntName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="加入状态">
          <template slot-scope="scope">
            <span size="small">{{scope.row.isJoin.toString() === '1' ? '已加入' : '待加入'}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import * as Api from 'api'
  export default {
    props: {
      userId: [String]
    },
    data() {
      return {
        list: ''
      }
    },
    created() {
      this.doQuery()
    },
    watch: {
      userId(val) {
        if (val !== undefined && val !== '' && val.toString().length > 0) {
          this.doQuery()
        } else {
          this.list = []
        }
      }
    },
    methods: {
      doQuery() {
        console.log(`查询加入企业详情 userId ${this.userId}`)
        Api.getUserJoinEnt({'userId': this.userId}).then(response => {
          if (response.data.code === Api.ERR_OK) {
            this.list = response.data.data
            console.log(this.list)
          } else {
            this.list = []
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
