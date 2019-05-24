<template>
  <div>

    <el-form :inline="true" class="toolbar demo-form-inline" :model="queryModel" v-if="queryModel">
      <el-row type="flex">
        <el-form-item label="姓名">
          <el-input size="small" placeholder="请输入用户名" v-model="queryModel.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input size="small" placeholder="请输入手机号" v-model="queryModel.mobile"></el-input>
        </el-form-item>
        <el-form-item label="激活状态">
          <el-select size="small" v-model="queryModel.isActive" filterable clearable placeholder="请选择激活状态">
            <el-option
              v-for="item in typeActiviStateResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件照片">
          <el-select size="small" v-model="queryModel.isUpload" filterable clearable placeholder="请选择上传状态">
            <el-option
              v-for="(item, index) of this.$state.uploadState"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="实名认证状态">
          <el-select size="small" v-model="queryModel.isVerify" filterable clearable placeholder="请选择实名认证状态">
            <el-option
              v-for="item in typeVerifyStateResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加时间">
          <el-date-picker
            v-model="selectDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
      </el-row>

      <el-row type="flex" justify="left">
        <el-col :span="2">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" :disabled="isLoading" type="danger" icon="el-icon-check" style="margin-bottom: 10px"
                     @click="_exportUserInfo"
                     v-show="this.$store.getters.getBtnIsShowByName('btn_user_export')">导出用户信息
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="small" :disabled="isLoading" type="danger" icon="el-icon-check" style="margin-bottom: 10px"
                     @click="doExportImageList"
                     v-show="this.$store.getters.getBtnIsShowByName('btn_user_export')">导出证件照片
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table ref="userInfoTable" :data="dataList" style="width: 100%" border v-loading="isLoading" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!--用户编号-->
      <el-table-column  align="center" label="用户编号" >
        <template slot-scope="scope">
          <span   size="small">{{scope.row.userId}}</span>
        </template>
      </el-table-column>

      <!--用户姓名-->
      <el-table-column  align="center" label="用户姓名" >
        <template slot-scope="scope">
          <span   size="small">{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <!--手机号-->
      <el-table-column   align="center" label="手机号" >
        <template slot-scope="scope">
          <span   size="small"    >{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="证件类型">
        <template slot-scope="scope" >
          <span>{{scope.row.idType | filterUserIdNumType}}</span>
        </template>
      </el-table-column>

      <!--身份证号-->
      <el-table-column  align="center" label="证件号" >
        <template slot-scope="scope">
          <span   size="small"    >{{scope.row.idNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="证件照片" >
        <template slot-scope="scope">
          <span   size="small"    >{{scope.row.isUpload | filterUserImageState}}</span>
        </template>
      </el-table-column>
      <!--激活状态-->
      <el-table-column width="100"  align="center" label="激活状态" >
        <template slot-scope="scope">
          <span   size="small"    >{{scope.row.isActive | filterUserActiveState}}</span>
        </template>
      </el-table-column>

      <!--实名认证状态-->
      <el-table-column  align="center" label="实名认证状态" >
        <template slot-scope="scope">
          <span   size="small"    >{{scope.row.isVerify | filterUserVerifyState}}</span>
        </template>
      </el-table-column>

      <!--添加时间-->
      <el-table-column   align="center" label="添加时间" >
        <template slot-scope="scope">
          <span   size="small"    >{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>

      <!--加入企业-->
      <el-table-column  align="center" label="加入企业" >
        <template slot-scope="scope">
          <span   class="globalPointer" size="small"
                  @click.stop="toJoinEnt(scope.$index, scope.row)">{{scope.row.count}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100"  align="center">
        <template slot-scope="scope" >
          <el-button type="danger" size="small" plain
                     v-show="isOwnEdit"
                     @click="editUser(scope.row,scope.$index)">编辑</el-button>

         <!-- <el-button  @click.native.prevent="sendAgain(scope.row)"
                      v-show="isOwnSms"
                      :disabled="scope.row.isActive === '1'"
                      type="primary" plain size="small">补发短信</el-button>-->
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

    <el-dialog title="加入企业" center width="40%" :visible.sync="joinEntModel.visible" >
      <join-ent-detail  :user-id="joinEntModel.userId"></join-ent-detail>
    </el-dialog>
    <el-dialog title="编辑用户" center width="40%" :visible.sync="editUserModel.visible" :close-on-click-modal="1===0">
      <edit-user-info  :detail="editUserModel.model"
                       @cancelEdit="_cancelEdit"></edit-user-info>
    </el-dialog>
  </div>
</template>

<script  type="text/ecmascript-6">
  import * as Api from 'api'
  import * as state from 'common/js/state-dic'
  import * as filters from 'filters'
  import JoinEntDetail from './JoinEntDetail'
  import EditUserInfo from './EditUserInfo'

  export default {
    data() {
      return {
        isLoading: false,
        selectDate: '',
        totalCount: 10,
        multipleSelection: [],
        queryModel: {
          pageNum: 1,
          pageSize: 10,
          key: 'userImage'
        },
        joinEntModel: {
          visible: false,
          userId: ''
        },
        editUserModel: {
          visible: false,
          model: ''
        },
        dataList: null,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    computed: {
      typeVerifyStateResource() {
        return state.funUserVerifyState()
      },
      typeActiviStateResource() {
        return state.funUserActiviState()
      },
      isOwnEdit() {
        return this.$store.getters.getBtnIsShowByName('btn_user_eidt_user')
      },
      isOwnSms() {
        return this.$store.getters.getBtnIsShowByName('btn_user_sms')
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = []
        val.forEach((item, index, arr) => {
          if (item.userId && item.isUpload) {
            this.multipleSelection.push(item)
          }
        })
      },
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery() {
        this.queryModel.userIds = ''
        if (this.selectDate !== null && this.selectDate) {
          this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
          this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        this.isLoading = true
        Api.getUserInfo(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === Api.ERR_OK) {
            this.dataList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
        })
      },
      doExportImageList () {
        let object = this.multipleSelection
        let userIds = []
        if (object.length > 0) {
          object.forEach((item, index, arr) => {
            userIds.push(item.userId)
          })
        }
        this.$confirm('确认需要导出用户证件照片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //contract_export
          this.isLoading = true
          this.queryModel.userIds = userIds.toString()
          if (this.selectDate !== null && this.selectDate) {
            this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
            this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
          } else {
            this.queryModel.startDate = null
            this.queryModel.endDate = null
          }
          this.$post(this.$url('/user_image'), this.queryModel).then(response => {
            this.$export(this.$url('/contract_export'), this.queryModel).then(response => {
              this.isLoading = false
              if (!response) {
                return
              }
              let objectUrl = URL.createObjectURL(new Blob([response]))
              let link = document.createElement('a')
              link.style.display = 'none'
              link.href = objectUrl
              link.setAttribute('download', '用户证件照片.zip')
              document.body.appendChild(link)
              link.click()
            }, err => {
              this.isLoading = false
              console.log(err)
            })
          }, err => {
            this.isLoading = false
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      _exportUserInfo() {
        this.$confirm('确认需要导出用户信息数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          let object = this.multipleSelection
          let userIds = []
          if (object.length > 0) {
            object.forEach((item, index, arr) => {
              userIds.push(item.userId)
            })
          }
          this.queryModel.userIds = userIds.toString()
          if (this.selectDate !== null && this.selectDate) {
            this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
            this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
          } else {
            this.queryModel.startDate = null
            this.queryModel.endDate = null
          }
          Api.exportUserInfo(this.queryModel).then(resp => {
            this.isLoading = false
            let data = resp.data
            if (!data) {
              return
            }
            let blob = new Blob([data], {type: 'application/vnd.ms-excel'})
            let objectUrl = URL.createObjectURL(blob)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = objectUrl
            link.setAttribute('download', '用户信息.xls')
            document.body.appendChild(link)
            link.click()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      toJoinEnt(index, row) {
        console.log('查看用户加入企业明细')
        if (row.count < 1) {
          return
        }
        let r = this.$store.getters.getBtnIsShowByName('btn_select_join_ent')
        if (!r) {
          console.log('你没有该权限 哈哈哈!')
          return
        }
        this.joinEntModel.userId = row.userId
        this.joinEntModel.visible = true
      },
      editUser(row, index) {
        console.log('编辑用户')
        this.editUserModel.model = row
        this.editUserModel.visible = true
      },
      _cancelEdit(val) {
        this.editUserModel.visible = false
        if (val.toString() === '1') {
          this.doQuery()
        }
      },
      sendAgain(row) {
        console.log(`补发短信 ${row}`)
        Api.sendAgain({
          mobile: row.mobile,
          userId: row.userId
        }).then(response => {
          this.$notify({
            message: response.data.msg,
            type: response.data.code === Api.ERR_OK ? 'success' : 'error'
          })
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
      }
    },
    components: {
      JoinEntDetail,
      EditUserInfo
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
