<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar :title="title">
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab v-for="item in tabs" :value="item.value" :title="item.title"/>
    </mu-tabs>
    <div style="height:0.2rem"></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '我的微传单',
      activeTab: 'me',
      tabs: [
        {value: 'me', title: '我的微传单'},
        {value: 'case', title: '案例展示'}
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.activeTab = vm.$route.path.split('/')[2]
      vm.tabTitle()
    })
  },
  methods: {
    back () {
      this.$router.push({path: '/main/home'})
    },
    handleTabChange (val) {
      this.activeTab = val
      this.$router.push({ path: '/wcd/' + val })
      this.tabTitle()
    },
    tabTitle () {
      for (var tab of this.tabs) {
        if (this.activeTab === tab.value) {
          this.title = tab.title
        }
      }
    }
  }
}
</script>
