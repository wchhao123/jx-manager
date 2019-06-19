<template>
  <div>
    <el-form ref="entInfo" :model="model"
             :inline="false" class="toobar"
             label-width="80px"
             label-position="left">
      <div style="border-top: 1px black"></div>
      <el-row><h1>任务基本信息</h1></el-row>
      <hr width="500px"/>
      <el-row>
        <el-col>
          <div>任务编号：{{model.taskId}}</div>
          <div>发布企业：{{model.entName}}</div>
          <!--<div>所属行业：{{model.industry}}</div>-->
          <div>任务类型：{{model.industryName+'>'+model.typeName}}</div>
          <div v-if="model.city!=null && model.city!=''">工作地区：{{model.provice+'-'+model.city}}</div>
          <div v-else="model.city==null || model.city ==''">工作地区：{{'不限'}}</div>
        </el-col>
        <el-col>
          <div>任务名称：{{model.taskName}}</div>
          <div>发布昵称：{{model.nickname}}</div>
          <!--<div>任务类型：{{model.type}}</div>-->
          <div>报名状态：{{model.signUpState |  filterTaskSignUpState()}}</div>
          <div>是否在任务广场上显示：{{model.isShow | filterTaskIsShow() }}</div>
        </el-col>
      </el-row>
      <el-row><h1>任务内容</h1></el-row>
      <hr width="500px"/>
      <el-row>
        <el-col>
          <div>任务描述：<pre>{{model.taskDetails}}</pre></div>
          <div v-show="model.taskFeils">附件：</div>
          <a  v-for="(item, index) of model.taskFeils" :key="index" download="download"
             :href="item" target="_blank">
            <div class="download">
              <img src="../../../assets/file_img.png" style="width: 25px; height: 25px;float: left"/>
              <span style="color: #99a9bf ;float: left">{{item | subStringUrl(index, model.originalFilesNames)}}</span>
              <span style="float: right;color: #99a9bf">下载</span>
            </div>
          </a>
          <br/>
          <el-col v-show="model.entTaskAdds" v-for="(item, index) of model.entTaskAdds" :key="index">
            <div>补充内容：<pre>{{item.taskAddtionDetail}}</pre></div>
            <div>任务附件：</div>
            <ul v-if="item.taskDownload">
            <a  v-for="(item1, index1) of item.taskDownload.taskAddtionFile" :key="index1" download="download"
               :href="item1" target="_blank">
              <div class="download">
                <img src="../../../assets/file_img.png" style="width: 25px; height: 25px;float: left"/>
                <span style="color: #99a9bf ;float: left">{{item1 | subStringUrl(index1, item.taskDownload.originalFileNamesAdd)}}</span>
                <span style="float: right;color: #99a9bf">下载</span>
              </div>
            </a>
            </ul>
          </el-col>
        </el-col>
      </el-row>
      <el-row><h1>预算和时间</h1></el-row>
      <hr width="500px"/>
      <el-row>
        <el-col>
          <div>报名截止时间：{{model.abortTime | filterDateYYYYMMDD()}}</div>
          <div>任务单价：{{model.taskMinUnit}}-{{model.taskMaxUnit}}</div>
        </el-col>
        <el-col>
          <div>任务总预算（元）：{{model.taskAmount}}</div>
          <div>需要人数：{{model.peopleCount}}</div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      detail: {}
    },
    data() {
      return {
        taskDownload: [],
        model: {
          taskFeils:{},
          originalFilesNames:{}
        },
        isbigimg: false,
        innerVisible: false,
        imageUrl: '',
        isShowArr: {
          0: '否',
          1: '是',
        },

      }
    },
    watch: {
      detail: {
        immediate: true,
        handler: function () {

          this.taskDownload = []

          if (this.detail.entTaskAdds) {
            this.detail.entTaskAdds.forEach((item, index, arr) => {

              if (item.taskAddtionFile && item.originalFileNamesAdd) {
                let object = {};
                if(item.taskAddtionFile !=null)
                object.taskAddtionFile = item.taskAddtionFile.split(',')
                if(item.originalFileNamesAdd !=null)
                object.originalFileNamesAdd = item.originalFileNamesAdd.split(',')
                item.taskDownload = object
                Vue.set(this.detail.entTaskAdds, index, item)
               // this.model.entTaskAdds.taskDownload = item.taskDownload
              }

            })
          }
          console.log(this.detail)
          this.model = this.detail
          if (this.detail.originalFileNames && this.detail.taskFile) {

            this.model.taskFeils = this.detail.taskFile.split(',')

            this.model.originalFilesNames = this.detail.originalFileNames.split(',')
          }

          console.log(this.model)

        }
      }
    },
    filters: {
      subStringUrl: function (key, index, name) {
        console.log(key+name)
        if (!key) {
          return ''
        }
        if(name ==null){
          return ''
        }
        let array = key.split('.')
        if (array.length > 0) {
          return name[index]
        }
      }
    },
    computed: {},
    beforeUpdate() {
      this.isbigimg = false
    },
    methods: {}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  h1 {
    font-size 20px
  }

  div {
    font-size 15px
    margin-bottom 5px
  }

  span {
    display inline-flex
  }

  .download {
    background-color: #d3dce6
    width 390px
    height 25px
    margin-bottom 5px
    margin-left 60px
    line-height 25px
    cursor: pointer
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-left 60px
    margin-right 60px
  }
</style>
