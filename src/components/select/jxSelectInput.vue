<template>
   <el-form-item  prop="entId">
     <span style="font-size: 14px" slot="label">{{ title }}</span>
     <el-select size="small" :loading="loading"
                v-model="model" filterable clearable
                @change="change"
                :placeholder="placeHolder"
                remote
                :no-data-text="noDataTip"
                icon="search"
                @clear="clear"
     >
       <el-option
         v-for="(item, index) in list" v-if="list.length"
         :key="item.id"
         :label="item.id +'-' + item.name"
         :value="index">
         <span style="float: left; font-size: 12px">{{ item.id }}</span>
         <span style="float: right; font-size: 12px">{{ item.name }}</span>
       </el-option>
     </el-select>
   </el-form-item>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    dataList: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ''
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
  data () {
    return {
      list: [],
      query: {
        entId: '',
        entName: ''
      },
      model: ''
    }
  },
  methods: {
    inputChange(val) {
      this.$emit('input-change', val)
    },
    change (val) {
      this.$emit('input-select', this.dataList[val])
    },
    clear () {
    }
  },
  watch: {
    id(val) {
      this.model = val
    },
    dataList(val) {
      this.list = []
      for (var i of val) {
        var obj = {}
        if (this.id !== '') {
          obj.id = i[this.id]
        }
        if (this.name !== '') {
          obj.name = i[this.name]
        }
        this.list.push(obj)
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
