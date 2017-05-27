<template>
  <div>
    <div class="default-view">
      <keep-alive>
       <router-view></router-view>
      </keep-alive>
    </div>
    <mu-paper class="app-footer">
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="main" title="首页" icon="home"/>
        <mu-bottom-nav-item value="info" title="信息" icon="event_note"/>
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
      bottomNav: 'main'
    }
  },
  created () {
    this.get()
  },
  methods: {
    handleChange (val) {
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
