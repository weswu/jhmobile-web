<template>
  <div>

    {{user.username}}

        <a href="#/data">商城数据</a><br/>
        <a href="#/data">微网站</a><br/>
        <a href="#/data">微传单</a><br/>
        <a href="#/data">微分销</a><br/>
        <a href="#/member">会员管理</a><br/>
        <a href="#/data">视频教程</a><br/>
        <a href="#/data">流量分析</a><br/>
        <a href="#/data">服务缴费</a><br/>
        <a href="#/data">商城数据</a><br/>
        <a href="#/data">服务进度</a><br/>
        <a href="#/data">我的积分</a><br/>
        <a href="#/data">参与推广</a><br/>

    </div>
</template>
<script>
import api from '../../api'
export default {
  data () {
    return {
      user: {},
      shop: {}
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      let _this = this
      this.$http.get(api.getUser()).then((res) => {
        this.user = res.data.attributes.data
        this.$store.state.user = this.user
      })
      setTimeout(function () {
        _this.$http.get(api.getEnterprise()).then((res) => {
          _this.$store.state.enterprise = res.data.attributes.data
        })
      }, 500)
      this.$http.get(api.getOrderInfo()).then((res) => {
        this.shop = res.data.attributes.data
      })
    }
  }
}
</script>
<style>

</style>
