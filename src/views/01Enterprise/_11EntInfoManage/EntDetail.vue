<template>
  <section id="entDetail" v-loading="isLoading">
    <el-form ref="entInfoForm" :model="entInfo" :rules="rules" label-position="left" :inline="true" label-width="140px">
      <h3 style="margin: 5px auto; border-top: 1px dashed grey">企业基本信息</h3>
      <el-row>
        <el-form-item label="企业名称:" prop="entName">
          <el-input v-model="entInfo.entName" :disabled="disable4Verifying" size="small"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="企业昵称:" prop="entNickName">
          <el-input v-model="entInfo.entNickName" :disabled="disableBaseInfo" size="small"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="企业办公地址:" required>
          <el-col :span="4">
            <el-form-item prop="province">
              <el-select :disabled="disable4Verifying" v-model="entInfo.province" @change="selectProvince" size="small">
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
              <el-select :disabled="disable4Verifying" v-model="entInfo.city" @change="selectCity" size="small">
                <el-option v-for="item in cities"
                           :key="item.uniqueId"
                           :label="item.addrName"
                           :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="address">
              <el-input v-model="entInfo.address"  maxlength="32" :disabled="disable4Verifying" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系人:">
          <el-input v-model="entInfo.contactName" :disabled="disableBaseInfo" size="small"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="办公电话:">
          <el-input v-model="entInfo.contactPhone" :disabled="disableBaseInfo" size="small" maxlength="20"></el-input>
        </el-form-item>
      </el-row>
      <el-row v-show="entInfo.saleName">
        <el-form-item label="销售代表:">
          <el-input :disabled="true" v-model="entInfo.saleName" size="small" maxlength="20"></el-input>
        </el-form-item>
      </el-row>
      <section v-show="entInfo.verifyState === '3'">
        <h3 style="margin: 5px auto; border-top: 1px dashed grey">企业认证信息</h3>

        <el-row>
          <el-form-item label="法人代表姓名:">
            <el-input v-model="entInfo.verifyInfo.legalPerson" disabled size="small"></el-input>
          </el-form-item>
        </el-row>

