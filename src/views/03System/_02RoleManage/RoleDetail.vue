<template>
    <div>
        <el-form :inline="true" label-width="80px" :model="model" v-show="model" :rules="rules" ref="roleForm">
          <div class="left">
            <el-form-item label="角色名" size="small" prop="roleName">
              <el-input v-model="model.roleName"></el-input>
            </el-form-item>

            <el-form-item label="状态:" v-show="type === 'update'">
              <el-select size="small" v-model="model.dataState" filterable clearable placeholder="请选择状态">
                <el-option
                  v-for="item in _AdminRoleTypeResource"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="备注" size="small" prop="remark">
              <el-input type="textarea" :rows="2" v-model="model.remark"></el-input>
            </el-form-item>
            <el-row type="flex" justify="center">
              <el-button size="small" @click="_cancelEdit">取消</el-button>
              <el-button size="small" type="primary" v-if="type === 'add'" @click="_addAdminRole">创建</el-button>
              <el-button size="small" type="primary" v-else @click="_updateAdminRole">更新</el-button>
            </el-row>
          </div>
          <div class="right" v-loading="isLoading">
            <el-tree
              ref="roleTree"
              :data="menuList"
              show-checkbox
              node-key="id"
              default-expand-all
              :props="defaultProps"
            >
            </el-tree>
          </div>
          <div style="clear: both;"></div>
        </el-form>
      </div>
</template>

<script>
  import * as Api from 'api'
  import * as state from 'common/js/state-dic'
  import * as Utils from 'common/js/util'
  export default {
    props: {
      detail: {
        roleName: '',
        menuIds: []
      },
      type: ''
    },
    data () {
      var validatorRemark = (rule, value, callback) => {
        if (value && value.length > 100) {
          return callback(new Error('长度不能超过100个字符'))
        }
        setTimeout(() => {
          callback()
        }, 100)
      }
      return {
        isLoading: false,
        menuList: [],
        roleDetail: [],
        model: {},
        labelPosition: 'right',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {
          roleName: {required: true, message: '请输入角色名称', trigger: 'blur'},
          remark: {validator: validatorRemark, trigger: 'blur'}
        }
      }
    },
    computed: {
      _AdminRoleTypeResource() {
        return state.funAdminRoleType()
      }
    },
    watch: {
      'detail': {
        immediate: true,
        handler: function (val) {
          this.detail = val
          this._setModel()
        }
      }
    },
    methods: {
      doQuery() {
        this.isLoading = true
        Api.getAdminMenuList({}).then(response => {
          this.isLoading = false
          if (response.data.code === Api.ERR_OK) {
            this.menuList = JSON.parse(JSON.stringify(response.data.data))
            console.log(this.menuList)
            console.log(this.data5)
          }
        })
      },
      _getRoleDetail() {
        Api.getAdminRoleInfo({
          roleId: this.model.roleId
        }).then(resp => {
          if (resp.data.code === Api.ERR_OK) {
            if (resp.data.data.list.length > 0) {
              let checkNodes = resp.data.data.list[0].authNames
              this.$refs.roleTree.setCheckedNodes(checkNodes)
            }
          }
        })
      },
      _setModel() {
        setTimeout(() => {
          this.$refs.roleTree.setCheckedKeys([])
          this.doQuery()
          if (this.type === 'add') {
            this.model = {}
          } else {
            this.model = this.detail
            // 查询角色原有的权限
            setTimeout(() => {
              this._getRoleDetail()
            }, 100)
          }
        }, 20)
      },
      _cancelEdit() {
        this.$emit('cancelEdit')
      },
      _addAdminRole() {
        this.$refs.roleForm.validate((valid) => {
          let menuIDs = this.$refs.roleTree.getCheckedKeys()
          if (menuIDs.length < 1) {
            this.$message('请勾选权限')
            return
          }
          let menuIds = ''
          menuIDs.forEach((item) => {
            menuIds = menuIds + parseInt(item) + ','
          })
          if (valid) {
            Api.addAdminRole({
              menuIds: menuIds.substring(0, menuIds.length - 1),
              remark: this.model.remark,
              roleName: this.model.roleName
            }).then(resp => {
              this.$message({
                type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
                message: resp.data.msg
              })
              if (resp.data.code === Api.ERR_OK) {
                this.$emit('cancelEdit', 'refresh')
              }
            })
          }
        })
      },
      _updateAdminRole() {
        let menuIDs = this.$refs.roleTree.getCheckedKeys()
        Api.updateAdminRole({
          roleId: this.model.roleId,
          remark: this.model.remark,
          roleName: this.model.roleName,
          dataState: this.model.dataState,
          menuIds: Utils.utilStringArray2NumString(menuIDs)
        }).then((resp) => {
          this.$message({
            type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
            message: resp.data.msg
          })
          if (resp.data.code === Api.ERR_OK) {
            this.$emit('cancelEdit', 'refresh')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .left, .right
    height 100%
    width 49%
    float left
  .right
    width 50%
    float right

</style>
