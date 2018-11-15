<template>
  <div class="customDialog">
    <el-form ref="changePwdForm"  class="toobar" :inline="true" :rules="rules" :model="pwd"
             label-position="left">
      <el-row>
        <el-form-item label="账 号">
          <span>{{mobile}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="原 密 码" prop="pwdOld">
          <el-input size="small" placeholder="请填写旧密码" v-model="pwd.pwdOld"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="新 密 码" prop="pwd">
          <el-input size="small" placeholder="请输入新的密码" v-model="pwd.pwd"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="确认密码" prop="pwdAgain">
          <el-input size="small" placeholder="请再次输入新密码" v-model="pwd.pwdAgain"></el-input>
        </el-form-item>
      </el-row>
      <el-row  style="padding-top: 10px">
        <el-col :span="12" :offset="2">
          <el-button class="role_off" size="small" @click="cancelEdit">取消</el-button>
        </el-col>
        <el-col :span="2" :offset="4">
          <el-button type="primary" size="small" @click.native="editSubmit">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import * as Api from 'api'
  export default {
    data () {
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

      var validatePwdOld = (rule, value, callback) => {
        value = this.pwd.pwdOld
        if (!value) {
          return callback(new Error('原密码不能为空'))
        } else {
          setTimeout(() => {
            if (reg.test(value) === false) {
              callback(new Error('密码输入不合法'))
            } else {
              callback()
            }
          }, 200)
        }
      }
      var validatePwd = (rule, value, callback) => {
        value = this.pwd.pwd
        if (!value) {
          return callback(new Error('密码不能为空'))
        } else {
          setTimeout(() => {
            if (reg.test(value) === false) {
              callback(new Error('密码输入不合法'))
            } else {
              callback()
            }
          }, 200)
        }
      }
      var validatePwdAgain = (rule, value, callback) => {
        value = this.pwd.pwdAgain
        if (!value) {
          return callback(new Error('确认密码不能为空'))
        } else {
          if (value !== this.pwd.pwd) {
            callback(new Error('密码输入不一致'))
          } else {
            callback()
          }
        }
      }
      return {
        isLoading: false,
        pwd: {
          pwdOld: '',
          pwd: '',
          pwdAgain: ''
        },
        rules: {
          pwdOld: [
            {required: true, validator: validatePwdOld, trigger: 'blur'}
          ],
          pwd: [
            {required: true, validator: validatePwd, trigger: 'blur'}
          ],
          pwdAgain: [
            {required: true, validator: validatePwdAgain, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      mobile() {
        return this.$store.getters.user.mobile
      }
    },
    methods: {
    cancelEdit () {
      console.log('取消编辑')
      this.$refs['changePwdForm'].resetFields()
      this.isLoading = false
      this.$emit('cancelEdit')
    },
    editSubmit () {
      this.$refs['changePwdForm'].validate((valid) => {
        if (valid) {
          Api.changeAdminPassword({
            mobile: this.mobile,
            pwdOld: md5(this.pwd.pwdOld),
            pwd: md5(this.pwd.pwd),
            pwdAgain: md5(this.pwd.pwdAgain)
          }).then(response => {
            this.$message({
              type: response.data.code === Api.ERR_OK ? 'success': 'error',
              message: response.data.msg
            })
            if (response.data.code === Api.ERR_OK) {
              setTimeout(() => {
                this.$store.dispatch('logout')
              }, 200)
            }
          })
        }
      })
    }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .customDialog
    .item-title {
      font-size 16
      font-weight bold
      color black
      display block
      padding 10px 0
      border-bottom 1px dashed gray
      margin-bottom 5px
    }
    .el-form-item
      height: 20px
      margin-bottom 10px
  .el-col
    span
      font-size 14px
</style>
