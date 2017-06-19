<template>
  <div>
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
    <div class="default-view">
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

</style>
