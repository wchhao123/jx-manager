<template>
  <section id="login">
    <el-form :inline="true"
             style="-webkit-animation-name: shineBlue;-webkit-animation-duration: 3s;-webkit-animation-iteration-count: infinite; border-radius:5px;border: 1px solid #b1b1b1;background: rgba(255,255,255,.5);width:260px;padding: 5px 15px;position: absolute;right: 80px;top:120px"
             autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
      <el-row style="text-align: center;padding: 12px 0">
        <span style=" font-size: 26px;font-weight: 600;">欢迎登录</span>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!--<input type="text"  v-focus>-->
          <el-form-item style="border-radius: 5px" prop="mobile">
            <el-input autofocus autoComplete="on" name="mobile" style="border-radius: 5px" v-model="loginForm.mobile"
                      tabindex="1" placeholder="手机号">
              <template slot="prepend"><i class="el-icon-message "/></template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 3px">
        <el-col :span="24">
          <el-form-item style="border-radius: 5px" prop="password">
            <el-input autoComplete="on" name="password" type="password" v-model="loginForm.password"
                      @keyup.enter.native="LoginMenu('loginForm')" tabindex="2" placeholder="密码">
              <template slot="prepend"><i class="el-icon-document"/></template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="8" style="margin-top: 3px">-->
        <!--<el-col :span="7" style="font-size: 12px">-->
          <!--<el-input size="small" placeholder="验证码" v-model="codeNumber.code"-->
                    <!--@keyup.enter.native="LoginMenu('loginForm')" tabindex="3"></el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="8">-->
          <!--<img style="border-radius: 5px;height: 28px;width: 100%;border: 1px solid #b1b1b1 " :src="captchaCodeImg"-->
               <!--v-show="captchaCodeImg">-->
        <!--</el-col>-->
        <!--<el-col :span="9" style="font-size: 10px">-->
          <!--<span-->
            <!--style="display:inline-block;font-size:12px;cursor:pointer;color: #1c2438;width:100%;height:100%;line-height: 2.5"-->
            <!--@click="getCaptchaCodes">-->
            <!--看不清，<span class="change_page">换一张</span>-->
          <!--</span>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="font-size: 12px">
          <el-form-item>
            <el-button type="primary" style="width:100%;" v-loading="logining"
                       @click.native.prevent="LoginMenu('loginForm')">
              登&nbsp;录
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>

<script>
import { getCheckCode, getCaptchaCode } from '../api/login'
import md5 from 'js-md5'
export default {
  data () {
    return {
      captchaCodeImg: '', // 验证码地址
      codeNumber: {code: ''}, // 验证码
      logining: false,
      isOk: 'ok',
      loginForm: {
        mobile: '',
        password: '',
        thiss: this
      },
      loginRules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}

        ]
      }
    }
  },
  created () {
    // this.getCaptchaCodes()
  },
  methods: {
    getCaptchaCodes () {
    // this.captchaCodeImg = 'http://192.168.68.84:7088/getcode.jpg'+new Date();
      getCaptchaCode().then(response => {
        // alert(JSON.stringify(response.data.data.base64));
        this.captchaCodeImg = 'data:image/jpeg;base64,' + response.data.data.base64
      })
    },

    LoginMenu (formName) {
      // this.$router.push('/')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getCheckCode(this.codeNumber).then(response => {
            // alert(JSON.stringify(this.codeNumber))
            if (this.isOk === response.data.data.isOk) {
              this.loading = true
              this.$store.dispatch('login', {
                mobile: this.loginForm.mobile,
                password: md5(this.loginForm.password),
                thiss: this
              }).then(() => {
                this.loading = false
              }).catch(err => {
                this.$message.error(err)
                this.loading = false
              })
            } else {
              this.$message({message: '验证码错误', type: 'error'})
            }
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    }
  }
}

</script>
<style type="text/css">
  @-webkit-keyframes shineBlue {
    0% {
      box-shadow: 0 0 9px #b1b1b1;
    }
    50% {
      box-shadow: 0 0 25px #5599FF;
    }
    100% {
      box-shadow: 0 0 9px #b1b1b1;
    }
  }

  #login .el-form-item {
    width: 100%;
    margin-bottom: 16px;
  }

  #login .el-form-item .el-form-item__error {
    padding-top: 9px !important;
  }

  #login .el-form-item__content {
    width: 100%;
  }

  #recharge_query .el-date-editor {
    width: 100%;
  }
</style>
<style rel="stylesheet/scss" lang="scss">

  #login {
    width: 100%;
    height: 100%;
    position: relative;
     -ms-background-position-x: 50%;
     -ms-background-position-y: center;
    background: url(../../static/img/JOC-bg.jpg);
    background-size: 100% 100%;
     -moz-background-size: 100% 100%;
     -webkit-background-size: 100% 100%;
    overflow-y: hidden;

    input:-webkit-autofill {
       -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
       -webkit-text-fill-color: #1c2438 !important;
    }
    .el-input {
      width: 100%;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: gray;
    }
    .change_page {
      color: brown;
      &:hover {
        text-decoration: underline;
        color: #20a0ff;
      }
    }
  }

</style>