<!--        <el-row>
          <el-form-item label="法人代表身份证号码:">
            <el-input v-model="entInfo.verifyInfo.legalPersonCard" disabled size="small"></el-input>
          </el-form-item>
        </el-row>-->

        <el-row>
          <el-form-item label="统一社会信用代码:">
            <el-input v-model="entInfo.verifyInfo.comid" disabled size="small"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="证件类型">
            <el-radio-group v-model="entInfo.verifyInfo.documentType" disabled>
              <el-radio label="1">多证合一营业执照(原注册号字样,调整为18为统一的社会信用代码)</el-radio>
              <br>
              <el-radio style="margin-top: 10px" label="2">普通营业执照(仍然标示为15位的'注册号')</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="营业执照">
            <section style="display: inline-block;">
              <img src="../../../assets/images/entImg.png" style="width: 80px; height: 100px; cursor: pointer" @click="_showBigImg()"/>
            </section>
            <span style="height: 60px; line-height: 30px; color: #FF2F0F; cursor: pointer; display: inline-block" @click="_showBigImg()">点击查看</span>
          </el-form-item>
        </el-row>
      </section>

      <section v-show="entInfo.entAdmins.length>0">
        <h4 style="border-top: 1px dashed grey;margin: 5px auto">企业管理员</h4>
        <el-row v-for="item in entInfo.entAdmins" :key="item.adminName">
          <el-col :span="10">
            <el-form-item label="角色:" labelWidth="80">
              {{item.adminName}}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机号:" required>
              <el-input v-model="item.mobile" disabled size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </section>

      <el-row style="border-top: 1px dashed grey">
          <h4 style="margin: 5px auto">银行卡信息</h4>
        </el-row>
      <el-table border stripe :data="entInfo.entBankcardInfs" style="width: 100%;" align="center">
          <el-table-column show-overflow-tooltip align="center" :span="6"
                           prop="bankAccountName" label="银行账户名">
            <template slot-scope="scope">
              <el-input v-if="scope.row.keyId != ''" disabled v-model="scope.row.bankAccountName"
                        size="small"></el-input>
              <el-input v-else v-model="scope.row.bankAccountName" size="small"></el-input>
            </template>
          </el-table-column>
      <el-table-column show-overflow-tooltip align="center" :span="6"
                       prop="bankName" label="银行开户行">
        <template slot-scope="scope">
          <el-input v-if="scope.row.keyId != ''" disabled v-model="scope.row.bankName"
                    size="small"></el-input>
          <el-select v-model="scope.row.bankName" placeholder="请选择开户行"
                     filterable v-else clearable auto-complete="off" size="small">
            <el-option
              v-for="item in bankNameList"
              :key="item.key"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" :span="6"
                       prop="bankBranch" label="开户支行">

        <template slot-scope="scope">
          <el-input size="small" v-if="scope.row.keyId != ''" disabled
                    v-model="scope.row.bankBranch"></el-input>
          <el-input size="small" v-else v-model="scope.row.bankBranch"></el-input>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" :span="6"
                       prop="bankcardNo" label="银行账号">
        <template slot-scope="scope">
          <el-input size="small" v-if="scope.row.keyId != ''" disabled
                    v-model="scope.row.bankcardNo"></el-input>
          <el-input size="small" v-else v-model="scope.row.bankcardNo"></el-input>
        </template>
      </el-table-column>
      </el-table>
    </el-form>

    <el-row style="padding-top: 10px" type="flex" justify="center">
      <el-button v-show="!isEdit && this.$store.getters.getBtnIsShowByName('btn_ent_edit')" type="primary" size="small" @click="_openEdit">编辑企业基本信息</el-button>
      <el-button v-show="isEdit" size="small" @click="cancelEdit">取消</el-button>
      <el-button v-show="isEdit" type="primary" size="small" @click.native="editSubmit">保存</el-button>
    </el-row>
  </section>

</template>

