<template>
<div>
  <mu-appbar class='wu-appbar'>
    <mu-icon-button icon='arrow_back' @click="back" slot="left"/>
    <div class='play-title'>
      客户购买数量排行<span style='font-size:16px;padding-left:5px' v-if='num === 1'>({{num}})</span>
    </div>
  </mu-appbar>
  <div class="container pt56">
    <mu-list>

    </mu-list>
  </div>

</div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        num: 1,
        list: []
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/order/data/member_list?pageSize=5000&sort=1&page=1').then((res) => {
        this.list = res.data.attributes.data
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
