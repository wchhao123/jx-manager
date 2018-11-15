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
            <el-input v-model="model.authorityName"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="权限url:" prop="authorityUrl">
            <el-input v-model="model.authorityUrl" size="small"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="权限类型:" prop="authorityType">
            <el-select size="small" v-model="model.authorityType" filterable clearable placeholder="请选择权限类型">
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
            <el-input v-model="model.sortNumber" size="small"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="资源访问级别:" prop="resourceLevel">
            <el-select size="small" v-model="model.resourceLevel" filterable clearable placeholder="请选择访问级别">
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
             <textarea
               style="width: 100%" v-model="model.vueResource"
               rows="5"
               ></textarea>
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
          authorityName: {required: true, message: '请填写权限权限名称', trigger: 'blur'},
          authorityUrl: {required: true, message: '请填写权限url', trigger: 'blur'},
          authorityType: {required: true, message: '请选择权限类型', trigger: 'change'},
          resourceLevel: {required: true, message: '请选择资源访问级别', trigger: 'change'},
          vueResource: { validator: validateVueResource, trigger: 'blur' }
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
              parentName: this.detail.authorityName,
              parentId: this.detail.authorityId,
              sortNumber: this.detail.children.length + 1
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
            Api.addEntMenu(this.model).then(resp => {
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
            Api.updateEntMenu({
              authorityId: this.model.authorityId,
              authorityName: this.model.authorityName,
              authorityUrl: this.model.authorityUrl,
              authorityType: this.model.authorityType,
              sortNumber: this.model.sortNumber,
              resourceLevel: this.model.resourceLevel,
              parentId: this.model.parentId,
              vueResource: this.model.vueResource
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
