<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar>
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
        <div class='play-title'>
          微传单
        </div>
      </mu-appbar>
      <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
        <mu-tab value="me" title="我的微传单"/>
        <mu-tab value="vip" title="VIP专属"/>
        <mu-tab value="case" title="案例展示"/>
      </mu-tabs>
      <div style="height:0.2rem"></div>
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
      activeTab: 'me'
    }
  },
  // watch函数监测路由的变化,保持tab面板的高亮位置正确
  watch: {
    '$route' (to, from) {
      const path = to.path
      var tmpArr = path.split('/')
      if (tmpArr[1] === 'wcd') {
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
      this.$router.push({ path: '/wcd/' + val })
    }
  }
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 28rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.fixed-bar {
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  z-index: 15;
}


</style>
