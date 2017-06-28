<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar>
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
        <div class='play-title'>
          我的分销商
        </div>
      </mu-appbar>
      <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
        <mu-tab value="member" title="会员"/>
        <mu-tab value="data" title="数据"/>
        <mu-tab value="bouns" title="提现"/>
      </mu-tabs>
      <div style="height:0.2rem"></div>
    </div>

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
      activeTab: 'member'
    }
  },
  // watch函数监测路由的变化,保持tab面板的高亮位置正确
  watch: {
    '$route' (to, from) {
      const path = to.path
      var tmpArr = path.split('/')
      if (tmpArr[1] === 'distribution') {
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
      this.$router.push({ path: '/distribution/' + val })
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
.default-view {
  margin-top: 104px;
}


</style>
