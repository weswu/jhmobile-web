<template>
  <div>
    <mu-appbar title="机汇网会员登录" titleClass="center"></mu-appbar>
    <div class="container p20">
      <mu-text-field label="帐号" hintText="请输入登录帐号" v-model="username" labelClass="indent" hintTextClass="indent" inputClass="indent" fullWidth labelFloat/><br/>
      <mu-text-field label="登录密码" hintText="请输入密码" v-model="password" labelClass="indent" hintTextClass="indent" inputClass="indent" type="password" fullWidth labelFloat/><br/>
        <mu-raised-button label="登录" @click="submit" class="submit-raised-button" fullWidth primary/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isloading: true,
      username: '',
      password: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.submit()
    },
    submit () {
      this.$http.post('http://m1.jihui88.com/rest/api/user/login', {
        username: this.username,
        password: this.password
      }).then((res) => {
      })
    }
  }
}
</script>
<style lang="less">
.mu-appbar-title.center {
  text-align: center;
}
.mu-item-wrapper {
    border-bottom: 1px solid #eee;
}
.container.p20{
  padding: 20px
}
.container.p10{
  padding: 10px
}
.mu-text-field-input.indent{
  text-indent: 10px;
}
.mu-text-field-hint.indent{
  text-indent: 10px;
}
.mu-text-field-label.indent{
  text-indent: 10px;
}
.mu-raised-button.submit-raised-button{
  height: 40px;
  line-height: 40px;
}
.submit-raised-button .mu-raised-button-label{
  font-size: 16px
}
.mu-text-field.has-label{
  width: 100%;
}
.mu-text-field.mu-select-field{
  width: 50%;
}
</style>
