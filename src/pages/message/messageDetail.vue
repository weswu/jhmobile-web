<template>
  <div>
    <mu-appbar title="询盘查看">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
    </mu-appbar>


  </div>
</template>
<script>
export default {
  data () {
    return {
      isloading: true,
      message: {}
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/message/detail' + this.$route.params.id).then((res) => {
        this.list = res.data.attributes.data
      })
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
