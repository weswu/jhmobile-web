<template>
  <div style="width:100%;height:100%;">
    <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left' style="position: absolute;"/>
    <iframe :src='url' style="width:100%;height:100%;border:none;"></iframe>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: '0',
      url: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.params.id !== vm.id) {
        vm.url = 'http://sj.jihui88.com/rest/site/' + to.params.id + '/index'
      }
    })
  }
}
</script>
