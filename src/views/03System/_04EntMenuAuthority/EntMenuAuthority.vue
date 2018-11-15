<template>
    <div>
      <el-tree :data="menuList"
               node-key="authorityId"
               default-expand-all
               @node-click="treeHandleNodeClick">
        <span class="custom-tree-node" slot-scope="{node, data}">
          <span>{{data.authorityName}}</span>
          <span>
            <el-button type="text" size="mini"
                       v-show="isOwnAdd"
                       @click.stop="_addMenu(data)" style="color: #67C23A">新增</el-button>
            <el-button type="text" size="mini"
                       v-show="isOwnDelete"
                       @click.stop="_deleteMenu(data)" style="color: #F56C6C">删除</el-button>
            <el-button type="text" size="mini"
                       v-show="isOwnUpdate"
                       @click.stop="_updateMenu(data, node)" style="color: #409EFF">编辑</el-button>
          </span>
        </span>
      </el-tree>
      <el-dialog :title="detail.title" center :visible.sync="detail.visiable" width="50%">
        <menu-auth-detail :detail="this.detail.model" :type="detail.type" @cancelEdit="cancelEdit">
        </menu-auth-detail>
      </el-dialog>
    </div>
</template>

<script>
  import * as Api from 'api'
  import MenuAuthDetail from './MenuAuthDetail'

  export default {
    data () {
      return {
        isLoading: false,
        menuList: [],
        detail: {
          visiable: false,
          model: '',
          title: '',
          type: ''
        }
      }
    },
    created() {
      this.doQuery()
    },
    computed: {
      isOwnAdd() {
        return this.$store.getters.getBtnIsShowByName('btn_ent_menu_add')
      },
      isOwnDelete() {
        return this.$store.getters.getBtnIsShowByName('btn_ent_menu_delete')
      },
      isOwnUpdate() {
        return this.$store.getters.getBtnIsShowByName('btn_ent_menu_update')
      }
    },
    methods: {
      doQuery() {
        this.isLoading = true
        Api.getEntMenuList({}).then(response => {
          this.isLoading = false
          if (response.data.code === Api.ERR_OK) {
            let data = [{
              'authorityId': 0,
              'label': '企业系统菜单管理',
              'authorityName': '企业系统菜单管理',
              'children': response.data.data
            }]
            // this.menuList = JSON.parse(JSON.stringify(response.data.data))
            this.menuList = JSON.parse(JSON.stringify(data))
            console.log(this.menuList)
            console.log(this.data5)
          }
        })
      },
      _addMenu(data) {
        console.log(data)
        this.detail.title = '新增权限目录'
        this.detail.model = JSON.parse(JSON.stringify(data))
        this.detail.type = 'add'
        this.detail.visiable = true
      },
      _deleteMenu(data) {
        this.$confirm(`确定要删除< ${data.authorityName} >菜单?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.deleteEntMenu({
            authorityId: data.authorityId
          }).then(resp => {
            this.$message({
              type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
              message: resp.data.msg
            })
            if (resp.data.code === Api.ERR_OK) {
              this.doQuery()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      _updateMenu(data, node) {
        this.detail.title = '更新权限目录'
        this.detail.model = JSON.parse(JSON.stringify(data))
        this.detail.type = 'update'
        this.detail.visiable = true
      },
      toMenuDetail(index, row) {
        console.log(`点击查看错误详情 row ${row}}`)
        console.log(row)

        this.detail.model = JSON.parse(JSON.stringify(row))
        this.detail.visiable = true
      },
      treeHandleNodeClick() {
        console.log('treeHandleNodeClick')
      },
      cancelEdit(type) {
        this.detail.visiable = false
        if (type && type === 'refresh') {
          this.doQuery()
        }
      }
    },
    components: {
      MenuAuthDetail
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  #recharge_manage_new .el-form-item {
    width: 100%;
  }

  #recharge_manage_new .el-form-item__label {
    width: 30%;
  }

  #recharge_manage_new .el-form-item__content {
    width: 70%;
  }

  #recharge_manage_new .el-form-item__content .el-select {
    width: 100%;
  }

  #recharge_manage_new .el-date-editor {
    width: 100%;
  }
</style>
