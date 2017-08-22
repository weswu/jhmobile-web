<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="设置">
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
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
      <mu-list-item title="机汇微商城" href="http://m.jihui88.com">
        <div slot="after">m.jihui88.com</div>
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
    <mu-raised-button label="退出帐号" @click="signout" secondary fullWidth style="margin-top:20px"/>
  </div>
</template>
<script>
export default {
  methods: {
    signout () {
      var ctx = this
      this.$parent.$refs.loading.show()
      this.$http.get('/rest/api/user/logout').then((res) => {
        ctx.$parent.$refs.loading.hide()
        // 清空数据
        ctx.$store.commit('reset')
        ctx.$router.push({path: '/login'})
      })
    }
  }
}
</script>
