<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title='账号与安全'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <div class="titlef5">账号</div>
    <mu-list>
      <mu-list-item title="手机号">
        <div class="wu-item-right">
          {{$store.state.user.cellphone}}
        </div>
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="邮件地址">
        <div class="wu-item-right">
          {{$store.state.user.email}}
        </div>
      </mu-list-item>
      <mu-divider />
    </mu-list>
    <div class="titlef5">安全</div>
    <mu-list>
      <mu-list-item title="修改密码" href="#/password">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider />
    </mu-list>
  </div>
</template>
<script>
export default {
  methods: {
    signout () {
      this.$http.get('/rest/api/user/logout').then((res) => {
        this.$store.state.user = null
        this.$router.push({path: '/login'})
      })
    }
  }
}
</script>
