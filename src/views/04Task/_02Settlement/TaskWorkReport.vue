<template>
  <div  >
    <div class="modal-dialog">
     <div class="modal-content">
    <h4 v-if="!this.allContent||this.allContent.length==0" style="font-size: 20px;padding-left: 320px ;padding-top: 40px;padding-bottom: 40px">还没有反馈内容哦~</h4>
      <div class="modal-body form-horizontal">
        <div class="modal_main_content modal_margin" style="overflow: auto">
    <el-form  :model="allContent" v-if="this.allContent&&this.allContent.length!=0"
              :inline="false" class="toobar"
              label-width="140px"
              label-position="left"
    style="overflow: auto">

      <!--工作中-->
      <div class="report_right" v-for="item,index in this.allContent" style="padding-left: 12%; padding-bottom: 40px;
    position: relative;overflow: scroll">
        <!--<progress-circle :radius="radius" :percent="percent"></progress-circle>-->

        <p class="report_time">
          <span>{{item.type|filterTaskWorkReportState()}}</span>
          <span v-if="item.taskFeedback.pCreateDate">{{item.taskFeedback.pCreateDate| filterdateYMDHMS()}}</span>
          <span v-else-if="item.taskFeedback.submitDate">{{item.taskFeedback.submitDate| filterdateYMDHMS()}}</span>
          <span v-else="item.taskFeedback.finishDate">{{item.taskFeedback.finishDate| filterdateYMDHMS()}}</span>
        </p>
        <div class="form-control" v-if="item.taskFeedback.pContent&&item.type==1" style="border: 1px solid #ddd;width: 80%;height: auto;
              margin-top: 10px;min-height: 50px;background:#fafafa;">{{item.taskFeedback.pContent}}</div><!-- disabled-->

        <div v-if="item.taskFeedback.originalFileName&&item.type==1" style="position: relative;
           padding-bottom: 5px;">
          <p class="download_list attach_file_list" v-for="list,index in item.taskFeedback.originalFileName.split(',')"   @click="downloadFn(item.taskFeedback.pFiles.split(',')[index],list)" >
            <img src="../../../assets/images/file_img.png">
            <span id="file_part" class="file_name">{{list}}</span>
            <span class="delete">下载</span>
          </p>
        </div>

        <div class="address_list" v-if="item.taskFeedback.pPlace&&item.type!=3">
          <img src="../../../assets/images/icon_address_orange.png">

          <span>{{item.taskFeedback.pPlace}}</span>
        </div>
      </div>
    </el-form>
  </div>
     </div>
     </div>
    </div>
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
        allContent: [],
        activities: [{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }]
      }
      },
    methods:{
      downloadFn (val,list){
        console.log(val,list)
         let objectUrl = URL.createObjectURL(new Blob([val]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = objectUrl
          link.setAttribute('download',list)
          document.body.appendChild(link)
          link.click()
           URL.revokeObjectURL(link.href)
      },
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
    .report_right:last-child .report_time span:first-child {
      color: #eb612a;
    }
    img {
      width: 20px;
    }
    .download_list {
      display: inline-block;
      background: #f6f7f8;
      padding: 10px;
      margin-right: 10px;
      width: 80%;
    }
    .address_list, .download_list {
      margin-top: 15px;
    }
    .attach_file_list .delete {
       color: #bbb;
       vertical-align: middle;
       padding: 0 5px;
       cursor: pointer;
       position: absolute;
       right: 100px;
     }
</style>

<!--<div class="modal fade" tabindex="-1" id="workProgressReport" aria-labelledby="work_progress_report" aria-hidden="true" data-backdrop="static">-->
  <!--<div class="modal-dialog">-->
    <!--<div class="modal-content">-->
      <!--<div class="modal-header">-->

        <!--<button  type="button" class="modal_close close" data-dismiss="modal" aria-hidden="true" @click="clearBar"><span></span><双击查看原图tton>-->
          <!--<h4 class="modal-title" id="work_progress_report">工作进展汇报</h4>-->
      <!--</div>-->

      <!--&lt;!&ndash; body&ndash;&gt;-->
      <!--<div class="modal-body form-horizontal">-->
        <!--<div class="modal_main_content modal_margin">-->

          <!--<h4 v-if="!allContent||allContent.length==0">还没有反馈内容哦~</h4>-->

          <!--<div class="report_progress_plate">  &lt;!&ndash;添加 gray_radius ，进度圆点最后一个就变对勾，其他全灰&ndash;&gt;-->

            <!--&lt;!&ndash;工作中&ndash;&gt;-->
            <!--<div class="report_right" v-for="item,index in allContent">-->
              <!--<div class="progress_radius"></div>-->

              <!--<p class="report_time">-->
                <!--<span>{{item.type|workState}}</span>-->
                <!--<span v-if="item.taskFeedback.pCreateDate">{{item.taskFeedback["pCreateDate"]|time}}</span>-->
                <!--<span v-else-if="item.taskFeedback.submitDate">{{item.taskFeedback["submitDate"]|time}}</span>-->
                <!--<span v-else="item.taskFeedback.finishDate">{{item.taskFeedback["finishDate"]|time}}</span>-->
              <!--</p>-->
              <!--<div class="form-control" v-if="item.taskFeedback.pContent&&item.type==1" >{{item.taskFeedback["pContent"]}}</div>&lt;!&ndash; disabled&ndash;&gt;-->

              <!--<div v-if="item.taskFeedback.originalFileName&&item.type==1">-->
                <!--<p class="download_list attach_file_list" v-for="list,index in item.taskFeedback.originalFileName.split(',')"   @click="downloadFn(item.taskFeedback.pFiles.split(',')[index],list)" >-->
                  <!--<img src="../../../../static/images/file_img.png">-->
                  <!--<span id="file_part" class="file_name">{{list}}</span>-->
                  <!--<span class="delete">下载</span>-->
                <!--</p>-->
              <!--</div>-->

              <!--<div class="address_list" v-if="item.taskFeedback.pPlace&&item.type!=3">-->
                <!--<img src="../../../../static/images/icon_address_orange.png"/>-->

                <!--<span>{{item.taskFeedback["pPlace"]}}</span>-->
              <!--</div>-->

            <!--</div>-->

          <!--</div>-->

        <!--</div>-->


      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</div>-->
