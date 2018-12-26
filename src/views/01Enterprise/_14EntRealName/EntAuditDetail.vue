<template>
  <div>
    <el-form ref="entInfo" :model="detail" v-if="detail"
             :rules="rules"
             :inline="false" class="toobar"
             label-width="140px"
             label-position="left">
      <div style="border-top: 1px dashed gray"></div>
      <el-row>
        <el-form-item  label="企业名称 :">
          <span v-text="detail.entName"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="法人代表姓名 :">
          <span v-text="detail.legalPerson"></span>
        </el-form-item>
      </el-row>

<!--      <el-row>
        <el-form-item label="法人代表身份证号 :">
          <span v-text="detail.legalPersonCard"></span>
        </el-form-item>
      </el-row>-->

      <el-row>
        <el-form-item label="统一社会信用代码 :">
          <span v-text="detail.comid"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="联系人 :">
          <span v-text="detail.contactName"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="联系电话 :">
          <span v-text="detail.contactPhone"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="办公地址 :">
          <span v-text="entAddress"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="证件类型">
          <el-radio-group v-model="detail.documentType" disabled>
            <el-radio label="1">多证合一营业执照(原注册号字样,调整为18为统一的社会信用代码)</el-radio>
            <br>
            <el-radio style="margin-top: 10px" label="2">普通营业执照(仍然标示为15位的'注册号')</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="营业执照 :" v-show="detail.businessLicencePath">
          <section style="display: inline-block;">
            <img ref="entImg" style="width: 50px; height: 50px; cursor: pointer" src="../../../assets/images/entImg.png"
                 @click="showEntImg">
          </section>
          <span style="height: 60px; line-height: 30px; color: #FF2F0F; display: inline-block" @click="showEntImg">点击查看</span>
        </el-form-item>
      </el-row>

    </el-form>

    <el-row v-show="isEdit" style="padding-top: 10px" type="flex" justify="center">
      <el-button class="role_off" @click="_doEntVerify(2)" size="small">拒绝</el-button>
      <el-button type="primary" @click.native="_doEntVerify(3)"
                 style="margin-left: 100px"
                 size="small">同意
      </el-button>
    </el-row>

  </div>
</template>

<script type="text/ecmascript-6">
  import {doEntVerify} from 'api'
  import {ERR_OK} from '../../../api/index'

  export default {
    props: {
      isAudit: {
        type: Boolean,
        default: false
      },
      detail: {
//      entId: '',
//      entName: '',
//      legalPerson: '',
//      legalPersonCard: '',
//      comid: '',
//      contactName: '',
//      businessLicencePath: '',
//      verifyState: ''
      },
      isEdit: false,
      rules: {}
    },
    data() {
      return {
        style: {
          inputspan: 14
        },
        model: {},
        isbigimg: false
      }
    },
    computed: {
      entAddress() {
        let province = this.detail.province
        if (province === null || province === undefined) {
          province = ''
        }
        let city = this.detail.city
        if (city === null || city === undefined) {
          city = ''
        }
        let address = this.detail.address
        if (address === null || address === undefined) {
          address = ''
        }
        return province + city + address
      }
    },
    beforeUpdate() {
      this.isbigimg = false
    },
    watch: {
      isbigimg(val) {
        if (this.isbigimg === true) {
          this.$refs.entImg.style = `width:500px;height:700px;position:absolute;left:50%;margin-left:-400px;top:10;margin-top:-500px;z-index:100`
        } else {
          this.$refs.entImg.style = `width: 50px; height: 50px`
        }
      }
    },
    methods: {
      _doEntVerify(state) {
        // 2 拒绝 3 通过
        doEntVerify({entId: this.detail.entId, verifyState: state}).then(response => {
          if (response.data.code === ERR_OK) {
            this.detail.verifyState = state
            this.$message({
              message: '操作已完成',
              type: 'success'
            })
          } else {
            this.$message({
              message: '操作异常',
              type: 'warning'
            })
          }
          this.$emit('done', this.detail.verifyState)
        })
      },
      showEntImg() {
        console.log('你点击了图片')
        window.open(this.detail.businessLicencePath)
      }
    },
    components: {}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-row
    margin-left 100px
    padding-top 0px
    margin-bottom 0px
</style>
