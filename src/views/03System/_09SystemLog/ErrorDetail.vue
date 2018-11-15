<template>
    <div class="customDialog">
      <el-form ref="entInfo" :model="detail" v-if="detail" class="toobar"
               label-position="left">
        <span class="item-title">基本错误信息</span>
        <el-row type="flex">
          <el-form-item label="异常编号:" :span="10">
            <span>{{detail.errorId}}</span>
          </el-form-item>

          <el-form-item label="业务编号:" :span="10">
            <span>{{detail.businessId}}</span>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="异常类型:" :span="10">
            <span>{{detail.errorType | filterSysteErrorType}}</span>
          </el-form-item>

          <el-form-item label="job状态:" :span="10">
            <span>{{detail.jobState | filterSystemJobType}}</span>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item label="报错时间:" :span="10">
            <span>{{detail.createTime | filterdateYMDHMS}}</span>
          </el-form-item>

          <el-form-item label="更新时间:" :span="10">
            <span>{{detail.updateTime | filterdateYMDHMS}}</span>
          </el-form-item>
        </el-row>
        <span class="item-title">业务内容</span>
        <el-row>
          <textarea v-show="detail.businessContent.toString().length>1"
                    style="width: 100%" v-model="detail.businessContent"
                    rows="5"
                    readonly></textarea>
        </el-row>
        <span class="item-title">执行job</span>
        <el-row type="flex">
          <el-form-item label="job执行状态">
            <el-select size="small" v-model="successOrFailed" filterable clearable placeholder="请选择job执行状态">
              <el-option
                v-for="item in _systemJobTypeSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row v-show="detail.jobState.toString() === '3'">
          <el-col :span="12" :offset="2">
            <el-button class="role_off" size="small" @click="cancelEdit">取消</el-button>
          </el-col>
          <el-col :span="2" :offset="4">
            <el-button type="primary" size="small"
                       v-show="this.$store.getters.getBtnIsShowByName('btn_sys_error_job_do')"
                       @click.native="editSubmit">执行job</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>

<script>
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  export default {
    props: {
      detail: {}
    },
    data () {
      return {
        successOrFailed: ''
      }
    },
    computed: {
      _systemJobTypeSource() {
        return state.funErrorJobHopeState()
      }
    },
    methods: {
      cancelEdit(val) {
        this.$emit('cancelEdit', val)
      },
      editSubmit() {
        if (this.successOrFailed.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择job执行状态'
          })
          return
        }
        let tip = `此操作将会执行job为${this.successOrFailed}`
        this.$confirm(tip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.updateJobByError({
            errorId: this.detail.errorId,
            errorType: this.detail.errorType,
            successOrFailed: this.successOrFailed
          }).then(response => {
            this.$notify({
              type: response.data.code === Api.ERR_OK ? 'success' : 'error',
              message: response.data.msg
            })
            this.cancelEdit('1')
          })
          this.$message('信息已提交')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          })
        })
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
    }
    .el-form-item {
      width: 50%;
      height: 20px
      margin-bottom 10px
    }

    .el-form-item__label {
      width: 30%;
    }

  .el-col
    span
      font-size 14px
</style>
