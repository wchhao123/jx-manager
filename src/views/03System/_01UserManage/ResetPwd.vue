<template>
    <div class="customDialog">
      <el-form ref="adminPwdForm" :model="queryModel" :inline="true" :rules="rules" v-show="model" label-width="80px">

        <el-row>
          <el-form-item size="small" label="用户名:">
            {{model.adminName}}
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item size="small" label="密码:" prop="pwd">
            <el-input v-model="queryModel.pwd" type="password"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item size="small" label="密码确认" prop="pwdAgain">
            <el-input v-model="queryModel.pwdAgain" type="password"></el-input>
          </el-form-item>
        </el-row>

        <el-row type="flex" justify="space-around">
          <el-button size="small" @click="_cancelEdit">取消</el-button>
          <el-button type="primary" size="small" @click="_resetPwd">确定</el-button>
        </el-row>
      </el-form>
    </div>
</template>

<script>
  import * as Validator from 'common/js/validator'
  import * as Api from 'api'
  import md5 from 'js-md5'

  export default {
    props: {
      detail: {}
    },
    data () {
      var validatorPwdAgaing = (rule, value, callback) => {
        if (this.queryModel.pwd !== this.queryModel.pwdAgain) {
          return callback(new Error('两次密码输入不一致'))
        }
        setTimeout(() => {
          callback()
        }, 100)
      }
      return {
        model: {},
        queryModel: {},
        rules: {
          'pwd': [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {validator: Validator.validatorPwd, trigger: 'blur'}],
          'pwdAgain': [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            {validator: Validator.validatorPwd, trigger: 'blur'},
            {validator: validatorPwdAgaing, trigger: 'blur'}]
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
    methods: {
      _setModel() {
        debugger
        let thiss = this
        thiss.queryModel = {
          pwd: '',
          pwdAgain: ''
        }
        setTimeout(() => {
          thiss.model = thiss.detail
          thiss.queryModel.mobile = thiss.detail.mobile
          this.$refs['adminPwdForm'].resetFields()
        }, 50)
      },
      _cancelEdit() {
        this.$emit('cancelEdit')
      },
      _resetPwd() {
        this.$refs.adminPwdForm.validate((valid) => {
          if (valid) {
            Api.updateAdminPwd({
              mobile: this.queryModel.mobile,
              pwd: md5(this.queryModel.pwd),
              pwdAgain: md5(this.queryModel.pwdAgain)
            }).then(resp => {
              this.$message({
                type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
                message: resp.data.msg
              })
              if (resp.data.code === Api.ERR_OK) {
                this.$emit('cancelEdit')
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
