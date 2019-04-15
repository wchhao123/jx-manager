<template>
  <div>
    <el-row>
      <el-table :data="dataList" style="width: 250px" v-loading="isLoading">
        <el-table-column align="center" label="用户姓名" width="100px">
          <template slot-scope="scope">
            <span size="small">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号" width="160px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span size="small">{{scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合同名称" width="160px" :show-overflow-tooltip="true" v-if="this.isTask">
          <template slot-scope="scope">
            <span size="small">{{scope.row.contractName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="企业名称" width="160px" :show-overflow-tooltip="true"  v-if="this.isTask">
          <template slot-scope="scope">
            <span size="small">{{scope.row.entName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" >
          <template slot-scope="scope">
            <span size="small" v-if="scope.row.isRepeatSend==='0'">{{'可发送'}}</span>
            <span size="small" v-if="scope.row.isRepeatSend==='1'" style="color: red">{{'已给该用户发送合同,不可重复发送'}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 30px">
      <el-button style="width: 120px" size="small" @click="()=> {this.$emit('close')}">取 消</el-button>
      <el-button style="margin-left: 100px;width: 120px" size="small" type="primary" :disabled="isLoading"
                 @click="submitSend">确认发送
      </el-button>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import * as Api from 'api'
  import { http } from '../../../api/index'
  export default {
    props: {
      detail: {}
    },
    watch: {
      detail: {
        immediate: true,
        handler: function () {
          debugger
          console.log(this.detail)
          if (this.detail != '') {
          this.dataList = JSON.parse(this.detail)
          console.log(this.dataList)
          if(this.dataList[0].taskId != null&&this.dataList[0].taskId != ''){
            this.isTask = false
          }else
            this.isTask = true
          }
          console.log(this.isTask)
        }
      }
    },
    data() {
      return {
        isLoading: false,
        queryUrl: '/send_task_contract',
        dataList: [],
        contractSignDetails: [],
        details: '',
        isTask: true
      }
    },
      methods: {
        submitSend() {
          this.dataList.forEach((item, index, arr) => {
           if (item.isRepeatSend === '0') {
             this.contractSignDetails.push(item)
           }
          })
          if (this.contractSignDetails.length === 0) {
            this.$message.warning('所有用户均已发送合同，无需重复发送！')
            return
          }
          this.details = encodeURI(JSON.stringify(this.contractSignDetails))
          let token = sessionStorage.getItem('access_token')
          let config = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }
          if (token !== null && token.toString().length > 1) {
            config.headers['Authorization-manage'] = token
          }
          let formData = new FormData()
          formData.append('contractSignDetails', this.details)
          this.isLoading = true
          axios.post(http.prefix+ '/table/task/sendtaskcontract', formData, config).then(res => {
            this.$message({
              type: res.data.code === Api.ERR_OK ? 'success' : 'error',
              message: res.data.msg
            })
            this.isLoading = false
            this.$emit('close')
            console.log(res)
          }, err => {
            console.log(err)
            this.isLoading = false
            this.$message.warning('重新发送失败！')
            this.$emit('close')
          })
        }
      }
  }
</script>
