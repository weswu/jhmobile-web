<template>
  <div>
    <mu-appbar title="修改密码">
      <mu-icon-button icon='arrow_back' @click="$router.back()" slot="left"/>
    </mu-appbar>
    <div class="p10">
      <mu-text-field label="当前密码" hintText="请输入当前密码" v-model="password.oldPs" fullWidth/>
      <mu-text-field label="新密码" hintText="请输入新密码" v-model="password.newPs" fullWidth/>
      <mu-text-field label="确认密码" hintText="请输入确认密码" v-model="password.newPs2" fullWidth/>
      <mu-raised-button label="提交" @click="submit" secondary fullWidth/>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      password: {}
    }
  },
  methods: {
    submit () {
      if (this.password.newPs !== this.password.newPs2) {
        return window.alert('新密码不一致')
      }
      if (!this.password.oldPs || !this.password.newPs) {
        return window.alert('密码不能为空')
      }
      this.$http.post('/rest/api/user/detail/password?' + qs.stringify(this.password)).then((res) => {
        this.$cookie.set('password', res.data.attributes.password)
        window.alert('修改成功')
      })
    }
  }
}
</script>
