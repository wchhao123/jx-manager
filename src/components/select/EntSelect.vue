<template>
    <div >
<!--
      <label class="title">{{}}</label>
-->
      <el-form-item :label="title">
      <el-select size="small" :loading="loading"
                 v-model="model" filterable
                 clearable
                 @change="change"
                 :placeholder="placeHolder"
                 :loading-text="loadingText"
                 v-loading="isLoading"
                 remote
                 :no-data-text="noDataTip"
                 icon="search"
                 @clear="clear"
      >
        <el-option
          v-for="(item, index) in _salaryEnts" v-if="_salaryEnts.length"
          :key="index"
          :label="item.entId +'-' + item.entName"
          :value="item.entId">
          <span style="float: left; font-size: 12px">{{ item.entId }}</span>
          <span style="float: right; font-size: 12px">{{ item.entName }}</span>
        </el-option>
      </el-select>
      </el-form-item>
    </div>
</template>

<script type="text/ecmascript-6">
  import * as Route from 'common/menu'

  var globalRoutePath = ''
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      name: {
        type: String,
        default: ''
      },
      placeHolder: {
        type: String,
        default: '请输入企业名称(至少三个字符)'
      },
      noDataTip: {
        type: String,
        default: '无匹配数据'
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      _salaryEnts() {
        let salaryEnts = this.$store.getters.salaryEnts
        console.log(salaryEnts)
        return salaryEnts
      }
    },
    data () {
      return {
        loadingText: '加载中',
        isLoading: false,
        list: [],
        query: {
          entId: '',
          entName: ''
        },
        model: ''
      }
    },
    watch: {
      '$route': {
        immediate: true,
        handler: 'watchRoute'
      }
    },
    methods: {
      watchRoute (r) {
        debugger
        if (r.path.toString().indexOf(Route.entRoute.EntInfo.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntTrad.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntBalance.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntRealName.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntSign.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntRechargeOrder.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntSalary.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntSalaryDetail.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.EntMoneyManage.route) !== -1 ||
          r.path.toString().indexOf(Route.entRoute.JFTrade.route) !== -1
      ) {
          this.salaryEntQuery()
        }
      },
      salaryEntQuery () {
        let routePath = this.$route.path + ''
        if (routePath !== '' && globalRoutePath !== '' && routePath === globalRoutePath) {
          return
        } else {
          globalRoutePath = routePath
        }
        this.$store.dispatch('getSalaryEnts')
      },
      change (entId) {
        console.log(`选择企业${entId}`)
        this.$emit('input-select', entId)
      },
      clear () {
        this.isLoading = false
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    text-align: right
    color: #606266
    line-height: 40px
    padding: 0 12px 0 0
    font-size: 14px!important
/*  .el-select
    width 70%*/
</style>
