<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="微网站">
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab v-for="item in tabs" :value="item.value" :title="item.title"/>
    </mu-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeTab: 'me',
      tabs: [
        {value: 'me', title: '我的手机网站'},
        {value: 'case', title: '案例展示'}
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.activeTab = vm.$route.path.split('/')[2]
    })
  },
  methods: {
    back () {
      this.$router.push({path: '/main/home'})
    },
    handleTabChange (val) {
      this.activeTab = val
      this.$router.push({ path: '/mobile/' + val })
    }
  }
}
</script>
