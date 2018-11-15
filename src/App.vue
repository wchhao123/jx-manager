<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  naslideleftme: 'App'
}
</script>

<style>
  @import 'styles/common.css';
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    -webkit-user-select: text
  }
  .el-menu
    background $color-background-aside-menu-expand
  //  左侧导航
  .el-menu-item.is-active
      color $color-aside-is-active
      background-color: $color-background-aside-focus
  .el-menu-item:focus
      background-color: $color-background-aside-focus
  .el-row {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .el-table
     tr
        background $color-background-table
  .el-table__body tr.hover-row>td
      background $color-background-table-hover!important
      color $color-font-table-hover!important
  .el-table__body tr.current-row>td
      background $color-background-table-hover!important
      color $color-font-table-hover!important
  .el-table--border td
    border-right: 1px solid $color-table-border;
  .el-table
    th
      background $color-background-table-header!important
      color $color-text-table-header!important
    td
      border-bottom: 1px solid $color-table-border;
  .el-step__head.is-process{
    color:#F56C6C!important;
    border-color:#F56C6C!important
  }
  .el-step__title.is-process{
    color:#F56C6C!important
  }
  .el-dialog__wrapper{
    overflow: auto;
    .el-dialog--small{
      width: 60%;

    }
  }
  .el-scrollbar
      width 300px
  .el-dialog__body{
    padding: 15px 20px!important;
    .el-form-item {
      font-size: 12px;
      span{
        font-size: 12px;
      }
    }
  }
  .goods_img{
    .el-upload--picture-card{
      width: 80px;
      height: 80px;
      line-height: 88px;

    }
    .el-upload-list--picture-card .el-upload-list__item{
      width: 80px;
      height: 80px;
    }
  }
  /*.el-icon-date:before{*/
  /*margin-left: 35px!important;*/
  /*}*/
  .el-table__body-wrapper{
    overflow-y: hidden !important;
  }
  .form_input{
    .el-upload--picture-card i {
      font-size: 24px !important;
      color: #8c939d;
    }
    .el-upload--picture-card{
      width: 36px !important;
      height: 36px !important;
      line-height: 40px !important;
    }
    .el-upload-list--picture-card .el-upload-list__item{
      width: 36px;
      height: 36px;
    }
  }

  .el-form-item__label{
    font-size: 14px!important;
    /*display: inline-block;*/
    white-space: nowrap;
    margin-bottom: -2px;
  }
  .login-container{
    .el-form-item__error{
      margin-top: 0px !important;
      padding-top: 3px!important;
    }
  }
  .el-form-item__error{
    padding-top: 0px!important;
    margin-top: 1px!important;
  }
  // 搜索栏
  .toolbar {
    background: $color-background-search-bar;
    padding: 5px 10px;
    margin: 2px 0px;
    .block{
      float: right;
      margin-right: 50px;
    }
    .el-form-item {
      font-size: 14px;
      margin-bottom: 0px;
      span{
        font-size: 12px;
      }
    }
  }
  .globalPointer{
    cursor:pointer;
    color: blue;
    &:hover{
      color: blueviolet;
    }
  }
  .title_color{
    color: dodgerblue;
    cursor:pointer;
    &:hover{
      color:blueviolet;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
