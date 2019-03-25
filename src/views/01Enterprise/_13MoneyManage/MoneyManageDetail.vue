<template>
  <div>
    <el-form ref="entInfo" :model="detail" v-if="detail"
             :inline="false" class="toobar"
             label-width="140px"
             label-position="left">
      <span>企业信息</span>
      <div style="border-top: 1px dashed gray"></div>
      <el-row>
        <el-form-item label="企业名称 :">
          <span v-text="detail.companyName"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="企业办公地址 :">
          <span v-text="detail.address"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="统一社会信用代码 :">
          <span v-text="detail.organizationNo"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="营业执照所在地 :">
          <span v-text="detail.licenseAddress"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="营业期限 :">
          <span v-text="detail.licenseStartDate + ' 到 ' + detail.licenseExpireDate"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="企业简介 :">
          <span v-text="detail.businessScope"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="联系人Emali :">
          <span v-text="detail.email"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="营业执照 :">
          <img src="../../../assets/images/entImg.png" style="cursor: pointer" width="100" @click="showEntImg"/>
          <span style="height: 60px; line-height: 30px; color: #FF2F0F; display: inline-block ; cursor: pointer"
                @click="showEntImg">点击查看</span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="开户许可证 :">

          <img src="../../../assets/images/ent_open.png" width="100" style="cursor: pointer" @click="showOpenImg"/>
          <span style="height: 60px; line-height: 30px; color: #FF2F0F; display: inline-block; cursor: pointer"
                @click="showOpenImg">点击查看</span>
        </el-form-item>
      </el-row>

      <span>法人信息</span>
      <div style="border-top: 1px dashed gray"></div>
      <el-row>
        <el-form-item label="姓名 :">
          <span v-text="detail.legalPerson"></span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="法人实名手机号 :">
          <span v-text="detail.legalPersonPhone"></span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="身份证号 :">
          <span v-text="detail.certNo"></span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="身份证有效期 :">
          <span v-text="detail.certEffectDate + ' - ' + detail.certInvalidDate"></span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="身份证正反面 :">
          <span v-text="detail.contactName"></span>
          <img src="../../../assets/images/id_front.jpg" style="cursor: pointer; width: 100px" @click="showIdFrontImg"/>
          <span style="height: 60px; line-height: 30px; color: #FF2F0F; display: inline-block; cursor: pointer"
                @click="showIdFrontImg">点击查看</span>
          <img style="margin-left: 20px ;cursor: pointer; width: 100px" src="../../../assets/images/id_back.jpg" @click="showIdBackImg" />
          <span style="height: 60px; line-height: 30px; color: #FF2F0F; display: inline-block; cursor: pointer"
                @click="showIdBackImg">点击查看</span>
        </el-form-item>
      </el-row>
      <span>银行账户信息</span>
      <div style="border-top: 1px dashed gray"></div>
      <el-row>
        <el-form-item label="开户银行 :">
          <span v-text="detail.bankName"></span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="银行账号 :">
          <span v-text="detail.bankAccountNo"></span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="开户地区 :">
          <span>{{detail.province + ' ' + detail.city}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="开户支行 :">
          <span v-text="detail.bankBranch"></span>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as Api from 'api'

  export default {
    props: {
      identityId: ''
    },
    data() {
      return {
        detail: '',
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
      },
      'identityId': {
        immediate: true,
        handler: function (val) {
          this._doQuery()
        }
      }
    },
    methods: {
      _doQuery() {
        Api.getEntMoneyMangeDetail({identityId: this.identityId}).then(response => {
          if (response.data.code === Api.ERR_OK) {
            this.detail = response.data.data
          }
        })
      },
      showEntImg() {
        console.log('你点击了图片')
        window.open(this.detail.businessLicence)
      },
      showOpenImg() {
        window.open(this.detail.openingPermit)
      },
      showIdFrontImg() {
        window.open(this.detail.cardFront)
      },
      showIdBackImg() {
        window.open(this.detail.cardReverse)
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
