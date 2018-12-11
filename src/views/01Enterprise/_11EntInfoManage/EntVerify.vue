<template>
  <div>
    <el-form :model="entInfo" ref="verifyForm" v-show="entInfo" :rules="rules"
             :v-loading="loading"
             :inline="true" label-width="200px">
      <el-row style="border-top: 1px dashed grey; padding-top:10px;">
        <el-form-item label="企业名称" prop="entName">
          <el-input size="small" v-model="entInfo.entName"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="办公电话" prop="contactPhone">
          <el-input size="small" v-model="entInfo.contactPhone" maxlength="20"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="法人代表姓名" prop="legalPerson">
          <el-input size="small" v-model="entInfo.legalPerson"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="法人代表身份证号" prop="legalPersonCard">
          <el-input size="small" v-model="entInfo.legalPersonCard"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="企业办公地址:" required>
          <el-col :span="4">
            <el-form-item prop="province">
              <el-select v-model="entInfo.province" @change="selectProvince" size="small">
                <el-option v-for="item in _provinces"
                           :key="item.uniqueId"
                           :label="item.addrName"
                           :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="city">
              <el-select v-model="entInfo.city" @change="selectCity" size="small">
                <el-option v-for="item in cities"
                           :key="item.uniqueId"
                           :label="item.addrName"
                           :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="address">
              <el-input v-model="entInfo.address" maxlength="32" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="证件类型" prop="documentType">
          <el-radio-group v-model="entInfo.documentType">
            <el-radio @change="_radioChange" label="1">多证合一营业执照(原注册号字样,调整为18为统一的社会信用代码)</el-radio>
            <br>
            <el-radio @change="_radioChange" style="margin-top: 10px" label="2">普通营业执照(仍然标示为15位的'注册号')</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="营业执照" prop="uploadFileUrl" v-model="entInfo.uploadFileUrl">
          <el-input v-show="false" v-model="entInfo.uploadFileUrl"></el-input>
          <img src="../../../assets/images/entImg.png" style="width: 90px; height: 140px; cursor: pointer" @click="_showBigImg()"/>
          <section style="display: inline-block">
            <span
              class="uploadTip">上传营业执照
              <br>文件所有信息清晰可见,内容真实有效,不得做人为修改
              <br>支持文件格式: pdf,jpf,jpeg,bmp,gif,png 大小不超过2M</span>
            <br>
            <el-upload
              v-show="this.$store.getters.getBtnIsShowByName('btn_upload')"
              ref="upload"
              :limit="limit"
              :show-file-list="true"
              :action="_uploadAddress"
              :on-success="_uploadSuccess"
              :on-remove="_fileRemoved"
              :before-upload="_beforeUpload" style="display: inline">
              <el-button type="primary" plain="" size="mini">选择文件</el-button>
            </el-upload>
          </section>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item :label="tipLable" prop="comid">
          <el-input v-model="entInfo.comid" size="small"  :maxlength="maxLength" :placeholder="comiPlaceHolder"></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row type="flex" justify="center" style="margin-top: 30px"
            v-show="this.$store.getters.getBtnIsShowByName('btn_verify_submit')">
      <el-button size="small" @click="_submitVerify(0)"> 保 存</el-button>
      <el-button style="margin-left: 30px" size="small" type="primary" plain="" @click="_submitVerify(1)">提交审核
      </el-button>
    </el-row>
  </div>
</template>

