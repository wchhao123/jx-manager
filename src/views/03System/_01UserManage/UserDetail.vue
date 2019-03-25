<template>
  <div class="customDialog">
    <el-form ref="adminForm" :model="model" :inline="true" :rules="type.toString()==='add'? rulesAdd: rulesUpdate" v-show="model" label-width="80px">
      <span class="item-title">基本信息</span>
        <el-row>
        <el-form-item size="small" label="用户姓名" prop="adminName">
          <el-input v-model="model.adminName"></el-input>
        </el-form-item>
        </el-row>

        <el-row v-show="type.toString() === 'add'">
        <el-form-item size="small" label="密码" prop="passWord">
          <el-input v-model="model.passWord" type="password"></el-input>
        </el-form-item>
        </el-row>

        <el-row v-show="type.toString() === 'add'">
        <el-form-item size="small" label="确认密码" prop="pwdAgain" >
          <el-input v-model="model.pwdAgain" type="password"></el-input>
        </el-form-item>
        </el-row>

        <el-row>
        <el-form-item size="small" label="邮箱账号">
          <el-input v-model="model.email"></el-input>
        </el-form-item>
        </el-row>

        <el-row>
        <el-form-item size="small" label="手机号码" prop="mobile">
          <el-input v-model="model.mobile" maxlength="11"></el-input>
        </el-form-item>
        </el-row>

        <el-row>
        <el-form-item size="small" label="在职状态">
          <el-select size="small" v-model="model.isCancel">
            <el-option
              v-for="item in _AdminJobStateResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        </el-row>
      <el-row>
        <el-form-item size="small" label="数据权限"  prop="isOpen">
          <el-select size="small" v-model="model.isOpen" :disabled="this.model.isSuper"  >
            <el-option
              v-for="item in _filterDataAdminStatus"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <span class="item-title">角色关联</span>
      <el-row v-loading="isLoading">
        <el-transfer
          :titles="['Source', 'Target']"
          :props="{
          key: 'roleId',
          label: 'roleName'
        }"
          v-model="queryRoles"
          :data="roleList"
        >
        </el-transfer>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-button size="small" @click="_cancelEdit">取消</el-button>
        <el-button type="primary" size="small" v-if="type.toString() === 'add'" @click="_addAdmin">创建</el-button>
        <el-button type="primary" size="small" v-else @click="_updateAdmin">更新</el-button>
      </el-row>
      </el-form>
    </div>
</template>

