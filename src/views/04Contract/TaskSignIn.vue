<template>
  <div>
    <el-form :inline="true" :model="queryModel" label-position="right" class="toolbar demo-form-inline">
      <el-row type="flex">
        <ent-select  title="发布企业" place-holder="请输入发布企业"
                    @input-select="salaryInputSelect">
        </ent-select>
        <el-form-item :span="1">
        </el-form-item>
        <el-form-item :span="6" label="手机号码">
          <el-input size="small" clearable v-model="queryModel.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item :span="6" label="任务名称">
          <el-input size="small" clearable v-model="queryModel.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item :span="6" label="姓名">
          <el-input size="small" clearable v-model="queryModel.name" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
          <el-form-item label="报名状态">
            <el-select size="small" v-model="queryModel.signUpState" filterable clearable placeholder="请选择报名状态">
              <el-option
                v-for="item in funSignInSource"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item :span="6" label="任务编号">
          <el-input size="small" clearable v-model="queryModel.taskId" placeholder="请输入任务编号"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="left">
        <el-col>
          <el-form-item label="报名时间">
            <el-date-picker
              v-model="selectDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button size="small" type="primary" icon="el-icon-search" style="margin-bottom: 10px" :disabled="isLoading" @click="resetDoQuery">查询
          </el-button>
        </el-col>
        <!--<el-col :span="3">
          <el-button size="small" type="danger" icon="el-icon-check" style="margin-bottom: 10px" @click="doExportSalaryList" v-show="this.$store.getters.getBtnIsShowByName('btn_ent_salary_export')">导出
          </el-button>
        </el-col>-->
      </el-row>
    </el-form>

    <el-table :data="entSignList" style="width: 100%" border v-loading="isLoading">

      <el-table-column align="center" label="用户编号" fixed>
        <template slot-scope="scope">
          <span size="small">{{scope.row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户姓名">
        <template slot-scope="scope">
          <span size="small">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span size="small">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <!--发薪企业-->
      <el-table-column align="center" label="发布企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.entName}}</span>
        </template>
      </el-table-column>

      <!--运营主企业-->
      <el-table-column align="center" label="运营主企业">
        <template slot-scope="scope">
          <span size="small">{{scope.row.operationEntName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务名称">
        <template slot-scope="scope">
          <span size="small">{{scope.row.taskName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名状态">
        <template slot-scope="scope">
          <span size="small">{{scope.row.signUpState | filterSignInState()}}</span>
        </template>
      </el-table-column>

      <!--提交时间-->
      <el-table-column width="170" align="center" label="报名时间">
        <template slot-scope="scope">
          <span size="small">{{scope.row.createDate | filterdateYMDHMS()}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button  @click="getUserResume(scope.row)"
                     type="primary" plain size="small">查看个人简历
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-col :span="24" class="toolbar">
      <div class="block">
        <el-pagination
          @size-change="pageChange"
          @current-change="pageHandelCurrentChange"
          :current-page="queryModel.pageNum"
          :page-size="queryModel.pageSize"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-col>
    <el-dialog :title="detail.title" center width="50%" :visible.sync="detail.visible" :close-on-click-modal="1===0">
      <user-resume :detail="detail.model" @done="closeEditDialog">
      </user-resume>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import EntSelect from 'components/select/EntSelect'
  import UserResume from './UserResume.vue'
  import * as state from 'common/js/state-dic'
  import * as Api from 'api'
  import * as filters from 'filters'
  import { ERR_OK } from '../../api/index'
  export default {
    data () {
      return {
        isLoading: false,
        showModal: true,
        selectDate: '',
        tableSpan: 2,
        totalCount: 0,
        get: {
          userId: ''
        },
        detail: {
          visible: false,
          title: '个人履历',
          model: {}
        },
        inputDataList: {
          salaryDataList: []
        },
        queryModel: {
          pageNum: 1,
          pageSize: 10,
          salaryType: 7
        },
        entSignList: [],
        editIndex: null,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    watch: {
      '$route': {
        immediate: true,
        handler: 'getParams'
      }
    },
    computed: {
      signInStateSource () {
        return state.signInState()
      },
      funSignInSource () {
        return state.funSignInState()
      }
    },
    methods: {
      getParams (r) {
        let name = this.$route.name
        if (name === '报名管理') {
          let taskId = this.$route.params.taskId
          this.queryModel = {
            pageNum: 1,
            pageSize: 10,
            salaryType: 7
          }
          this.selectDate = ''
          this.queryModel.taskId = taskId
          if (!taskId || taskId.length < 1) {
            return
          }
          this.doQuery()
        }
      },
      salaryInputSelect (entId) {
        if (entId !== undefined) {
          this.queryModel.entId = entId
        } else {
          this.queryModel.entId = null
        }
        console.log(this.queryModel.entId)
      },
      resetDoQuery() {
        this.queryModel.pageNum = 1
        this.doQuery()
      },
      doQuery () {
        this.isLoading = true
        let _salaryMonth = this.queryModel.salaryMonth
        this.queryModel.salaryMonth = filters.filterDateYYYYMM(this.queryModel.salaryMonth)
        if (this.selectDate !== null && this.selectDate) {
          this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
          this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
        } else {
          this.queryModel.startDate = null
          this.queryModel.endDate = null
        }
        Api.getSignInList(this.queryModel).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.entSignList = response.data.data.list
            this.totalCount = response.data.data.totalCount
          }
          this.queryModel.salaryMonth = _salaryMonth
        })
      },
      doDetail() {
        Api.getUserResume(this.get).then(response => {
          this.isLoading = false
          if (response.data.code === ERR_OK) {
            this.detail.model = response.data.data
            this.detail.model.labels = []
              if (this.detail.model.label !== undefined) {
                this.detail.model.labels = this.detail.model.label.split(',')
              } else this.detail.model.labels = []
            console.log(this.detail.model.labels)
          }
        })
      },
      doExportSalaryList () {
        this.$confirm('确认需要导出发薪批次数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true
          let _salaryMonth = this.queryModel.salaryMonth
          this.queryModel.salaryMonth = filters.filterDateYYYYMM(this.queryModel.salaryMonth)
          if (this.selectDate !== null && this.selectDate) {
            this.queryModel.startDate = filters.filterDateYYYYMMDD(this.selectDate[0])
            this.queryModel.endDate = filters.filterDateYYYYMMDD(this.selectDate[1])
          } else {
            this.queryModel.startDate = null
            this.queryModel.endDate = null
          }
          Api.exportSalaryList(this.queryModel).then(resp => {
            this.queryModel.salaryMonth = _salaryMonth
            this.isLoading = false
            let data = resp.data
            if (!data) {
              return
            }
            let blob = new Blob([data], {type: 'application/vnd.ms-excel'})
            let objectUrl = URL.createObjectURL(blob)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = objectUrl
            link.setAttribute('download', '发薪批次.xls')
            document.body.appendChild(link)
            link.click()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      getUserResume(row) {
        debugger
        this.get.userId = row.userId
        this.detail.visible = true
        this.doDetail()
      },
      pageHandelCurrentChange (val) {
        this.queryModel.pageNum = val
        this.doQuery()
        console.log('pageHandelCurrentChange')
        console.log(this.queryModel)
        console.log(val)
      },
      pageChange (val) {
        console.log('pageChange')
        console.log(val)
      },
      closeEditDialog (state) {
        this.detail.visible = false
        this.detail.model = {}
      }
    },
    components: {
      EntSelect,
      UserResume
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
