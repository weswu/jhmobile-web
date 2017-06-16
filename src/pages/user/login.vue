<template>
  <div>
    <mu-appbar title="机汇网会员登录" titleClass="center">
      <mu-flat-button href="#/signup" label="注册" slot="right"/>
    </mu-appbar>
    <div class="container p20">
      <mu-text-field label="帐号" hintText="请输入登录帐号" v-model="username" labelClass="indent" hintTextClass="indent" inputClass="indent" fullWidth labelFloat/><br/>
      <mu-text-field label="登录密码" hintText="请输入密码" v-model="password" labelClass="indent" hintTextClass="indent" inputClass="indent" type="password" fullWidth labelFloat/><br/>
      <mu-raised-button label="登录" @click="submit" class="submit-raised-button" fullWidth primary/>

      <mu-flat-button href="tel:4007111011" label="登录遇到问题?" style="float:right" color="#333"/>
      <p style="text-align: center;clear: both;margin-top: 60px;color: #aaa;">
        浙江机汇网络科技有限公司版权所有<br/>
        服务热线：<a href="tel:4007111011">400-7111-011</a>
      </p>
    </div>


    <a class="f39dsk ng-scope" href="http://app.jihui88.com/download.html" v-if="isWeixin">
      <b class="m48"><img src="http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/08/9df67a15-7379-4374-b575-3fb6f55efa02.png" alt=""></b>
      <span>机汇网后台管理APP</span>
      <b class="n48-dl">立即安装</b>
    </a>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      isWeixin: this.$store.state.isWeixin,
      username: this.$cookie.get('username'),
      password: this.$cookie.get('password')
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
      this.$http.post('/rest/api/user/login', qs.stringify({
        username: this.username,
        password: this.password
      })).then((res) => {
        this.$cookie.set('username', this.username)
        this.$cookie.set('password', this.password)
        this.$store.state.user = res.data.attributes.data
        this.$router.push({path: '/main/home'})
      })
    }
  }
}
</script>
<style lang="less" scoped>
.mu-text-field-input.indent{
  text-indent: 10px;
}
.mu-text-field-hint.indent{
  text-indent: 10px;
}
.mu-text-field-label.indent{
  text-indent: 10px;
}
/*下载广告*/
.f39dsk{background-color:#5f646e;position:fixed;bottom:0;left:0;padding:6px 0 6px 30px;height:42px;line-height:42px;width:100%;box-sizing:border-box;color:#fff;display:flex;display:-webkit-box-flex}
.f39dsk img{width:30px;display:inline-block;vertical-align:top;margin-right:8px;border-radius:3px;height:30px}
.f39dsk .n48-dl{right:0;top:0;position:absolute;align-items:center;color:#fff;background-color:#FF5000;height:42px;text-align:center;font-weight:400;font-size:14px;padding:0 8px}
.f39dsk span{-webkit-box-flex:1;flex:1;display:block;line-height:30px}
.f39dsk .m48{margin:0 8px 0 0;width:30px;height:30px;display:inline-block;vertical-align:top}
</style>
