<template>
  <section id="entBankCard" v-loading="isLoading">
    <el-table border stripe :data="entBankcardInfs" style="width: 100%;"
              align="center"  @cell-click="_cellClick" @row-click="_rowClick">
      <el-table-column   align="center" :span="4"
                       prop="bankAccountName" label="银行账户名">
        <template slot-scope="scope">
          <el-input v-if="scope.row.keyId != ''" :disabled="scope.row.keyId!==''" v-model="scope.row.bankAccountName"
                    size="small"></el-input>
          <el-input v-else v-model="scope.row.bankAccountName" size="small"></el-input>
        </template>
      </el-table-column>

      <el-table-column   align="center" :span="4"
                       prop="bankName" label="银行开户行">
        <template slot-scope="scope">
          <el-input v-if="scope.row.keyId != ''" :disabled="scope.row.keyId!==''" v-model="scope.row.bankName"
                    size="small"></el-input>
          <el-select v-model="scope.row.bankName" placeholder="请选择开户行"
                     filterable v-else clearable auto-complete="off" size="small">
            <el-option
              v-for="item in _bankNameList"
              :key="item.key"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column   align="center" :span="4"
                       prop="bankBranch" label="开户支行">

        <template slot-scope="scope">
          <el-input size="small" v-if="scope.row.keyId != ''"
                    :disabled="scope.row.keyId!==''"
                    v-model="scope.row.bankBranch"></el-input>
          <el-input size="small" v-else v-model="scope.row.bankBranch"></el-input>
        </template>
      </el-table-column>

      <el-table-column   align="center" :span="4"
                       prop="bankcardNo" label="银行账号">
        <template slot-scope="scope">
          <el-input size="small" maxlength="18" v-if="scope.row.keyId != ''"
                    :disabled="scope.row.keyId!==''"
                    v-model="scope.row.bankcardNo"></el-input>
          <el-input size="small" v-else v-model="scope.row.bankcardNo"></el-input>
        </template>
      </el-table-column>

      <el-table-column   align="center"
                       :span="8" width="480"
                        label="开户地区">
        <template slot-scope="scope">
          <el-select v-model="scope.row.province" @change="selectProvince(scope.$index,scope.row.province)"
                     :disabled="scope.row.keyId!==''"
                     size="mini">
            <el-option v-for="item in _provinces"
                       :key="item.uniqueId"
                       :label="item.addrName"
                       :value="item"
            >
            </el-option>
          </el-select>
          <el-select v-model="scope.row.city" @change="selectCity(scope.$index,scope.row.city)"
                     :disabled="scope.row.keyId!==''"
                     size="mini">
            <el-option v-for="item in cities"
                       :key="item.uniqueId"
                       :label="item.addrName"
                       :value="item"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150" v-if="isEdit" align="center">
        <template slot-scope="scope">
          <el-button v-show="scope.row.keyId===''"
                     type="primary" size="mini" plain
                     @click="_addBankCard(scope.row)">保存
          </el-button>
          <el-button @click.native.prevent="_deleteBankCard(scope.$index, scope.row)" type="danger" size="mini" plain>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="padding-top: 10px" type="flex" justify="end">
      <el-button size="small"
                 v-show="this.$store.getters.getBtnIsShowByName('btn_card_edit')"
                 @click="()=>{this.isEdit = true; _addEmptyBankCard();}">{{this.btnTitle}}
      </el-button>
    </el-row>
  </section>
</template>

<script>
  import * as Api from 'api'
  import {entBankName} from 'common/js/state-dic'
  import * as Regex from 'common/js/regex'

  export default {
    props: {
      entId: ''
    },
    data() {
      return {
        isEdit: false,
        entInfo: {},
        cities: [],
        currentRow: {},
        entBankcardInfs: [],
        btnTitle: '编辑银行卡'
      }
    },
    watch: {
      'entId': {
        immediate: true,
        handler: function (val) {
          this.entId = val
          this.isEdit = false
          this.btnTitle = '编辑银行卡'
          this._getEntDetail()
        }
      }
    },
    computed: {
      _provinces() {
        let provinces = this.$store.getters.provinces
        return JSON.parse(JSON.stringify(provinces))
      },
      _bankNameList() {
        return entBankName()
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
          this.entInfo = response.data.data
          this.entBankcardInfs = response.data.data.entBankcardInfs
          if (response.data.data.entBankcardInfs.length === 0) {
            this.btnTitle = '新增银行卡'
          }
        })
      },
      _rowClick(row, event, column) {
        this.currentRow = row
      },
      _cellClick(row, column, cell, event) {
        this.currentRow = row
      },
      _addBankCard(card) {
        // 校验银行卡
        if (!card.bankAccountName) {
          this._warning('银行卡账户名输入有误')
          return
        }
        if (!card.bankName) {
          this._warning('请选择开户行')
          return
        }
        debugger
        let r = Regex.regBankCard.test(card.bankcardNo)
        if (!r) {
          this._warning('银行卡号输入有误')
          return
        }
        Api.addEntBankCard(
          {
            'entId': this.entId,
            'bankAccountName': card.bankAccountName,
            'bankcardNo': card.bankcardNo,
            'bankName': card.bankName,
            'bankBranch': card.bankBranch,
            'province': card.province,
            'city': card.city
          }
        ).then(resp => {
          this.$message({
            message: resp.data.msg,
            type: resp.data.code === '0000' ? 'success' : 'error'
          })
          if (resp.data.code === Api.ERR_OK) {
            this._getEntDetail()
            this._addEmptyBankCard()
            this.$emit('cancelEdit')
          }
        })
      },
      selectProvince(index, val) {
        debugger
        this.entBankcardInfs[index].province = val.addrName
        this.currentRow.province = val.addrName
        Api.getCities({provinceId: val.uniqueId}).then(response => {
          if (response.data.code === Api.ERR_OK) {
            this.cities = response.data.data
            this.entBankcardInfs[index].city = this.cities[0].addrName
            this.currentRow.city = this.cities[0].addrName
          }
        })
      },
      selectCity(index, val) {
        debugger
        this.entBankcardInfs[index].city = val.addrName
        this.entBankcardInfs.splice(index, 1, this.entBankcardInfs[index])
        this.set(this, 'entBankcardInfs', this.entBankcardInfs)
        this.currentRow.city = val.addrName
        this.entInfo.city = val.addrName
        this.entInfo.addrId = val.uniqueId
      },
      _deleteBankCard(index, card) {
        console.log('删除银行卡' + index)
        console.log(card)
        if (card.keyId === '') {
          this.entBankcardInfs.splice(index, 1)
          return
        }

        this.$confirm(`确认删除 < ${card.bankcardNo} > 银行卡?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.deleteEntBankCard({keyId: card.keyId, entId: this.entId}).then(response => {
            this.$message({
              message: response.data.msg,
              type: response.data.code === '0000' ? 'success' : 'error'
            })
            if (response.data.code === '0000') {
              this.$emit('cancelEdit')
            }
          })
          this.entBankcardInfs.splice(index, 1)
        }).catch(() => {
        })
      },
      _addEmptyBankCard() {
        this.btnTitle = '添加银行卡'
        if (this.entInfo.verifyState !== '3') {
          this.$message.warning('您的企业未通过认证暂不能添加对公账户')
          return
        }
        if (this.entBankcardInfs.length < 6) {
          this.entBankcardInfs.push({
            'keyId': ''
          })
        } else {
          this.$message.warning('银行卡数量不能超过六个!')
        }
      },
      _warning(msg) {
        this.$message({
          message: msg,
          type: 'error'
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
