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
          <div>所属行业：{{model.industry}}</div>
        </el-col>
        <el-col>
          <div>任务名称：{{model.taskName}}</div>
          <div>发布昵称：{{model.nickname}}</div>
          <div>任务类型：{{model.type}}</div>
        </el-col>
      </el-row>
      <el-row><h1>任务内容</h1></el-row>
      <hr width="500px"/>
      <el-row>
        <el-col>
          <div style="width: 800px">任务描述：{{model.taskDetails}}</div>
          <div v-show="model.taskFile">附件：</div>
          <a v-show="model.taskFile" v-for="(item, index) of model.taskFile" :key="index" download="download"
             :href="item">
            <div class="download">
              <img src="../../../assets/file_img.png" style="width: 25px; height: 25px;float: left"/>
              <span style="color: #99a9bf ;float: left">{{item | subStringUrl(index, model.originalFileNames)}}</span>
              <span style="float: right;color: #99a9bf">下载</span>
            </div>
          </a>
          <br/>
          <el-col v-show="model.entTaskAdds" v-for="(item, index) of model.entTaskAdds" :key="index">
            <div>补充内容：{{item.taskAddtionDetail}}</div>
            <div>任务附件：</div>
              <a download="download"
                         :href="item.taskAddtionFile">
              <div class="download"><img src="../../../assets/file_img.png"
                                         style="width: 25px; height: 25px;float: left"/>
                <span style="color: #99a9bf ;float: left">{{item.originalFileNamesAdd}}</span><span
                  style="float: right;color: #99a9bf">下载</span>
              </div>
            </a>
          </el-col>
        </el-col>
      </el-row>
      <el-row><h1>预算和时间</h1></el-row>
      <hr width="500px"/>
      <el-row>
        <el-col>
          <div>报名截止时间：{{model.abortTime | filterdateYMDHMS()}}</div>
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
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    props: {
      detail: {}
    },
    data() {
      return {
        model: {},
        isbigimg: false,
        innerVisible: false,
        imageUrl: ''
      }
    },
    watch: {
      detail: {
        immediate: true,
        handler: function () {
          debugger
          this.model = this.detail
          if (this.detail && this.detail.taskFile) {
            debugger
            this.model.taskFile = this.detail.taskFile.split(',')
            this.model.originalFileNames = this.detail.originalFileNames.split(',')
          }
        }
      }
    },
    filters: {
      subStringUrl: function (key, index, name) {
        if (!key) {
          return ''
        }
        debugger
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
  }

  span {
    display inline-flex
  }

  .download {
    background-color: #d3dce6
    width 390px
    height 25px
    margin-bottom 4px
    line-height 25px
    cursor: pointer
  }
</style>
