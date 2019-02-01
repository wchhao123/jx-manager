<template>
  <div class="customDialog">
    <el-form :model="submitModel" :inline="true" ref="ruleForm" :rules="rules">
      <span class="item-title"></span>
      <el-row>
        <el-form-item label="业务类型" required  prop="businessType">
          <el-select size="small"
                     :disabled = "!isAdd"
                     v-model="submitModel.businessType"
                     @change="_selectChange"
                     filterable placeholder="请选择业务类型">
            <el-option
              v-for="item in businessRuleTypeResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="是否启用" required prop="ruleState">
          <el-select size="small" v-model="submitModel.ruleState" filterable
                     :disabled = "!isAdd"
                     placeholder="请选择启用状态">
            <el-option
              v-for="item in businessRuleStateResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="单笔最小金额(元):" prop="amountMin">
          <el-input size="small" v-model="submitModel.amountMin"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="单笔最大金额(元):" prop="amountMax">
          <el-input size="small" v-model="submitModel.amountMax"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="当日最大笔数:" prop="dayMaxCount">
          <el-input style="width: 100px" size="small" v-model="submitModel.dayMaxCount"></el-input>
          ∞为不限
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="当日最大限额金额(元):" prop="dayMaxAmount">
          <el-input size="small" v-model="submitModel.dayMaxAmount"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="当月最大限额金额(元):" prop="monthMaxAmount">
          <el-input size="small" v-model="submitModel.monthMaxAmount"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="手续费:" prop="rate">
          <el-input-number size="small" v-model="submitModel.rate"></el-input-number>
          % 按订单金额百分比计算
        </el-form-item>
      </el-row>
    </el-form>
    <el-row style="padding-top: 50px">
      <el-col :span="12" :offset="2">
        <el-button class="role_off" size="small" @click="cancelEdit">取消</el-button>
      </el-col>
      <el-col :span="2" :offset="4">
        <el-button type="primary" size="small" @click.native="_editSubmit">{{isAdd === true ? '创建' : '修改'}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as Api from 'api'
  import * as state from 'common/js/state-dic'
  import * as Regex from 'common/js/regex'
  import * as Validator from 'common/js/validator'
  export default {
    props: {
      model: {},
      isAdd: false
    },
    data () {
      var checkMinAmount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('最小金额不能为空!'))
        }
        if (Regex.regMoney.test(value) === false) {
          return callback(new Error('输入金额不合法!'))
        }
        setTimeout(() => {
          let v = parseFloat(value)
          if (v <= 0) {
            callback(new Error('限额必须大于0'))
          } else {
            callback()
          }
        }, 100)
      }
      var validatorMax = (rule, value, callback) => {
        if (this.submitModel.amountMin >= this.submitModel.amountMax) {
          return callback(new Error('单笔最大限额,必须大于最小限额'))
        }
        setTimeout(() => {
          callback()
        }, 100)
      }
      return {
        submitModel: {},
        rules: {
          businessType:[],
          amountMin: [
            {required: true, message: '请输入单笔最小金额', trigger: 'blur'},
            {validator: checkMinAmount, trigger: 'blur'}
          ],
          amountMax: [
            {required: true, message: '请输入单笔最大金额', trigger: 'blur'},
            {validator: Validator.validatorMaxAmount, trigger: 'blur'},
            {validator: validatorMax, trigger: 'blur'}
          ],
          dayMaxCount: [
            {required: true, message: '请输入当日最大笔数', trigger: 'blur'},
            {validator: Validator.validatorPositive, trigger: 'blur'}
          ],
          dayMaxAmount: [
            {required: true, message: '请输入当日最大限额', trigger: 'blur'},
            {validator: Validator.validatorMoney, trigger: 'blur'}
          ],
          monthMaxAmount: [
            {required: true, message: '请输入当月最大限额', trigger: 'blur'},
            {validator: Validator.validatorMoney, trigger: 'blur'}
          ],
          rate: [
            {required: true, message: '请输入手续费', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      'model': {
        immediate: true,
        handler: function (val) {
          this.model = val
          this._setModel()
        }
      }
    },
    computed: {
      businessRuleTypeResource () {
        return state.funUserBusinessRuleType()
      },
      businessRuleStateResource () {
        return state.funUserBusinessRuleState()
      }
    },
    methods: {
      _editSubmit () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.isAdd) {
              console.log(`新增业务规则 ${this.submitModel}`)
              Api.addBusinessRule(this.submitModel).then(response => {
                this.$notify({
                  message: response.data.msg,
                  type: response.data.code === Api.ERR_OK ? 'success' : 'error'
                })
                if (response.data.code === Api.ERR_OK) {
                  this.cancelEdit(1)
                }
              })
            } else {
              console.log(`更新业务规则 ${this.submitModel}`)
              Api.updateBusinessRule(this.submitModel).then(response => {
                this.$notify({
                  message: response.data.msg,
                  type: response.data.code === Api.ERR_OK ? 'success' : 'error'
                })
                if (response.data.code === Api.ERR_OK) {
                  this.cancelEdit(1)
                }
              })
            }
          }
        })
      },
      _setModel() {
        setTimeout(() => {
          this.$refs['ruleForm'].resetFields()
          if (this.isAdd) {
            this.submitModel = {}
          } else {
            this.submitModel = this.model
          }
        }, 50)
      },
      _selectChange(val) {
        console.log(val)
        this.submitModel.businessType = val
      },
      cancelEdit (isRefresh) {
        this.$emit('cancelEdit', isRefresh)
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
      margin-bottom 15px
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
