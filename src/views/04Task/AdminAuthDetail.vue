<template>
    <div class="customDialog">
      <el-form ref="menuInfo" :model="model" v-if="model" class="toobar" :inline="true" :rules="rules"
               label-position="left">
        <span class="item-title">后台权限配置:</span>
        <el-row type="flex" v-show="type === 'add'">
          <el-form-item label="父菜单:" size="small">
            <el-input v-model="model.parentName" disabled></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="权限名称:" size="small" prop="authorityName">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="权限url:" prop="authorityUrl">
            <el-input v-model="model.url" size="small"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="权限类型:" prop="type">
            <el-select size="small" v-model="model.type" filterable clearable placeholder="请选择权限类型">
              <el-option
                v-for="item in _authorityTypeSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="排序:" >
            <el-input v-model="model.sort" size="small"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="资源访问级别:" prop="menuLevel">
            <el-select size="small" v-model="model.menuLevel" filterable clearable placeholder="请选择访问级别">
              <el-option
                v-for="item in _resourceLevelSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="父级id:" >
            <span>{{model.parentId}}</span>
          </el-form-item>
        </el-row>
        <span class="item-title">前端资源</span>
        <el-row type="flex">
          <el-form-item label="前端路由:" size="small" prop="vueUrl">
            <el-input v-model="model.vueUrl"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="菜单类名:" size="small">
            <el-input v-model="model.clazz"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-button size="small" @click="_cancelEdit">取消</el-button>
          <el-button size="small" type="primary" v-show="type === 'add'" @click="_addMenu">新增</el-button>
          <el-button size="small" type="primary" v-show="type === 'update'" @click="_updateMenu">更新</el-button>
        </el-row>
      </el-form>
    </div>
</template>

<script>
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  export default {
    props: {
      detail: {},
      type: ''
    },
    data () {
      var validateVueResource = (rule, value, callback) => {
        if (!value) {
          return callback()
        } else {
          let o = JSON.parse(value)
          if (!o) {
            return callback(new Error('格式不对'))
          } else {
            callback()
          }
        }
      }
      return {
        model: {},
        rules: {
          name: {required: true, message: '请填写权限权限名称', trigger: 'blur'},
          url: {required: true, message: '请填写权限url', trigger: 'blur'},
          type: {required: true, message: '请选择权限类型', trigger: 'change'},
          menuLevel: {required: true, message: '请选择资源访问级别', trigger: 'change'}
        }
      }
    },
    watch: {
      'type': {
        immediate: true,
        handler: function (val) {
         this.type = val
          this._setModel()
        }
      },
      'detail': {
        immediate: true,
        handler: function (val) {
          this.detail = val
          this._setModel()
        }
      }
    },
    methods: {
      _setModel() {
        setTimeout(() => {
          if (this.type === 'add') {
            this.model = {
              parentName: this.detail.name,
              parentId: this.detail.id,
              sort: this.detail.children.length + 1
            }
          } else {
            this.model = this.detail
          }
        }, 200)
      },
      _cancelEdit() {
        this.$refs.menuInfo.resetFields()
        this.$emit('cancelEdit')
      },
      _addMenu() {
        this.$refs.menuInfo.validate((valid) => {
          if (valid) {
            Api.addAdminMenu({
              name: this.model.name,
              url: this.model.url,
              sort: this.model.sort,
              menuLevel: this.model.menuLevel,
              vueUrl: this.model.vueUrl,
              parentId: this.model.parentId,
              type: this.model.type,
              clazz: this.model.clazz
            }).then(resp => {
              this.$message({
                type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
                message: resp.data.msg
              })
              if (resp.data.code === Api.ERR_OK) {
                this._saveSuccess()
              }
            })
          }
        })
      },
      _updateMenu() {
        this.$refs.menuInfo.validate((valid) => {
          if (valid) {
            Api.updateAdminMenu({
              id: this.model.id,
              name: this.model.name,
              url: this.model.url,
              type: this.model.type,
              sort: this.model.sort,
              menuLevel: this.model.menuLevel,
              parentId: this.model.parentId,
              vueUrl: this.model.vueUrl,
              clazz: this.model.clazz
            }).then(resp => {
              this.$message({
                type: resp.data.code === Api.ERR_OK ? 'success' : 'error',
                message: resp.data.msg
              })
              if (resp.data.code === Api.ERR_OK) {
                this._saveSuccess()
              }
            })
          }
        })
      },
      _saveSuccess() {
        setTimeout(() => {
          this.$emit('cancelEdit', 'refresh')
        }, 200)
      }
    },
    computed: {
      _resourceLevelSource() {
        return state.funResourceLevel()
      },
      _authorityTypeSource() {
        return state.funAuthorityType()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .customDialog
    .item-title {
      font-size 16
      font-weight bold
      color black
      display block
      padding 10px 0
      border-bottom 1px dashed gray
      margin-bottom 5px
    }
    .el-form-item {
      width: 100%;
      height: 20px
      margin-bottom 20px
    }

    .el-form-item__label {
      width: 30%;
    }

  .el-col
    span
      font-size 14px
</style>
