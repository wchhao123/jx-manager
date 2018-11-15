<template>
    <div>
      <span>父组件</span>
       <div slot="up">模板1</div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child'
  export default {
    components: {
      Child
    }
  }
</script>

<style scoped>

</style>
