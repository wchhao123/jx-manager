<template>
  <div>
    <el-form :model="entInfo" ref="verifyForm" v-show="entInfo" :rules="rules"
             :v-loading="isLoading"
             :inline="true" label-width="200px">
      <el-row style="border-top: 1px solid grey; padding-top:10px;">
        <el-form-item label="签约主体企业名称" prop="cooperateEntName">
          <el-input :disabled="!isSubmit" maxlength="32" size="small" v-model="entInfo.cooperateEntName" clearable
                    placeholder="请输入签约主体企业名称"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="业务类型" prop="businessType">
          <el-select style="width: 320px" :disabled="!edit" size="small" v-model="entInfo.businessType" clearable
                     placeholder="请选择业务类型">
            <el-option
              v-for="(item, index) of this.$state.signBusinessType"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="法人代表姓名" prop="legalPerson">
          <el-input :disabled="!isSubmit" size="small" v-model="entInfo.legalPerson" clearable
                    placeholder="请输入法人代表姓名"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="法人代表身份证号" prop="legalPersonCard">
          <el-input :disabled="!edit" size="small" v-model="entInfo.legalPersonCard" clearable
                    placeholder="请输入法人代表身份证号"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="统一社会信用代码" prop="comid">
          <el-input :disabled="!isSubmit" v-model="entInfo.comid" size="small" maxlength="18"
                    placeholder="请输入统一社会信用代码"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="办公电话" prop="contactPhone">
          <el-input :disabled="!edit" v-model="entInfo.contactPhone" size="small" maxlength="20"
                    placeholder="请输入办公电话"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="企业办公地址" required>
          <el-col style="width: 320px">
            <el-col style="width: 160px">
              <el-form-item prop="province">
                <el-select :disabled="!edit" v-model="entInfo.province" @change="selectProvince" size="small">
                  <el-option v-for="item in _provinces"
                             :key="item.uniqueId"
                             :label="item.addrName"
                             :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="width: 160px">
              <el-form-item prop="city">
                <el-select :disabled="!edit" v-model="city[0]" @change="selectCity" size="small" ref="city">
                  <el-option v-for="item in cities"
                             :key="item.uniqueId"
                             :label="item.addrName"
                             :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="address" label=" ">
          <el-input :disabled="!edit" v-model="entInfo.address" maxlength="32" size="small"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="营业执照" prop="businessLicencePath" v-model="entInfo.businessLicencePath">
          <el-input v-show="false" v-model="entInfo.businessLicencePath"></el-input>
          <img src="../../../assets/images/entImg.png" style="width: 90px; height: 120px; cursor: pointer"
               @click="_showBigImg()"/>
          <section style="display: inline-block">
            <span v-show="edit"
                  class="uploadTip">上传营业执照
              <br>文件所有信息清晰可见,内容真实有效,不得做人为修改
              <br>支持文件格式: pdf,jpg,jpeg,bmp,gif,png 大小不超过2M</span>
            <br/>
            <el-upload :disabled="!edit"
                       v-show="this.$store.getters.getBtnIsShowByName('btn_upload')"
                       ref="upload"
                       :limit="limit"
                       :show-file-list="true"
                       :action="_uploadAddress"
                       :on-success="_uploadSuccess"
                       :on-remove="_fileRemoved"
                       :before-upload="_beforeUpload" style="display: inline-block">
              <el-button v-show="edit" type="success" plain="" size="small">选择文件</el-button>
            </el-upload>
            <span v-show="!edit"
                  style="height: 60px; line-height: 30px; color: #FF2F0F; display: inline-block ;cursor: pointer"
                  @click="_showBigImg">点击查看</span>
          </section>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row v-show="isSubmit" type="flex" justify="center" style="margin-top: 30px">
      <el-button style="width: 120px" size="small" @click="()=> {this.$emit('close')}">取 消</el-button>
      <el-button style="margin-left: 100px;width: 120px" size="small" type="primary" :disabled="isLoading"
                 @click="_submitVerify">添 加
      </el-button>
    </el-row>
    <el-row v-show="!edit" type="flex" justify="center" style="margin-top: 30px">
      <el-button style="width: 120px" size="small" type="primary" :disabled="isLoading" @click="edit = true">编 辑
      </el-button>
    </el-row>
    <el-row v-show="!isSubmit && edit" type="flex" justify="center" style="margin-top: 30px">
      <el-button style="width: 120px" size="small" @click="()=> {this.$emit('close')}">取 消</el-button>
      <el-button style="margin-left: 100px;width: 120px" size="small" type="primary" :disabled="isLoading"
                 @click="_saveVerify">保 存
      </el-button>
    </el-row>
    <el-dialog @click="innerVisible= false"
               width="70%"
               :visible.sync="innerVisible"
               append-to-body>
      <img :src="imageUrl" style="width: 100%" @click="innerVisible= false"/>
    </el-dialog>
  </div>
