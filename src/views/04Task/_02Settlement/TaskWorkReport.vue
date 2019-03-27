<template>
  <div >
    <h4 v-if="!this.allContent||this.allContent.length==0" style="font-size: 20px;padding-left: 320px ;padding-top: 40px;padding-bottom: 40px">还没有反馈内容哦~</h4>
    <el-form  :model="allContent" v-if="this.allContent&&this.allContent.length!=0"
              :inline="false" class="toobar"
              label-width="140px"
              label-position="left">

      <!--工作中-->
      <div class="report_right" v-for="item,index in this.allContent">
        <!--<progress-circle :radius="radius" :percent="percent"></progress-circle>-->

        <p class="report_time">
          <span>{{item.type|filterTaskWorkReportState()}}</span>
          <span v-if="item.taskFeedback.pCreateDate">{{item.taskFeedback.pCreateDate|filterdateYMDHMS()}}</span>
          <span v-else-if="item.taskFeedback.submitDate">{{item.taskFeedback.submitDate|filterdateYMDHMS}}</span>
          <span v-else="item.taskFeedback.finishDate">{{item.taskFeedback.finishDate|filterdateYMDHMS}}</span>
        </p>
        <div class="form-control" v-if="item.taskFeedback.pContent&&item.type==1" style="border: 1px solid #ddd;width: 80%;height: auto;
              margin-top: 10px;min-height: 50px;background:#fafafa;">{{item.taskFeedback.pContent}}</div><!-- disabled-->

        <div v-if="item.taskFeedback.originalFileName&&item.type==1" style="position: relative;
           padding-bottom: 40px;">
          <p class="download_list attach_file_list" v-for="list,index in item.taskFeedback.originalFileName.split(',')"   @click="downloadFn(item.taskFeedback.pFiles.split(',')[index],list)" >
            <!--<img src="../../../../static/images/file_img.png">-->
            <span id="file_part" class="file_name">{{list}}</span>
            <span class="delete">下载</span>
          </p>
        </div>

        <div class="address_list" v-if="item.taskFeedback.pPlace&&item.type!=3">
          <!--<img src="../../../../static/images/icon_address_orange.png"/>-->

          <span>{{item.taskFeedback.pPlace}}</span>
        </div>

      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as Api from 'api'
  import { ERR_OK } from '../../../api/index'
  export default {
    props: {
      recordId: {}
    },
    watch: {
      recordId: {
        immediate: true,
        handler: function () {
          console.log(this.recordId)
          this.getWorkReport()
          }
        }
      },
    data () {
      return {
        queryModel: {},
        allContent: []
      }
      },
    methods:{
        getWorkReport(){
          this.queryModel.recordId =  this.recordId

          Api.getTaskWorkReport(this.queryModel).then(response => {
            console.log(response)
            this.isLoading = false
            if (response.data.code === ERR_OK) {
              this.allContent = response.data.data
              console.log(this.allContent)
            }
          })
          }
        }
  }

  </script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .el-dialog--center .el-dialog__body {
    padding: 25px 25px 30px;
  }
</style>

