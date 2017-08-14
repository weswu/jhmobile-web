<template>
  <div style="width:100%;height:100%;">
    <mu-icon-button icon='arrow_back' @click='back' slot='left' style="position: absolute;"/>
    <iframe :src='url+id+end' style="width:100%;height:100%;border:none;"></iframe>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: 'http://www.jihui88.com/wcd/html/',
      end: '.html?debug=01',
      id: this.$route.params.id
    }
  },
  // watch函数监测路由的变化,保持tab面板的高亮位置正确
  watch: {
    '$route' (to, from) {
      this.id = to.path.split('/')[2]
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
