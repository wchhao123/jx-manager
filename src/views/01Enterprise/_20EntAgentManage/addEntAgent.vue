<template>
  <div>
   <hr>
    <span style="color: red;margin: 15px; display:block;" v-text="this.agentInfo.hintText"></span>
    <el-form :inline=true :model="queryModel"  ref="addEntAgent" :rules="entAgent" label-position="right" class="toolbar form-inline" style="margin-bottom: 30px">
    <el-row  v-show="isShow">
      <el-col>
        <el-form-item :span="6"  prop="entId" >
        <ent-select title="企业名称" place-holder="请输入企业名称"
                    @input-select="(index) => {index !== undefined ?  this.queryModel.entId = index: this.queryModel.entId = null}">
         </ent-select>
        </el-form-item>
      </el-col>
    </el-row>
      <el-row v-show="!isShow">
      <el-col>
        <el-form-item :span="6" label="企业名称"   >
          <el-input size="small" v-model="queryModel.entName"   disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item :span="6" label="公众号名称"  prop="wppName">
          <el-input size="small" v-model="queryModel.wppName" placeholder="请输入公众号名称" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item :span="6" label="公众号链接" prop="wppUrl">
          <el-input size="small" v-model="queryModel.wppUrl" placeholder="请输入公众号链接" clearable ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <div style="width:600px;height:120px;border:1px solid gainsboro ;padding: 10px">
      <p style="font-size: 20px;color: black;padding: 5px;">举例</p>
      <p style="padding: 2px;">工资到账提醒:</p>
      <p style="padding: 2px;">【嘉薪payroll】 xxxx提醒您，您的三月工资已到账，请登录<span style="color: red;padding:5px;">“公众号名称”</span>微信公众号查看</p>
    </div>
    <el-row type="flex" justify="center" style="margin-top: 60px">
      <el-button style="width: 120px" size="small" @click="_cancelEdit" >取 消</el-button>
      <el-button style="margin-left: 100px;width: 120px" size="small" type="primary"
                 @click="submit" v-text="agentInfo.confirmText">
      </el-button>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      agentInfo: {}
    },
    watch: {
      agentInfo: {
        immediate: true,
        deep: true,
        handler: function (val) {
          debugger
          console.log(this.agentInfo)
          console.log(typeof (this.agentInfo.detail))
          if (this.agentInfo.detail != ''&&this.agentInfo.detail!= undefined) {
            this.isShow = false
            this.queryModel = JSON.parse(this.agentInfo.detail)
            console.log(this.queryModel)
          } else {
            this.isShow = true
            this.queryModel = {}
         //   this.$refs['addEntAgent'].resetFields()
          }
          //清空校验文字
          setTimeout(() => {
            this.$refs['addEntAgent'].clearValidate()
          }, 20)
        }
      }
    },
    data() {
      return {
        isLoading: false,
        isShow: true,
        queryModel: {
        },
        entAgent: {
          entId: {required: true, message: '请选择企业', trigger: 'blur'},
          wppName: {required: true, message: '请填写公众号名称', trigger: 'blur'},
          wppUrl: {required: true, message: '请添加公众号链接', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs.addEntAgent.validate((valid) => {
          if(valid) {
            if (this.agentInfo.confirmText === '确认添加') {
              this.isLoading = true
              this.$post(this.$url('/add_agent'), this.queryModel).then(response => {
                this.$message.success(response.msg)
                this.isLoading = false
                this.$emit('close')
              }), err => {
                this.isLoading = false
                this.$message.error(err)
              }
            }
            if (this.agentInfo.confirmText === '确认修改') {
              this.queryModel.cteateDate = ''
              this.queryModel.updateDate = ''
              console.log(this.queryModel)
              this.$post(this.$url('/update_agent'), this.queryModel).then(response => {
                this.$message.success(response.msg)
                this.isLoading = false
                this.$emit('close')
              }), err => {
                this.isLoading = false
                this.$message.error(err)
              }
            }
          }
       })
      },
      _cancelEdit() {
        this.queryModel = {}
        this.$emit('close')
      }
    }
  }
</script>
