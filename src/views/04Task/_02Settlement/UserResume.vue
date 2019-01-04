<template>
  <div>
    <el-form ref="entInfo" :model="detail" v-if="detail"
             :rules="rules"
             :inline="false" class="toobar"
             label-width="80px"
             label-position="left">
      <div style="border-top: 1px dashed gray"></div>
      <el-row>
        <el-form-item  label="姓名 :">
          <span v-text="detail.userName"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="手机号 :">
          <span v-text="detail.mobile"></span>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="技能标签 :">
          <el-tag type="warning" style="margin-left: 10px"
                  v-for="tag in detail.labels"
                   :key="tag">
            {{tag}}
          </el-tag>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="自我介绍 :">
          <span v-text="detail.introduce"></span>
        </el-form-item>
      </el-row>
<!--
      <el-row>
        <el-form-item style="width: 200px;float: left" label="身份证照片 :" v-show="detail.pictureFrontUrl">
          <section style="display: inline-block;">
            <img ref="entImg" style="width: 50px; height: 50px; cursor: pointer" :src="detail.pictureFrontUrl"
                 @click="showEntImg1">
          </section>
          <span style="height: 60px; line-height: 30px; color: #FF2F0F; display: inline-block" @click="showEntImg1">点击查看</span>
        </el-form-item>
        <el-form-item style="width: 200px;float: left" v-show="detail.pictureBinhendUrl">
          <section style="display: inline-block;">
            <img ref="entImg" style="width: 50px; height: 50px; cursor: pointer" :src="detail.pictureBinhendUrl"
                 @click="showEntImg2">
          </section>
          <span style="height: 60px; line-height: 30px; color: #FF2F0F; display: inline-block" @click="showEntImg2">点击查看</span>
        </el-form-item>
      </el-row>
-->
    </el-form>
    <el-dialog
      width="70%"
      :visible.sync="innerVisible"
      append-to-body>
      <img :src="imageUrl" style="width: 100%" @click="innerVisible= false"/>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      isAudit: {
        type: Boolean,
        default: false
      },
      detail: {
      },
      isEdit: true,
      rules: {}
    },
    data() {
      return {
        style: {
          inputspan: 14
        },
        model: {},
        isbigimg: false,
        innerVisible: false,
        imageUrl: ''
      }
    },
    computed: {
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
      showEntImg1() {
        console.log('你点击了图片')
        //window.open(this.detail.pictureFrontUrl)
        this.innerVisible = true
        this.imageUrl = this.detail.pictureFrontUrl
      },
      showEntImg2() {
        console.log('你点击了图片')
        //window.open(this.detail.pictureBinhendUrl)
        this.innerVisible = true
        this.imageUrl = this.detail.pictureBinhendUrl
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-row
    margin-left 100px
    padding-top 0px
    margin-bottom 0px
</style>
