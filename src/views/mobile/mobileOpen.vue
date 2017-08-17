<template>
  <div style="width:100%;height:100%;">
    <mu-icon-button icon='arrow_back' @click='back' slot='left' style="position: absolute;z-index: 9"/>
    <iframe :src="'http://sj.jihui88.com/rest/site/'+ $route.params.id +'/index'" style="width:100%;height:100%;border:none;z-index: 1"></iframe>
  </div>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.path = from.fullPath || '/mobile/me'
    })
  },
  methods: {
    back () {
      this.$router.push({path: this.path})
    }
  }
}
</script>
