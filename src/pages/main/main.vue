<template>
  <div>
    <div class="default-view" style="padding-bottom: 2.4rem;">
      <keep-alive>
       <router-view></router-view>
      </keep-alive>
    </div>
    <mu-paper class="app-footer">
      <mu-bottom-nav :value="bottomNav" @change="handleTabChange">
        <mu-bottom-nav-item value="home" title="首页" icon="home"/>
        <mu-bottom-nav-item value="info" title="数据" icon="event_note"/>
        <mu-bottom-nav-item value="message" title="询盘" icon="message"/>
        <mu-bottom-nav-item value="me" title="我的" icon="person"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isloading: true,
      bottomNav: 'home'
    }
  },
  created () {
    this.get()
    // 当created函数时监测路由信息,防止页面刷新tab高亮错误
    var tmpArr = this.$route.path.split('/')
    console.log(tmpArr)
    if (tmpArr[1] === 'main') {
      this.handleTabChange(tmpArr[2])
    }
  },
  // watch函数监测路由的变化,保持tab面板的高亮位置正确
  watch: {
    '$route' (to, from) {
      const path = to.path
      var tmpArr = path.split('/')
      if (tmpArr[1] === 'main') {
        this.handleTabChange(tmpArr[2])
      }
    }
  },
  methods: {
    handleTabChange (val) {
      this.bottomNav = val
      this.$router.push({ path: '/main/' + val })
    },
    get () {
    }
  }
}
</script>

<style scoped>
.app-footer{
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
