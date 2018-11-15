<template>
  <div style="background:#f0f2f5;height:100%;overflow: hidden">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="../assets/404.png" alt="404">
        <img class="pic-404__child left" src="../assets/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="../assets/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="../assets/404_cloud.png" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info">版权所有——嘉福</div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <a href="/" class="bullshit__return-home" style="text-decoration: none">返回首页</a>
        <!--<a href="/joc" class="bullshit__return-home" style="text-decoration: none">返回首页</a>-->
      </div>
      <div class="mapWrap">
        <div id="allmap1" style="width: 100%;height:200px ">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MP } from '../api/users.js'

export default {
  mounted: function () {
    this.$nextTick(function () {
      var _this = this
      MP(_this.ak).then(BMap => {
        var sContent = '嘉福总部'
        var map1 = new BMap.Map('allmap1')
        // 创建Map实例
        var point1 = new BMap.Point(121.430404, 31.199854)
        // 地理位置的坐标
        map1.centerAndZoom(point1, 15)
        map1.enableScrollWheelZoom()
        // 启用滚轮放大缩小
        var infoWindow = new BMap.InfoWindow(sContent)
        // 创建信息窗口对象
        map1.openInfoWindow(infoWindow, point1)
        // 开启信息窗口
        map1.panBy(200, 0)
        // 地图提示语的位置  括号里为像素
      })
    })
  },
  computed: {
    message () {
      return '特朗普说这个页面你不能进......'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wscn-http404 {
    position: relative;
    width: 1200px;
    margin: 20px auto 60px;
    padding: 0 100px;
    overflow: hidden;
    .pic-404 {
      position: relative;
      float: left;
      width: 600px;
      padding: 150px 0 150px 70px;
      overflow: hidden;
      &__parent {
        width: 100%;
      }
      &__child {
        position: absolute;
        &.left {
          width: 80px;
          top: 17px;
          left: 220px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1s;
        }
        &.mid {
          width: 46px;
          top: 10px;
          left: 420px;
          opacity: 0;
          animation-name: cloudMid;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1.2s;
        }
        &.right {
          width: 62px;
          top: 100px;
          left: 500px;
          opacity: 0;
          animation-name: cloudRight;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1s;
        }
        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }
          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }
          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }
          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }
        @keyframes cloudMid {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }
          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }
          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }
          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }
        @keyframes cloudRight {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }
          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }
          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }
          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
    }
    .bullshit {
      position: relative;
      float: left;
      width: 300px;
      padding: 150px 0 30px 0;
      overflow: hidden;
      &__oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &__headline {
        font-size: 20px;
        line-height: 24px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &__info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      &__return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        background: #1482f0;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
    .mapWrap {
      height: 220px;
      position: relative;
      float: right;
      width: 380px;
      overflow: hidden;
    }
  }
</style>