<script type="text/ecmascript-6">
  import * as Api from 'api'
  import * as Regex from 'common/js/regex'
  import {entBankName} from 'common/js/state-dic'
  import * as Validator from 'common/js/validator'

  export default {
    props: {
      edit: {
        type: Boolean,
        default: false
      },
      isEdit: [Boolean, String],
      entId: String,
      timestamp: String
    },
    data() {
      var validatePersonCard = (rule, value, callback) => {
        value = this.entInfo.verifyInfo.legalPersonCard
        if (!value) {
          return callback(new Error('身份证号不能为空'))
        } else {
          setTimeout(() => {
            if (Regex.regIDCard.test(value) === false) {
              callback(new Error('身份证输入不合法'))
            } else {
              callback()
            }
          }, 200)
        }
      }
      var validateEntNickName = (rule, value, callback) => {
        value = this.entInfo.entNickName
        return Validator.validateEntName(rule, value, callback)
        // if (!value) {
        //   return callback(new Error('企业昵称不能为空'))
        // } else {
        //   setTimeout(() => {
        //     if (Regex.regEn.test(value) || Regex.regCn.test(value)) {
        //       callback(new Error('不能包含非法字符'))
        //     } else {
        //       callback()
        //     }
        //   }, 200)
        // }
      }
      var validateLegalPerson = (rule, value, callback) => {
        value = this.entInfo.verifyInfo.legalPerson
        if (!value) {
          return callback(new Error('法人代表姓名不能为空'))
        } else {
          setTimeout(() => {
            if (Regex.regEn.test(value) || Regex.regCn.test(value)) {
              callback(new Error('不能包含非法字符'))
            } else {
              callback()
            }
          }, 200)
        }
      }
      var validateComid = (rule, value, callback) => {
        value = this.entInfo.verifyInfo.comid
        if (!value) {
          return callback(new Error('请输入统一社会信用代码'))
        } else {
          setTimeout(() => {
            if (Regex.regEn.test(value) || Regex.regCn.test(value)) {
              callback(new Error('不能包含非法字符'))
            } else {
              callback()
            }
          }, 200)
        }
      }
      return {
        isLoading: false,
        cities: [],
        isbigimg: false,
        entInfo: {
          entName: '',
          address: '',
          contactName: '',
          contactPhone: '',
          mobile: '',
          verifyInfo: {
            legalPersonCard: ''
          },
          entAdmins: [],
          entBankcardInfs: [{
            'keyId': '',
            'bankName': '',
            'bankAccountName': '',
            'bankBranch': '',
            'entId': '',
            'bankcardNo': ''
          }]
        },
        entInfoOld: {},
        rules: {
          entName: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            {validator: Validator.validateEntName, trigger: 'blur'}
          ],
          entNickName: [
            {required: true, message: '请输入企业昵称', trigger: 'blur'},
            {validator: validateEntNickName, trigger: 'blur'}
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'change'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          /*legalPersonCard: [
            {required: true, validator: validatePersonCard, trigger: 'blur'}
          ],*/
          address: [
            {required: true, message: '请输入企业地址', trigger: 'blur'}
          ],
          legalPerson: [
            {required: true, validator: validateLegalPerson, trigger: 'blur'}
          ],
          comid: [
            {required: true, validator: validateComid, trigger: 'blur'}
          ]
        },
        style: {
          inputspan: 14
        },
        deleteBankCardList: []
      }
    },
    watch: {
      timestamp(val) {
        this.$refs['entInfoForm'].resetFields()
        this._getEntDetail()
      }
    },
    computed: {
      _provinces() {
        let provinces = this.$store.getters.provinces
        console.log(provinces)
        return provinces
      },
      disable4Verifying() {
        if (!this.isEdit) {
          return true
        } else {
          //  认证中  已认证状态 不能修改
          if (this.entInfo.verifyState === '3' || this.entInfo.verifyState === '1') {
            return true
          } else {
            return false
          }
        }
      },
      disableBaseInfo() {
        return !this.isEdit
      },
      bankCardRealCount() {
        return this.entInfo.entBankcardInfs.length - 1
      },
      bankNameList() {
        return entBankName()
      }
    },
    created() {
      this._getEntDetail()
    },
    methods: {
      selectProvince(val) {
        debugger
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
        debugger
        console.log(`选中了城市${val}`)
        this.entInfo.city = val.addrName
      },
      cancelEdit() {
        console.log('取消编辑')
        this.isLoading = false
        this.$emit('cancelEdit')
      },
      _openEdit() {
        this.isEdit = true
      },
      editSubmit() {
        console.log('提交编辑')
        console.log(this.entInfo)
        console.log(this.entInfoOld)

        this.$refs['entInfoForm'].validate((valid) => {
          if (valid) {
            this.isLoading = true
            // 更新企业信息
            Api.updateEntBaseInfo({
              entId: this.entInfo.entId,
              entName: this.entInfo.entName,
              contactPhone: this.entInfo.contactPhone,
              contactName: this.entInfo.contactName,
              city: this.entInfo.city,
              province: this.entInfo.province,
              address: this.entInfo.address,
              entNickName: this.entInfo.entNickName
            }).then(response => {
              this.isLoading = false
              this.$message({
                message: response.data.msg,
                type: response.data.code === '0000' ? 'success' : 'error'
              })
              // 更新成功关闭页面
              if (response.data.code === '0000') {
                this.$emit('cancelEdit')
              }
            })
          }
        })
      },
      _showBigImg() {
        window.open(this.entInfo.verifyInfo.businessLicencePath)
      },
      _getEntDetail(val) {
        if (val === '') {
          return
        }
        this.isLoading = true
        Api.getEntDetail({entId: this.entId}).then(response => {
          console.log('查询企业详情!')
          this.isLoading = false
          this.entInfo = response.data.data
          this.entInfoOld = JSON.parse(JSON.stringify(this.entInfo))
        })
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
</style>