<script>
  import * as Api from 'api'
  import * as Utils from 'common/js/util'
  import * as state from 'common/js/state-dic'
  import * as Validator from 'common/js/validator'
  import md5 from 'js-md5'

  export default {
    props: {
      type: '',
      detail: {}
    },
    data () {
      var validatorPwdAgaing = (rule, value, callback) => {
        if (value !== this.model.passWord) {
          return callback(new Error('两次密码输入不一致'))
        }
        setTimeout(() => {
          callback()
        }, 100)
      }
      return {
        isLoading: false,
        model: {},
        roleList: [],
        queryRoles: [],
        rulesAdd: {
          'adminName': [{ required: true, message: '请输入管理员名称', trigger: 'blur' },
            {validator: Validator.validatorName, trigger: 'blur'}],
          'passWord': [{ required: true, message: '请输入密码', trigger: 'blur' },
            {required: true, validator: Validator.validatorPwd, trigger: 'blur'}],
          'pwdAgain': [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            {required: true, validator: Validator.validatorPwd, trigger: 'blur'},
            {validator: validatorPwdAgaing, trigger: 'blur'}
          ],
          'mobile': [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {validator: Validator.validatorMobile, trigger: 'blur'}],
          'isOpen': [
            { required: true, message: '请选择数据权限状态', trigger: 'blur' }]
        },
        rulesUpdate: {
          'adminName': {required: true, validator: Validator.validatorName, trigger: 'blur'},
          'mobile': {required: true, validator: Validator.validatorMobile, trigger: 'blur'}
        }
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
    computed: {
      _AdminJobStateResource() {
        return state.funAdminJobStateType()
      },
      _filterDataAdminStatus() {
        return state.dataAdminStatus()
      }
    },
    methods: {
      _getRoleList() {
        this.isLoading = true
        Api.getAdminRoleInfo({}).then(resp => {
          this.isLoading = false
          console.log(this.roleList )
          if (resp.data.code === Api.ERR_OK) {
            this.roleList = resp.data.data.list
          }
          for (var i = 0; i <= this.roleList.length; ++i) {
            if(this.roleList[i].dataState == '0'){
              this.roleList.splice(i,1)
            }
            if (this.model.isSuper == true&& this.roleList[i].roleName == '超级管理员') {
              this.roleList.splice(i,1)
            }
          }
        })
      },
      _addAdmin() {
        debugger
        console.log(this.$store.state.user)
        this.$refs.adminForm.validate((valid) => {
          let roleIds = Utils.utilStringArray2NumString(this.queryRoles)
          if (!roleIds) {
            console.log(this.$store.state.user.user.isOpen)
            this.$message.error('请分配角色')
            return
          }
          console.log(this.model.isSuper)
          if (this.model.isSuper == true) {
            //非超级管理员
            this.queryRoles.forEach((item, index, arr) => {
              this.roleList.forEach((it, index, arr) => {
                if (item == it.roleId && it.roleName == '超级管理员') {
                  this.$message.error('角色不可关联到超级管理员')
                  throw new Error("error");
                }
              })
            })
          }
            console.log(valid)
            if (valid) {
              Api.addAdminInfo({
                adminName: this.model.adminName,
                passWord: md5(this.model.passWord),
                isCancel: this.model.isCancel,
                email: this.model.email,
                mobile: this.model.mobile,
                isOpen: this.model.isOpen,
                roleIds: roleIds
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
      _updateAdmin() {
        this.$refs.adminForm.validate((valid) => {
          let roleIds = Utils.utilStringArray2NumString(this.queryRoles)
          if (!roleIds) {
            this.$message.error('请分配角色')
            return
          }
          if(this.model.isSuper ==true ){
            //非超级管理员
            this.queryRoles.forEach((item,index,arr)=> {
              this.roleList.forEach((it, index, arr) => {
                if (item == it.roleId && it.roleName == '超级管理员') {
                  this.$message.error('角色不可关联到超级管理员')
                  throw new Error("error");
                }
              })
            })
         }
          if (valid) {
            this.model.roleIds = roleIds
            this.model.rolesDTOS = []
            Api.updateAdminInfo(this.model).then((resp) => {
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
      _cancelEdit() {
        this.$emit('cancelEdit')
      },
      _setModel() {
        debugger
        var thiss = this
        thiss.queryRoles = []
        this._getRoleList()
        setTimeout(() => {
          if (this.type === 'add') {
            thiss.model = {isCancel: '0'}
            thiss.$refs.adminForm.resetFields()
           if(this.detail.isSuper ==true) {
             thiss.model.isOpen = '0'
             thiss.model.isSuper = true
           }
            console.log(thiss.model)
            return
          }
          thiss.model = this.detail
          console.log(this.model)
          let list = this.model['rolesDTOS']
          if (list) {
            for (let i = 0; i < list.length; i++) {
             thiss.queryRoles.push(list[i]['roleId'])
            }
          }
          thiss.$refs.adminForm.resetFields()
        }, 50)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .customDialog
    .item-title {
      width 100%
      font-size 16
      font-weight bold
      color black
      display block
      padding 10px 0
      border-top 1px dashed gray
    }
    .el-form-item {
      margin-left 50px
      width: 100%;
      height: 20px
      margin-bottom 10px
    }

    .el-form-item__label {
      width: 30%;
    }
    .el-row
      span
        font-size px
  .label
    margin-left 50px
</style>
