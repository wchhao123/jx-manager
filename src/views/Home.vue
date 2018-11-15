<template>
  <el-container class="max-container">
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col class="logo" :span="4">嘉薪运营后台</el-col>
        <el-col :span="4" style="text-align: right">
          <el-dropdown @command="dropdownCommand">
            <span class="el-dropdown-link user">
             <i class="el-icon-service"/> 敬爱的: {{adminName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <!--<el-menu v-for="(item, index) in navMenus" :key="index"-->
                 <!--:default-active="$route.path"-->
                 <!--background-color="#545c64"-->
                 <!--text-color="#fff"-->
                 <!--active-text-color="#ffd04b"-->
                 <!--router-->
                 <!--@open="handleOpen"-->
                 <!--@close="handleClose"-->
        <!--&gt;-->
          <el-menu v-for="(item, index) in navMenus" :key="index"
                   :default-active="$route.path"
                   router
                   @open="handleOpen"
                   @close="handleClose"
          >
          <el-submenu :index="index+''">
            <template slot="title"><i :class="item.clazz"></i>{{item.name}}</template>
            <el-menu-item  v-for="(subItem ,subIndex) in item.children" :key="subIndex"
                           :index="'/'+subItem.vueUrl">{{subItem.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <div class="navtab">
          <div ref="tag" style="display: inline-block">
            <router-link tag="span"
                         :to="tag.to" replace style="height: 30px"
                         class="el-tag el-tag--medium"
                         v-for="(tag,index) in tags" :key="index" >{{tag.name}}
              <i v-if="tag.closable===undefined?true:false"
                 class="el-tag__close el-icon-close"
                 @click.stop="closeTag(index)" ></i>
            </router-link>
          </div>
        </div>
        <div class="mainBody grid-content bg-purple-light">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="修改密码" center="" :visible.sync="password.visiable" width="40%">
      <change-password @cancelEdit="cancelChangePwd"></change-password>
    </el-dialog>
  </el-container>
</template>

<script>
  import * as Route from '../common/menu'
  import ChangePassword from './ChangePassword'
  import * as Api from 'api'
  export default {
    data() {
      return {
        navMenus: '',
        slidemode: 'slideright',
        password: {
          visiable: false,
          mobile: ''
        },
        tags: [{name: '首页', to: '/', closable: false}]
      }
    },
    computed: {
      adminName() {
        return this.$store.getters.user.adminName
      }
     },
    created() {
      // this.navMenus = Route.menu.data
      this._getMenus()
      this.$store.dispatch('getBtn')
    },
    watch: {
      '$route': 'addTag'
    },
    methods: {
      _getMenus() {
        Api.getMenus().then(resp => {
          this.navMenus = resp.data.data
        })
      },
      addTag (r) { // 添加标签
        let exits = false
        console.log((this.$route))
        this.tags.forEach(function (item) {
          if (item.to === r.path) exits = true
        })
        if (!exits) {
          this.slidemode = 'slideright'
          this.tags.push({name: r.name, to: r.path})
        } else {
          this.slidemode = 'slideleft'
        }
      },
      closeTag (i) { // 关闭标签
        let tag = this.tags[i]
        this.tags.splice(i, 1)
        if (tag.to === this.$route.path) {
          this.slidemode = 'slideleft'
          this.$router.replace(this.tags[this.tags.length - 1].to)
        }
      },
      cancelChangePwd() {
        this.password.visiable = false
      },
      dropdownCommand(command) {
        if (command === 'exit') {
          this.$confirm('确定要退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('logout')
            this.$router.go(0)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else if (command === 'pwd') {
          this.password.visiable = true
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    },
    components: {
      ChangePassword
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .max-container
    border: 1px solid #eee
    position absolute
    width 100%
    top 0
    bottom 0
  .el-header
    color: #333;
    background $color-background-header
    text-align: center;
    line-height: 60px;
    .logo
      color $color-font-header-logo
      font-family:Arial,Helvetica,sans-serif;font-size:100%;
      font-size: 30px
  .el-aside
    background-color: $color-background-aside;
    color: #333;
    min-width: 50px;
    /*background: #333744;*/
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    &.showSidebar {
      overflow-x: hidden;
      overflow-y: auto;
    }
  .el-menu
      background $color-background-aside-menu
      .is-opened
          background #e6ebf5
  .el-main
    padding 0
    color: #333;
    .navtab
      z-index:2;height:30px;width:100%;overflow:hidden;background-color:$color-background-route-nav-bar;
      span
        cursor:pointer;line-height:30px;background:none;color:#fff;
        border:0;border-right:2px solid #E6EBF5;
        i
          color:#666
    .navtab span:hover{background-color:#409EFF;color:#fff}
    .navtab span:hover i{color:#fff}
    .navtab .router-link-exact-active{background-color:#f36d6e;color:#fff}
    .navtab .router-link-exact-active i{color:#fff}
    .mainBody
      top 0
      bottom 0
      width 100%
  .user
    color $color-font-user
</style>
