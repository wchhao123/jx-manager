<template>
    <div>
      <el-form :inline="true" class="toolbar demo-form-inline" :model="queryModel">
        <el-row>
          <el-form-item label="角色名:">
            <el-input size="small" v-model="queryModel.roleName"></el-input>
          </el-form-item>

          <el-form-item label="状态:">
            <el-select size="small" v-model="queryModel.dataState" filterable clearable placeholder="请选择状态">
              <el-option
                v-for="item in _AdminRoleTypeResource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row type="flex" justify="left">
          <el-col :span="3">
            <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="_resetQuery">查询
            </el-button>
          </el-col>

          <el-col :span="3">
            <el-button size="small" type="danger"
                       v-show="this.$store.getters.getBtnIsShowByName('btn_role_add')"
                       icon="el-icon-edit" style="margin-bottom: 10px" @click="_addRole">新增角色
            </el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="dataList" style="width: 100%" border v-loading="isLoading">

        <!--企业Id-->
        <el-table-column prop="enterpriseId" align="center" label="角色名">
          <template slot-scope="scope">
            <span size="small">{{scope.row.roleName}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="enterpriseId" align="center" label="状态">
          <template slot-scope="scope">
            <span size="small">{{scope.row.dataState | filterAdminRoleType}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="enterpriseId" align="center" label="备注">
          <template slot-scope="scope">
            <span size="small">{{scope.row.remark}}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" align="center" >
          <template slot-scope="scope" >
            <el-button @click.native.prevent="_doUpdate(scope.row)"
                       v-show="isOwnUpdate"
                       v-if="scope.row.isEdit"
                       icon="el-icon-edit" circle
                       type="primary" size="mini">
            </el-button>
            <el-button icon="el-icon-delete" size="mini" type="danger" circle
                       v-show="isOwnDelete"
                       v-if="scope.row.isEdit"
                       @click="_doDelete(scope.row,scope.$index)">
            </el-button>
            <el-button icon="el-icon-search" size="mini" type="primary"   circle
                       v-show="isOwnUpdate"
                       v-if="!scope.row.isEdit"
                       @click.native.prevent="_doUpdate(scope.row)">
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
                 width="60%">
        <role-detail :detail="this.detail.model" :type="this.detail.type" @cancelEdit="_cancelEdit"></role-detail>
      </el-dialog>
    </div>
</template>

<script>
  import * as Api from 'api'
  import * as state from 'common/js/state-dic'
  import RoleDetail from './RoleDetail'
  import Vue from 'vue'
  export default {
    data () {
      return {
        isLoading: false,
        totalCount: 0,
        dataList: [],
        queryModel: {
          roleName: '',
          pageNum: 1,
          pageSize: 10
        },
        detail: {
          title: '',
          type: '',
          visiable: false
        }
      }
    },
    computed: {
      _AdminRoleTypeResource() {
        return state.funAdminRoleType()
      },
      isOwnUpdate() {
        return this.$store.getters.getBtnIsShowByName('btn_role_update')
      },
      isOwnDelete() {
        return this.$store.getters.getBtnIsShowByName('btn_role_delete')
      }
    },
    methods: {
      _resetQuery() {
        this.queryModel.pageNum = 1
        this._doQuery()
      },
      _doQuery() {
        Api.getAdminRoleInfo(this.queryModel).then(resp => {
          if (resp.data.code === Api.ERR_OK) {
            this.dataList = resp.data.data.list
            this.totalCount = resp.data.data.totalCount
            this.dataList.forEach((item, index, arr)=> {
              if(item.roleName == '超级管理员'){
                item.isEdit = false
                Vue.set(this.dataList, index, item)
              }else {
                item.isEdit = true
                Vue.set(this.dataList, index, item)
              }
            })
          }
        })
      },
      _addRole() {
        this.detail.title = '新增角色'
        this.detail.model = {}
        this.detail.type = 'add'
        this.detail.visiable = true
      },
      _doUpdate(row) {
        this.detail.title = '编辑角色'
        this.detail.type = 'update'
        this.detail.model = JSON.parse(JSON.stringify(row))
        this.detail.visiable = true
        console.log(row.isEdit)
        this.detail.model.isEdit = !row.isEdit
      },
      _doDelete(row, index) {
        this.$confirm(`确定要删除角色 < ${row.roleName} >?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.deleteAdminRole({
            roleId: row.roleId
          }).then(resp => {
            this.$message({
              type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
              message: resp.data.msg
            })
            if (resp.data.code === Api.ERR_OK) {
              this._resetQuery()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      _cancelEdit(type) {
        this.detail.visiable = false
        if (type && type === 'refresh') {
          this._doQuery()
        }
      },
      pageHandelCurrentChange (val) {
        this.queryModel.pageNum = val
        this._doQuery()
        console.log('pageHandelCurrentChange')
      },
      pageChange (val) {
        console.log('pageChange')
      }
    },
    components: {
      RoleDetail
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
