<template>
  <section id="entAdmin" v-loading="isLoading">
    <el-form :inline="true">
      <el-row type="flex" style="border-top: 1px dashed grey; padding-top:10px;" v-for="item in entAdmins"
              :key="item.adminName">
        <el-col :span="10">角色 : {{item.adminName}}</el-col>
        <el-col :span="10">
          <span>手机号 : </span>
          <el-input style="width: 160px"
                    :disabled="_notHaveUpdateMobile"
                    maxlength="11"
                    v-model="item.mobile" size="small"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button size="mini" v-show="!_notHaveUpdateMobile" type="primary" plain @click="_updateAdminInfo(item)">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>

<script>
  import * as Api from 'api'
  import * as Regex from 'common/js/regex'

  export default {
    props: {
      entId: ''
    },
    watch: {
      'entId': {
        immediate: true,
        handler: function (val) {
          this.entId = val
          this._getEntDetail()
        }
      }
    },
    data() {
      return {
        isEdit: false,
        entAdmins: []
      }
    },
    computed: {
      _notHaveUpdateMobile() {
        return !this.$store.getters.getBtnIsShowByName('btn_ent_admin_mobile')
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
          this.entAdmins = response.data.data.entAdmins
        })
      },
      _updateAdminInfo(item) {
        console.log('更新管理员信息')
        console.log(item)

        if (Regex.regMobile.test(item.mobile) === false) {
          this.$message({
            message: '手机号格式有误',
            type: 'error'
          })
          return
        }

        this.$confirm(`确认更改 < ${item.adminName} > 的手机号?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.updateEntAdminInfo({
            entId: this.entId,
            mobile: item.mobile,
            adminId: item.adminId
          }).then(resp => {
            console.log(resp)
            this.$message({
              type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
              message: resp.data.msg
            })
            if (resp.data.code === Api.ERR_OK) {
              this._cancelEdit()
            }
          })
        }).catch(() => {
        })
      },
      _editSubmit() {
      },
      _cancelEdit() {
        this.$emit('cancelEdit')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-row
    vertical-align center
</style>
