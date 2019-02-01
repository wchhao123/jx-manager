<template>
  <div class="customDialog">
    <el-form ref="entInfo" :model="model" v-if="detail" v-loading="isLoading" class="toobar" label-position="left">
      <el-row>
        <el-form-item label="用户姓名 :">
          <span v-text="model.userName"></span>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="国籍(地区) :" >
          <span v-text="model.nationality"></span>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="证件类型 :" >
          <span>{{model.idType | filterUserIdNumType}}</span>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="证件号码 :" >
          <span v-text="model.idNumber"></span>
      </el-form-item>
      </el-row>
      <el-row v-show="model.idType !=='1'">
      <el-form-item label="证件照片 :" v-show="model.pictureFrontURL || model.pictureBinhendURL">
        <img ref="img1" style="width: 50px; height: 50px; cursor: pointer"
             :src="model.pictureFrontURL" v-show="model.pictureFrontURL"
             @click="showBigImg(model.pictureFrontURL)">
        <img ref="img2" style="width: 50px; height: 50px;  cursor: pointer" v-show="model.pictureBinhendURL && model.idType != '2'"
             :src="model.pictureBinhendURL"
             @click="showBigImg(model.pictureBinhendURL)">
      </el-form-item>
      </el-row>
      <el-row v-show="!isShowBigImg && detail.verifyState === '0'" style="margin-top: 40px">
        <el-col :span="12" align="center">
          <el-button size="mini" @click="_doVerifyAuth(3)">拒绝</el-button>
        </el-col>
        <el-col :span="12" align="center">
          <el-button size="mini" type="primary" @click.native="_doVerifyAuth(1)">同意</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as Api from 'api'
  import { ERR_OK } from '../../../api/index'

  export default {
    props: {
      detail: {},
      type: ''
    },
    data () {
      return {
        isLoading: false,
        style: {
          inputspan: 14
        },
        model: {
        },
        isShowBigImg: false,
        selectImg: ''
      }
    },
    computed: {
    },
    watch: {
      'detail': {
        immediate: true,
        handler: function (val) {
          this.detail = val
          setTimeout(() => {
            this._doQuery()
            this.showSmallImg()
          }, 50)
        }
      }
    },
    methods: {
      _doQuery() {
        this.isLoading = true
        Api.getUserVerifyDetail({
          userId: this.detail.userId
        }).then(resp => {
          this.isLoading = false
          if (resp.data.code === ERR_OK) {
            this.model = resp.data.data
          } else {
            this.model = null
          }
        })
      },
      _doVerifyAuth (state) {
        if (state === 3) {
          this.$prompt('', {
            confirmButtonText: '确定',
            inputPlaceholder: '请输入拒绝原因(50字以内)',
            cancelButtonText: '取消',
            inputPattern: /[^\/\\:\*"<>\|]/,
            inputErrorMessage: '输入不合法'
          }).then(({ value }) => {
            this.model.refuseReason = value
            this.submitVerifyAuth(state)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '操作已取消'
            })
          })
        } else {
          this.submitVerifyAuth(state)
        }
      },
      submitVerifyAuth(state) {
        Api.doUserRealNameVerify({
          userId: this.detail.userId,
          verifyState: state,
          refuseReason: this.model.refuseReason
        }).then(resp => {
          this.$message({
            type: resp.data.code === ERR_OK ? 'success' : 'error',
            message: resp.data.msg
          })
          if (resp.data.code === ERR_OK) {
            this.$emit('cancelEdit')
          }
        })
      },
      showBigImg(img) {
        window.open(img)
      }
    },
    components: {
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
      border-bottom 1px dashed gray
    }
    .el-form-item {
      width: 50%;
      height: 20px
      margin-bottom 10px
    }

    .el-form-item__label {
      width: 30%;
    }

  .el-col
    span
      font-size 14px
</style>
