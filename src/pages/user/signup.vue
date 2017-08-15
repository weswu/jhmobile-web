<template>
  <div>
    <mu-appbar title="机汇网会员注册" style="text-align:center">
      <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
      <mu-flat-button href="#/login" label="登录" slot="right"/>
    </mu-appbar>
    <iframe class="pt10" src="http://www.jihui88.com/member/reg_m.html?d=jihui" width="100%" height="300px" style="border:none"></iframe>
  </div>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
