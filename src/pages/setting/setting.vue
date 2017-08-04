<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="设置">
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <mu-list>
      <mu-list-item title="账号与安全" href="#/account">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="服务反馈" href="#/service_feedback">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="操作记录" href="#/log">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
    </mu-list>
    <mu-list>
      <mu-list-item title="机汇微商城" href="http://m.jihui88.com/">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="促销活动" href="#/sale">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="服务中心" href="#/service">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="关于机汇网" href="#/about">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
    </mu-list>
    <mu-raised-button label="退出帐号" @click="signout" secondary fullWidth/>

  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['showLoading', 'hideLoading']),
    back () {
      this.$router.back()
    },
    signout () {
      var ctx = this
      this.showLoading()
      this.$http.get('/rest/api/user/logout').then((res) => {
        ctx.hideLoading()
        ctx.$store.state.user = null
        ctx.$router.push({path: '/login'})
      })
    }

  }
}
</script>
