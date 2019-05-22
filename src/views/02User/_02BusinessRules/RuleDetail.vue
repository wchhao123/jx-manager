<template>
  <div class="customDialog">
    <el-form :model="submitModel" :inline="true" ref="ruleForm" :rules="rules"  :disabled="this.startEdit">
      <span class="item-title"></span>
      <el-row>
        <el-form-item label="业务类型" required  prop="businessType">
          <el-select size="small"
                      :disabled = "true"
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
                     :disabled = "true"
                     placeholder="请选择启用3;hfgh状态">
            <el-option
              v-for="item in businessRuleStateResource"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <div  v-show="this.istoBank" >
      <span>限额规则</span>
      <span class="item-title"></span>
      </div>
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
      <el-row v-show="submitModel.businessType =='1'||submitModel.businessType =='4'">
        <el-form-item label="当月按证件限额(元):" prop="monthMaxAmountByIdNumber">
          <el-input size="small" v-model="submitModel.monthMaxAmountByIdNumber"    placeholder="请输入按证件限额"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="手续费:" prop="rate" v-show="submitModel.businessType !='1'">
          <el-input-number size="small" v-model="submitModel.rate"></el-input-number>
          % 按订单金额百分比计算
        </el-form-item>
      </el-row>
      <div  v-show="this.istoBank" >
        <span>手续费规则</span>
        <span class="item-title"></span>
        <p  v-if="submitModel.costType=='1'" style="color: red">按【提现金额*费率】计算，最低收取【<span>{{submitModel.floatMinAmount}}</span>】元，最高收取【<span>{{submitModel.floatMaxAmount}}</span>】元</p>
        <p  v-if="submitModel.costType=='2'" style="color: red">金额区间内收取定额手续费，超过最大区间不收手续费</p>
        <el-row>
          <el-form-item  required >
            <el-select size="small"
                       v-model="submitModel.costType"
                       @change="_selectChangeCost"
                       filterable placeholder="请选择手续费类型类型">
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <div v-if="submitModel.costType=='1'">
          <el-row>
            <el-form-item label="手续费率:" prop="rate">
              <el-input-number size="small" v-model="submitModel.rate"></el-input-number>%
            </el-form-item>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="最低收取:" prop="floatMinAmount">
               <el-input size="small" v-model="submitModel.floatMinAmount" placeholder ="请输入最低收取金额" style="width: 100px" ></el-input>元——
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="最高收取:" prop="floatMaxAmount">
                <el-input size="small" v-model="submitModel.floatMaxAmount" placeholder ="请输入最高收取金额" style="width: 100px"></el-input>元
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="submitModel.costType=='2'">
          <el-row>
            <el-col >
              <el-form-item label="金额区间:" prop="fixedMinAmount">
                <el-input size="small" v-model="submitModel.amountMin" style="width: 120px" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="padding-right: 80px">
              <el-form-item label="——" prop="fixedMaxAmount">
                <el-input size="small" v-model="submitModel.fixedMaxAmount" placeholder ="请输入最大提现区间" style="width: 120px;"></el-input>元
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="定额手续费:" prop="fixedAmount" style="padding-top: 10px">
              <el-input size="small" v-model="submitModel.fixedAmount" placeholder="请输入固定手续费金额" style="width: 200px;"></el-input>元
            </el-form-item>
          </el-row>
        </div>
      </div>
    </el-form>
    <el-row style="padding-top: 50px" v-show="this.startEdit">
      <el-col :span="12" :offset="2" style="padding-left: 120px;">
        <el-button class="role_off" size="small" @click="edit" >编辑业务规则</el-button>
      </el-col>
    </el-row>
    <el-row style="padding-top: 50px" v-show="!this.startEdit">
      <el-col :span="12" :offset="2">
        <el-button class="role_off" size="small" @click="cancelEdit">取消</el-button>
      </el-col>
      <el-col :span="2" :offset="4">
        <el-button type="primary" size="small" @click.native="_editSubmit" :disabled=" this.isEdit">确认修改</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as Api from 'api'
  import * as state from 'common/js/state-dic'
  import * as Regex from 'common/js/regex'
  import * as Validator from 'common/js/validator'
  import Vue from 'vue'
  export default {
    props: {
      model: {},
      istoBank: ''
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
      var validatorFixedMaxAmount = (rule, value, callback) => {

        if(this.submitModel.businessType === '1' && this.submitModel.costType === '2') {
          if (parseFloat(this.submitModel.fixedMaxAmount) <= parseFloat(this.submitModel.amountMin)) {

            return callback(new Error('区间最大值输入必须大于区间最小值'))
          }
          if (parseFloat(this.submitModel.fixedMaxAmount) > parseFloat(this.submitModel.amountMax)) {

            return callback(new Error('区间最大值输入不可超过单笔最大金额'))
          }
        }
          setTimeout(() => {
            callback()
          }, 100)

      }
      var validatorFixedAmount = (rule, value, callback) => {

          if(this.submitModel.businessType === '1'&& this.submitModel.costType === '2') {
            if (!value) {

              return callback(new Error('固定手续费不能为空!'))
            }
            let v = parseFloat(value)
            if (v <= 0) {

              return callback(new Error('固定手续费必须大于0'))
            }
            if (Regex.regMoney.test(value) === false) {

              return callback(new Error('输入金额不合法!'))
            }
          }
        setTimeout(() => {
          callback()
        }, 100)
      }


      var validatorfloatMinAmount = (rule, value, callback) => {

          if(this.submitModel.businessType === '1' && this.submitModel.costType === '1') {
            if (!value) {
              return callback(new Error('最低收取金额不能为空!'))
            }
            if (this.submitModel.rate != null && this.submitModel.rate != 0) {
              if (this.submitModel.floatMinAmount <= 0) {

                return callback(new Error('当浮动金额大于0时最低收取金额必须大于0'))
              }

              if (parseFloat(this.submitModel.floatMaxAmount) <= parseFloat(this.submitModel.floatMinAmount)) {

                return callback(new Error('最低收取金额必须小于最高收取金额'))
              }
              if (parseFloat(this.submitModel.floatMinAmount) <  parseFloat(this.submitModel.amountMin * this.submitModel.rate * 0.01)) {

                return callback(new Error('最低收取金额不得小于单笔最小金额乘以费率'))
              }
            }
            if (this.submitModel.rate == 0) {
              if (this.submitModel.floatMinAmount != 0) {

                return callback(new Error('当浮动费率等于0时最低收取金额默认为0'))
              }
            }else{
              if (Regex.regMoney.test(value) === false && value !== '∞') {
                return callback(new Error('输入金额不合法!'))
              }
            }
          }
        setTimeout(() => {
          callback()
        }, 100)
      }

      var validatorMonthMaxAmountByIdNumber = (rule, value, callback) => {
        debugger
        if(this.submitModel.businessType =='1'||this.submitModel.businessType =='4'){
          if (!value) {
            return callback(new Error('金额不能为空!'))
          }
          if (Regex.regMoney.test(value) === false && value !== '∞') {
            return callback(new Error('输入金额不合法!'))
          }
        }
        setTimeout(() => {
          callback()
        }, 100)
      }
      var validatorfloatMaxAmount = (rule, value, callback) => {

          if(this.submitModel.businessType === '1' && this.submitModel.costType === '1') {
            if (!value) {
              return callback(new Error('最高收取金额不能为空!'))
            }
            if (this.submitModel.rate != null && this.submitModel.rate != 0) {
              if (this.submitModel.floatMaxAmount <= 0) {

                return callback(new Error('当浮动金额大于0时最高收取金额必须大于0'))
              }
              if (parseFloat(this.submitModel.floatMaxAmount) <= parseFloat(this.submitModel.floatMinAmount)) {

                return callback(new Error('最高收取金额必须大于最低收取金额'))
              }

               if (parseFloat(this.submitModel.floatMaxAmount) >= parseFloat(this.submitModel.amountMax * this.submitModel.rate * 0.01)) {

                return callback(new Error('最高收取金额必须小于单笔最大金额乘以费率'))
              }
            }
            if (this.submitModel.rate == 0) {
              if (this.submitModel.floatMaxAmount != 0) {
                return callback(new Error('当浮动费率等于0时最高收取金额默认为0'))
              }
            }else{
              if (Regex.regMoney.test(value) === false && value !== '∞') {
                return callback(new Error('输入金额不合法!'))
              }
            }
          }
        setTimeout(() => {
          callback()
        }, 100)
      }
      var validatorRate = (rule, value, callback) => {
        var pattern = /^\d+.?\d{0,2}$/;
        if(!pattern.test(value)){
          return callback(new Error('小数点后最多只能输入两位!'))
        }
        setTimeout(() => {
          callback()
        }, 100)
      }
      return {
        submitModel: {},
        options:[
          {key:'1',value:"浮动手续费-外扣"},
          {key:'2',value:"固定手续费-外扣"},
        ],
        startEdit: true,
        isEdit:false,
        rules: {
          businessType:[],
           amountMin: [
            {required: true, message: '请输入单笔最小金额' ,trigger: 'blur'},
             {max: 12, message:'长度不得大于12位', trigger: 'blur'},
             {validator: checkMinAmount, trigger: 'blur'}
           ],
           amountMax: [
            {required: true, message: '请输入单笔最大金额', trigger: 'blur'},
             {max: 12,message:'长度不得大于12位', trigger: 'blur'},
            {validator: Validator.validatorMaxAmount, trigger: 'blur'},
            {validator: validatorMax, trigger: 'blur'}
           ],
           dayMaxCount: [
            {required: true, message: '请输入当日最大笔数', trigger: 'blur'},
             {max: 12,message:'长度不得大于12位', trigger: 'blur'},
            {validator: Validator.validatorPositive, trigger: 'blur'}
          ],
           dayMaxAmount: [
             {required: true, message: '请输入当日最大限额', trigger: 'blur'},
             {max: 12,message:'长度不得大于12位', trigger: 'blur'},
             {validator: Validator.validatorMoney, trigger: 'blur'}
           ],
           monthMaxAmount: [
             {required: true, message: '请输入当月最大限额', trigger: 'blur'},
             {max: 12,message:'长度不得大于12位', trigger: 'blur'},
             {validator: Validator.validatorMoney, trigger: 'blur'}
           ],
           rate: [
             {required: true, message: '请输入手续费', trigger: 'blur'},
             {max: 12,type:'number' ,message:'长度不得大于12位', trigger: 'blur'},
             {validator: validatorRate, trigger: 'blur'},
           ],
           floatMinAmount: [
             {required: true, message: '请输入最低收取金额', trigger: 'blur'},
             {max: 12,message:'长度不得大于12位', trigger: 'blur'},
             {validator: validatorfloatMinAmount, trigger: 'blur'},
               ],
           floatMaxAmount: [
             {required: true, message: '请输入最高收取金额', trigger: 'blur'},
             {max: 12,message:'长度不得大于12位', trigger: 'blur'},
             {validator: validatorfloatMaxAmount, trigger: 'blur'},
           ],
           monthMaxAmountByIdNumber : [
          //  {required: true, message: '请输入当月按这证件限额',trigger:'blur'},
             {max: 12,message:'长度不得大于12位', trigger: 'blur'},
             {validator: validatorMonthMaxAmountByIdNumber, trigger: 'blur'}
           ],
           fixedAmount : [
            {required: true, message: '请输入定额手续费', trigger: 'blur'},
             {max: 12,message:'长度不得大于12位', trigger: 'blur'},
            {validator:validatorFixedAmount, trigger: 'blur'}
           ],
           fixedMaxAmount : [
            {required: true, message: '请输入最大提现区间', trigger: 'blur'},
             {max: 12,message:'长度不得大于12位', trigger: 'blur'},
             {validator:validatorFixedMaxAmount, trigger: 'blur'},
            {validator: Validator.validatorMoney, trigger: 'blur'}
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
      },
      'istoBank':{
        immediate: true,
        handler: function (val) {
         console.log('istoBank'+val)
        }
      },
      'submitModel.rate':{
        immediate: true,
        handler: function (val) {
          console.log('rate'+val)
          console.log(typeof (this.submitModel.rate ))
          if(val== '0'&& this.submitModel.costType!= null && this.submitModel.costType == '1'){
            this.submitModel.floatMinAmount = '0'
            this.submitModel.floatMaxAmount = '0'
          }
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
        this.isEdit = true
        console.log('更新业务规则'+ JSON.stringify(this.submitModel))
        this.$refs['ruleForm'].validate((valid) => {
          console.log('valid'+valid)
          if (valid) {
            // if (this.isAdd) {
            //   console.log(`新增业务规则 ${this.submitModel}`)
            //   Api.addBusinessRule(this.submitModel).then(response => {
            //     this.$notify({
            //       message: response.data.msg,
            //       type: response.data.code === Api.ERR_OK ? 'success' : 'error'
            //     })
            //     if (response.data.code === Api.ERR_OK) {
            //       this.cancelEdit(1)
            //     }
            //   })
            // } else {

              this.submitModel.fixedMinAmount = this.submitModel.amountMin
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

          }else{
            this.isEdit = false
          }
        })
      },
      edit (){
          this.startEdit = false
      },
      _setModel() {
        setTimeout(() => {
          this.$refs['ruleForm'].resetFields()
          console.log(this.model)
          this.submitModel = this.model
          this.startEdit =true
          this.isEdit = false
          console.log(this.submitModel)
        }, 50)
      },
      _selectChange(val) {
        console.log(val)
        this.submitModel.businessType = val
      },
      _selectChangeCost(val){
        this.submitModel.costType = val
        console.log(this.submitModel.costType)
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
