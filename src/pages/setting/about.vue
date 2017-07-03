<template>
  <div>
    <mu-appbar title='关于机汇网'>
      <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
    </mu-appbar>
      <mu-list>
        <mu-list-item title="新版本检测">
          <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
          <div slot='after'>
            已是最新版
          </div>
        </mu-list-item>
        <mu-divider />
        <mu-list-item title="更新记录" href="#/app_log">
          <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
        </mu-list-item>
        <mu-divider />
      </mu-list>
      <div class="hr">

      </div>
      <div style="padding: 0.5rem;font-size: 16px">分享二维码给好友</div>
      <div style=" text-align: center;">
        <img src="http://app.jihui88.com/css/img/appApk.png" alt="app">
        <br><span style="padding: 0.5rem 0;display: block;">当前版本号：1.1.0</span>
        <img src="http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/28/caa0bba6-2881-4bf5-8a6f-41533fa8f2dd.jpg" alt="官方微信二维码">
        <br><span style="padding: 0.5rem 0;display: block;">官方微信二维码</span>
      </div>

  </div>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.back()
    },
    signout () {
      this.$http.get('/rest/api/user/logout').then((res) => {
        this.$store.state.user = null
        this.$router.push({path: '/login'})
      })
    }

  }
}
</script>
