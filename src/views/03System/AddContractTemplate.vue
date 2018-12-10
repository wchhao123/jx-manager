<template>
  <div>
    <el-form :inline=true :model="queryModel" label-position="right" class="toolbar form-inline" :rules="rules" ref="update" v-loading="isLoading">
        <el-row>
          <el-form-item prop="tid" label="上上签合同模板id">
              <el-input size="small" clearable v-model="queryModel.tid" placeholder="上上签合同模板id"></el-input>
            </el-form-item>
            <!--<el-form-item prop="tempId" label="合同模板id">-->
              <!--<el-input size="small" clearable v-model="queryModel.tempId" placeholder="合同模板id"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="模板状态" prop="templetState">-->
              <!--<el-select placeholder="模板状态" v-model="queryModel.templetState" clearable>-->
                <!--<el-option-->
                  <!--v-for="(item, index) of this.$state.contractUpdate"-->
                  <!--:key="index"-->
                  <!--:label="item"-->
                  <!--:value="index">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <el-col :span="2"></el-col>
          <el-col :span="1">
            <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="doQuery">更新
            </el-button>
          </el-col>
        </el-row>
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        queryUrl: '/contract_add',
        isLoading: false,
        selectDate: '',
        totalCount: 0,
        queryModel: {
        },
        dataList: [],
        rules: {
          tid: [
        {required: true, message: '请输入上上签模板id', trigger: 'blur'}
      ],
          tempId: [
            {required: true, message: '请输入合同模板id', trigger: 'blur'}
          ],
          templetState : [
            {required: true, message: '请选择模板状态', trigger: 'blur'}

          ]
        }
      }
    },
    methods: {
      doQuery () {
        debugger
        this.$refs['update'].validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.$post(this.$url(this.queryUrl), this.queryModel).then(response => {
            this.isLoading = false
          }, err => {
            console.log(err)
            this.isLoading = false
          })
        }})
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