</template>

<script>
  import * as Api from 'api'
  import * as Validator from 'common/js/validator'
  import {http} from 'api/enterprise'

  export default {
    props: {
      detail: {},
      isEdit: [Boolean],
      isSubmit: [Boolean]
    },
    data() {
      return {
        entInfo: {},
        city: [],
        edit: [Boolean],
        innerVisible: false,
        imageUrl: '',
        isLoading: false,
        limit: 1,
        cities: [],
        rules: {
          cooperateEntName: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            {validator: Validator.validateEntName, trigger: 'blur'}
          ],
          legalPersonCard: [
            {required: true, message: '请输入法人代表身份证号', trigger: 'blur'},
            {validator: Validator.validateIdCard, trigger: 'blur'}
          ],
          businessType: [
            {required: true, message: '请选择业务类型', trigger: 'change'}
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
          address: [
            {required: true, message: '请输入企业地址', trigger: 'blur'}
          ],
          businessLicencePath: {required: true, message: '请上传营业执照', trigger: 'blur'},
          comid: {required: true, message: '输入不能为空', trigger: 'blur'}
        }
      }
    },
    watch: {
      detail: {
        immediate: true,
        handler: function () {
          if (this.isSubmit) {
            setTimeout(() => {
              this.$refs.verifyForm.resetFields()
              this.$refs.upload.clearFiles()
              this.entInfo = {}
              this.city[0] = ''
            }, 50)
          }
          if (!this.isEdit) {
            setTimeout(() => {
              this.$refs.verifyForm.resetFields()
              this.$refs.upload.clearFiles()
              this.entInfo = this.detail
              this.city[0] = this.entInfo.city
            }, 50)
          }
        }
      },
      isEdit: {
        immediate: true,
        handler: function () {
          this.edit = this.isEdit
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
      _submitVerify() {
        this.$refs.verifyForm.validate(v => {
          if (v) {
            this.isLoading = true
            this.$post(this.$url('/sign_add'), this.entInfo).then(response => {
              this.$refs.verifyForm.resetFields()
              this.$refs.upload.clearFiles()
              this.$emit('close')
              this.$message.success(response.msg)
              this.isLoading = false
              this.$emit('doQuery')
            }, err => {
              this.isLoading = false
              this.$message.error(err)
              console.log(err)
            })
          }
        })
      },
      _saveVerify() {
        this.$refs.verifyForm.validate(v => {
          if (v) {
            this.isLoading = true
            this.entInfo.createDate = ''
            this.entInfo.updateDate = ''
            this.$post(this.$url('/sign_update'), this.entInfo).then(response => {
              this.$refs.verifyForm.resetFields()
              this.$refs.upload.clearFiles()
              this.$emit('close')
              this.$message.success(response.msg)
              this.isLoading = false
              this.$emit('doQuery')
            }, err => {
              this.isLoading = false
              this.$message.error(err)
              console.log(err)
            })
          }
        })
      },
      _showBigImg() {
        let url = this.entInfo.businessLicencePath && this.entInfo.businessLicencePath.length > 10
          ? this.entInfo.businessLicencePath
          : ''
        if (url.length > 0) {
          if (url.indexOf('pdf') !== -1) {
            debugger
            window.open(url)
          } else {
            this.innerVisible = true
            this.imageUrl = url
          }
        } else {
          this.innerVisible = true
          debugger
          this.imageUrl = 'http://oss.99payroll.cn/test-images/20181213/99d4b6ad7296022ce3f551aa8e369cf0.png'
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
          this.entInfo.businessLicencePath = res.data.url
        } else {
          this.$message.error('文件上传失败')
        }
        console.log(res.msg)
      },
      _fileRemoved(file) {
        this.entInfo.businessLicencePath = ''
      },
      selectProvince(val) {
        console.log(`选中省份${val}`)
        this.entInfo.province = val.addrName
        Api.getCities({provinceId: val.uniqueId}).then(response => {
          if (response.data.code === Api.ERR_OK) {
            this.cities = response.data.data
            this.entInfo.city = this.cities[0].addrName
            this.city[0] = this.cities[0].addrName
          }
        })
      },
      selectCity(val) {
        console.log(`选中了城市${val}`)
        debugger
        this.entInfo.city = val.addrName
        this.entInfo.addrId = val.uniqueId
        this.city = []
        this.city.push(val.addrName)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-row
    padding-top 0px
    margin-bottom 0px

    .el-input
      width 320px

  .uploadTip
    display inline-block
    line-height 20px
    margin-bottom 20px
</style>
