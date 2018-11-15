<template>
  <div v-html="html" v-show="html"></div>
</template>

<script>
    export default {
      data() {
        return {
          html: ''
        }
      },
      watch: {
        '$route': {
          immediate: true,
          handler: 'getParams'
        }
      },
      methods: {
        getParams(r) {
          debugger
          this.html = this.$route.params.html
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