<script>
  import * as Api from 'api'
  import * as Validator from 'common/js/validator'
  import {http} from 'api/enterprise'

  export default {
    props: {
      entId: ''
    },
    data() {
      return {
        tipLable: '统一社会信用代码',
        maxLength: 18,
        comiPlaceHolder: '请输入统一社会信用代码',
        entInfo: {},
        loading: false,
        isbigimg: false,
        limit: 1,
        cities: [],
        rules: {
          entName: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            {validator: Validator.validateEntName, trigger: 'blur'}
          ],
          contactPhone: {required: true, message: '请输入办公电话', trigger: 'blur'},
          province: [
            {required: true, message: '请选择省份', trigger: 'change'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          legalPerson: [
            {required: true, message: '请输入法人代表姓名', trigger: 'blur'},
            {validator: Validator.validateName, trigger: 'blur'}
          ],
          /*legalPersonCard: [
            {required: true, message: '法人代表身份证号', trigger: 'blur'},
            {validator: Validator.validateIdCard, trigger: 'blur'}
          ],*/
          address: [
            {required: true, message: '请输入企业地址', trigger: 'blur'}
          ],
          documentType: {required: true, message: '请选择证件类型', trigger: 'blur'},
          uploadFileUrl: {required: true, message: '请上传营业执照', trigger: 'blur'},
          comid: {required: true, message: '输入不能为空', trigger: 'blur'}
        }
      }
    },
    watch: {
      'entId': {
        immediate: true,
        handler: function (val) {
          this.entId = val
          this._getEntDetail()
          setTimeout(() => {
            this.$refs.verifyForm.resetFields()
            this.$refs.upload.clearFiles()
          }, 50)
        }
      }
    },
    computed: {
      _provinces() {
        let provinces = this.$store.getters.provinces
        console.log(provinces)
        return provinces
      },
      _uploadAddress() {
        return http.prefix + '/jx/upload/oss'
      }
    },
    methods: {
      _getEntDetail() {
        if (this.entId === '') {
          return
        }
        this.isLoading = true
        Api.getEntDetail({entId: this.entId}).then(response => {
          console.log('查询企业详情!')
          this.isLoading = false
          let e = response.data.data
          let eVerifyInfo = response.data.data.verifyInfo
          this.entInfo = Object.assign(e, eVerifyInfo)
          this.entInfo.uploadFileUrl = this.entInfo.businessLicencePath
          console.log(this.entInfo)
        })
      },
      _submitVerify(tag) {
        debugger
        console.log('提交审核' + tag)
        let t = tag === 1 ? 'true' : 'false'
        this.$refs.verifyForm.validate(v => {
          if (v) {
            if (!this.entInfo.uploadFileUrl || this.entInfo.uploadFileUrl.length < 1) {
              this.$message.error('请上传营业执照')
              return
            }
            this.loading = true
            Api.updateEntVerify({
              submit: t,
              entId: this.entId,
              entName: this.entInfo.entName,
              contactPhone: this.entInfo.contactPhone,
              legalPerson: this.entInfo.legalPerson,
              legalPersonCard: this.entInfo.legalPersonCard,
              province: this.entInfo.province,
              city: this.entInfo.city,
              addrId: this.entInfo.addrId,
              address: this.entInfo.address,
              businessLicencePath: this.entInfo.uploadFileUrl,
              comid: this.entInfo.comid,
              documentType: this.entInfo.documentType
            }).then(resp => {
              debugger
              this.loading = false
              let r = resp.data.code === Api.ERR_OK
              this.$message({
                message: resp.data.msg,
                type: r ? 'success' : 'error'
              })
              if (r) {
                this.$emit('cancelEdit', 1)
              }
            })
          }
        })
      },
      _radioChange(val) {
        if (val === '2') {
          this.tipLable = '注册码'
          this.comiPlaceHolder = '请输入注册码'
          this.maxLength = 15
          this.entInfo.comid = ''
        } else if (val === '1') {
          this.tipLable = '统一社会信用代码'
          this.comiPlaceHolder = '请输入统一社会信用代码'
          this.maxLength = 18
          this.entInfo.comid = ''
        }
      },
      _showBigImg() {
        let url = this.entInfo.uploadFileUrl && this.entInfo.uploadFileUrl.length > 0
          ? this.entInfo.uploadFileUrl
          : this.entInfo.businessLicencePath && this.entInfo.businessLicencePath.length > 10
            ? this.entInfo.businessLicencePath
            : ''
        if (url.length > 0) {
          window.open(url)
        } else {
          this.$message.warning('请先上传营业执照')
        }
      },
      _beforeUpload(file) {
        const fileType = file.type
        // 支持图片和 pdf文件
        let isImg = fileType.indexOf('image') !== -1 || fileType.indexOf('application/pdf') !== -1
        const isLt8M = file.size / 1024 / 1024 < 2
        if (!isImg) {
          this.$message.error('上传营业执照 格式 仅支持图片和pdf!')
        }
        if (!isLt8M) {
          this.$message.error('上传营业执照 大小不能超过 2MB!')
        }
        let r = isImg && isLt8M
        if (r) {
          this.loading = true
        }
        return isImg && isLt8M
      },
      _uploadSuccess(res) {
        console.log(res)
        this.loading = false
        if (res.code === '0000') {
          this.entInfo.uploadFileUrl = res.data.url
        } else {
          this.$message.error('文件上传失败')
        }
        console.log(res.msg)
      },
      _fileRemoved(file) {
        this.entInfo.uploadFileUrl = ''
      },
      selectProvince(val) {
        console.log(`选中省份${val}`)
        this.entInfo.province = val.addrName
        Api.getCities({provinceId: val.uniqueId}).then(response => {
          if (response.data.code === Api.ERR_OK) {
            this.cities = response.data.data
            this.entInfo.city = this.cities[0].addrName
          }
        })
      },
      selectCity(val) {
        console.log(`选中了城市${val}`)
        this.entInfo.city = val.addrName
        this.entInfo.addrId = val.uniqueId
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-row
    padding-top 0px
    margin-bottom 0px

  .el-form-item
    .el-input
      width 220px

  .uploadTip
    display inline-block
    line-height 14px
</style>
