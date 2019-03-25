<template>
  <div class="customDialog">
    <el-form ref="userInfo"  :inline="true"   class="toobar" :model="model" v-if="model"
             :rules="rules"
             label-width="80px"
             label-position="left">

      <!--<span class="item-title">未激活的用户手机号修改后,将重新发送邀请短信</span>-->
      <el-row type="flex">
        <el-form-item label="姓 名" prop="userName">
          <el-input v-model="model.userName" size="small" :disabled="_cannotEdit"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="手 机 号" prop="mobile">
          <el-input v-model="model.mobile" size="small" maxlength="11"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="证件类型" prop="idType">
          <el-select size="small" v-model="model.idType"
                     @change="_selectChange"
                     @clear="_selectChange"
                     :disabled="_cannotEdit" clearable placeholder="请选择证件类型">
            <el-option
              v-for="item in _IDtypeResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row type="flex">
        <el-form-item label="证 件 号" prop="idNumber">
          <el-input v-model="model.idNumber" :disabled="_cannotEdit" size="small" maxlength="20"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row  style="padding-top: 50px" type="flex">
      <el-col :span="12" :offset="2">
        <el-button class="role_off" size="small" @click="cancelEdit">取消</el-button>
      </el-col>
      <el-col :span="2" :offset="4">
        <el-button type="primary" size="small" @click.native="editSubmit">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as Api from 'api'
  import * as state from 'common/js/state-dic'
  import * as Validator from 'common/js/validator'

  export default {
    props: {
      detail: ''
    },
    data () {
      var validatorIdType = (rule, value, callback) => {
        var l = value.length
        if (this.model.isVerify === '1') {
          return callback()
        }
        switch (this.model.idType) {
          case '1': { // 身份证
            if (l !== 18) {
              return callback(new Error('证件输入不合法'))
            }
            break
          }
          case '2': { //护照
            if (l > 20 || l < 6) {
              return callback(new Error('证件输入不合法'))
            }
            break
          }
          case '3': { // 港澳通行证
            if (l !== 11) {
              return callback(new Error('证件输入不合法'))
            }
            break
          }
          case '4': { //台湾同胞
            if (l !== 8) {
              return callback(new Error('证件输入不合法'))
            }
            break
          }
          default:
            return callback(new Error('请先选择证件类型'))
        }
        setTimeout(() => {
          callback()
        }, 100)
      }
      return {
        model: {},
        rules: {
          'userName': [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {validator: Validator.validateName, trigger: 'blur'}],
          'mobile': [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {required: true, validator: Validator.validatorMobile, trigger: 'blur'}],
          'idType': {required: true, message: '请选择证件类型', trigger: 'blur'},
          'idNumber': [
            {required: true, message: '请输入证件号', trigger: 'blur'},
            {required: true, validator: validatorIdType, trigger: 'blur'}]
        }
      }
    },
    computed: {
      _IDtypeResource () {
        return state.funUserIdType()
      },
      _cannotEdit() {
        if (this.model.isVerify === '1' || this.model.isVerify === '2') {
          return true
        }
        return false
      }
    },
    watch: {
      'detail': {
        immediate: true,
        handler: function (val) {
          this.detail = val
          setTimeout(() => {
            this.model = JSON.parse(JSON.stringify(this.detail))
            console.log(this.model)
            this.$refs.userInfo.resetFields()
          }, 20)
        }
      }
    },
    methods: {
      cancelEdit(val) {
        this.$emit('cancelEdit', val)
      },
      editSubmit() {
        debugger
        this.$refs.userInfo.validate((valid) => {
          if (valid) {
            Api.editUserInfo({
              userId: this.model.userId,
              userName: this.model.userName,
              mobile: this.model.mobile,
              idNumber: this.model.idNumber,
              idType: this.model.idType
            }).then(response => {
              this.$notify({
                type: response.data.code === Api.ERR_OK ? 'success' : 'error',
                message: response.data.msg
              })
              if (response.data.code === Api.ERR_OK) {
                this.cancelEdit('1')
              }
            })
            this.$message('信息已提交')
          }
        })
      },
      _selectChange() {
        this.model.idNumber = ''
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
      margin-bottom 18px
    }

    .el-form-item__label {
      width: 30%;
    }

  .el-col
    span
      font-size 14px
</style>
