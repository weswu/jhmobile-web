<template>
  <div class="servicePay">
    <div class="fixed-bar">
      <mu-appbar>
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
        <div class='play-title'>
          服务缴费
        </div>
      </mu-appbar>
      <mu-list>
        <mu-list-item :title="enterName">
          <div slot="left">公司名:</div>
        </mu-list-item>
        <mu-divider/>
        <mu-list-item :title="username">
          <div slot="left">用户名:</div>
        </mu-list-item>
      </mu-list>
      <div class="hr"></div>
      <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
        <mu-tab value="payment" title="待缴费"/>
        <mu-tab value="history" title="历史缴费"/>
        <mu-tab value="serviceRecord" title="服务记录"/>
        <mu-tab value="goods" title="已购产品"/>
      </mu-tabs>
    </div>

    <div class="scroll-view">
      <keep-alive>
       <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: this.$store.state.user.username,
      enterName: this.$store.state.enterprise.name,
      activeTab: 'payment'
    }
  },
  // watch函数监测路由的变化,保持tab面板的高亮位置正确
  watch: {
    '$route' (to, from) {
      const path = to.path
      var tmpArr = path.split('/')
      if (tmpArr[1] === 'serivepay') {
        this.handleTabChange(tmpArr[2])
      }
    }
  },
  methods: {
    back () {
      this.$router.push({path: '/main/home'})
    },
    handleTabChange (val) {
      this.activeTab = val
      this.$router.push({ path: '/serivepay/' + val })
    }
  }
}
</script>
<style>
.servicePay .mu-item-left {
    width: 65px;
}
</style>
