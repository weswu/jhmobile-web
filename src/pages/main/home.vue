<template>
    <div>
        <div>用户名：{{user.username}}</div>
        <div>当前版本：{{user.username}}</div>
        <div>到期时间：{{user.username}}</div>
        <div>服务热线：400-7111-011</div>

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
      shop: {},
      logId: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get(api.getUser()).then((res) => {
        this.user = res.data.attributes.data
      })
      this.$http.get(api.getOrderInfo()).then((res) => {
        this.shop = res.data.attributes.data
      })
    }
  }
}
</script>
<style>
</style>
