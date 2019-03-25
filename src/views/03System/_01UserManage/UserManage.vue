<template>
  <div>
    <el-form :inline="true" class="toolbar demo-form-inline" :model="queryModel">
      <el-row>
        <el-form-item label="手机号:">
          <el-input size="small" v-model="queryModel.mobile"></el-input>
        </el-form-item>

        <el-form-item label="姓名:">
          <el-input size="small" v-model="queryModel.adminName"></el-input>
        </el-form-item>

        <el-form-item label="角色名:">
          <el-select size="small" v-model="queryModel.roleId" filterable v-show="roleSelectList.length > 0" clearable
                     placeholder="请选择角色">
            <el-option
              v-for="item in roleSelectList"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row type="flex" justify="left">
        <el-col :span="3">
          <el-button size="small" type="primary"
                     icon="el-icon-search"
                     style="margin-bottom: 10px" :disabled="isLoading" @click="_resetQuery">查询
          </el-button>
        </el-col>

        <el-col :span="3">
          <el-button size="small" type="danger"
                     v-show="this.$store.getters.getBtnIsShowByName('btn_sys_admin_add')"
                     icon="el-icon-edit" style="margin-bottom: 10px" @click="_addAdminUser">新增用户
          </el-button>
        </el-col>

        <el-col :span="3">
          <el-button size="small" @click="_refreshCache" type="danger">刷新企业端菜单缓存</el-button>
        </el-col>

        <el-col :span="3" style="margin-left: 20px">
          <el-button size="small" @click="_refreshMsCache" type="danger">刷新微服务配置信息</el-button>
        </el-col>
      </el-row>

    </el-form>
    <el-table :data="dataList" style="width: 100%" border v-loading="isLoading">

      <!--企业Id-->
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.adminName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.roleNames}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="在职状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.isCancel | filterAdminJobStateType}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="_doUpdate(scope.row)" icon="el-icon-edit"
                     v-show="isOwnEdit"
                     type="primary" size="mini">
          </el-button>
          <el-button size="mini" type="danger"
                     v-show="isOwnUpdatePwd"
                     @click="_resetPwd(scope.row,scope.$index)">pwd
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
    <el-dialog :title="detail.title" center :close-on-click-modal="1===0"
               :visible.sync="detail.visiable"
               width="50%">
      <user-detail :detail="this.detail.model" :type="this.detail.type" @cancelEdit="_cancelEdit"></user-detail>
    </el-dialog>

    <el-dialog title="重置密码" center :visible.sync="pwd.visiable" :close-on-click-modal="1===0" width="35%">
      <reset-pwd :detail="pwd.detail" @cancelEdit="_cancelEdit"></reset-pwd>
    </el-dialog>
  </div>
</template>

<script>
  import * as Api from 'api'
  import UserDetail from './UserDetail'
  import ResetPwd from './ResetPwd'
  import * as Utils from 'common/js/util'

  export default {
    data() {
      return {
        isLoading: false,
        totalCount: 0,
        queryModel: {
          pageNum: 1,
          pageSize: 10
        },
        roleSelectList: [],
        dataList: [],
        detail: {
          visiable: false,
          model: {},
          title: '',
          type: ''
        },
        pwd: {
          visiable: false,
          detail: ''
        }
      }
    },
    computed: {
      isOwnEdit() {
        return this.$store.getters.getBtnIsShowByName('btn_sys_admin_update')
      },
      isOwnUpdatePwd() {
        return this.$store.getters.getBtnIsShowByName('btn_sys_admin_pwd_update')
      }
    },
    created() {
      this._getRoleSelectList()
    },
    methods: {
      _resetQuery() {
        this.queryModel.pageNum = 1
        this._doQuery()
      },
      _doQuery() {
        this.isLoading = true
        Api.getAdminInfo(this.queryModel).then(resp => {
          this.isLoading = false
          if (resp.data.code === Api.ERR_OK) {
            this.dataList = resp.data.data.list
            this.totalCount = resp.data.data.totalCount
          }
        })
      },
      _getRoleSelectList() {
        Api.getAdminRoleSelectList().then(resp => {
          if (resp.data.code === Api.ERR_OK) {
            this.roleSelectList = Utils.utilList2SelectResource(resp.data.data)
          }
        })
      },
      _doUpdate(row) {
        this.detail.title = '编辑管理员信息'
        this.detail.model = JSON.parse(JSON.stringify(row))
        this.detail.type = 'update'
        this.detail.visiable = true
        if(this.$store.state.user.user.roleName == '超级管理员' ){
           this.detail.model.isSuper = false
        }
        else
          this.detail.model.isSuper = true
      },
      _addAdminUser() {
        this.detail.title = '新增管理员信息'
        this.detail.model = {}
        this.detail.type = 'add'
        this.detail.visiable = true
        console.log(this.$store.state.user.user)
        if(this.$store.state.user.user.roleName == '超级管理员' ){
          this.detail.model.isSuper = false
        }
        else
          this.detail.model.isSuper = true
      },
      _refreshCache() {
        Api.refreshEntMenuCache().then(resp => {
          this.$message({
            type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
            message: resp.data.msg
          })
        })
      },
      _refreshMsCache() {
        Api.refreshMsCache().then(resp => {
          this.$message({
            type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
            message: resp.data.msg
          })
        })
      },
      _cancelEdit(val) {
        this.detail.visiable = false
        this.pwd.visiable = false
        if (val === 'refresh') {
          this._resetQuery()
        }
      },
      _resetPwd(row, index) {
        this.pwd.visiable = true
        this.pwd.detail = JSON.parse(JSON.stringify(row))
      },
      pageHandelCurrentChange(val) {
        this.queryModel.pageNum = val
        this._doQuery()
        console.log('pageHandelCurrentChange')
      },
      pageChange(val) {
        console.log('pageChange')
      }
    },
    components: {
      UserDetail,
      ResetPwd
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
