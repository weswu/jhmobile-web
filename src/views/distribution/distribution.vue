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
      title: '我的分销商',
      activeTab: 'member',
      tabs: [
        {value: 'member', title: '会员'},
        {value: 'data', title: '数据'},
        {value: 'bouns', title: '提现'}
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
      this.$router.push({ path: '/distribution/' + val })
    }
  }
}
</script>
