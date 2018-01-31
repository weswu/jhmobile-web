<template>
  <div>
    <mu-appbar title="机汇网会员登录" style="text-align: center;padding-left: 60px;">
      <mu-flat-button href="#/signup" label="注册" slot="right"/>
    </mu-appbar>
    <div class="p20">
      <mu-text-field label="帐号" hintText="请输入登录帐号" v-model="username" labelClass="indent" hintTextClass="indent" inputClass="indent" fullWidth labelFloat/><br/>
      <mu-text-field label="登录密码" hintText="请输入密码" v-model="password" labelClass="indent" hintTextClass="indent" inputClass="indent" type="password" fullWidth labelFloat/><br/>
      <mu-raised-button label="登录" @click="get" fullWidth primary/>
      <mu-flat-button href="tel:4007111011" label="登录遇到问题?" style="float:right" color="#333"/>
      <p style="text-align: center;clear: both;margin-top: 60px;color: #aaa;">
        浙江机汇网络科技有限公司版权所有<br/>
        服务热线：<a href="tel:4007111011">400-7111-011</a>
      </p>
    </div>
    <mu-dialog :open="dialog" title="绑定微信" @close="close">
      <mu-text-field hintText="请输入企业账号" v-model="bind.username" fullWidth/>
      <mu-text-field hintText="请输入密码" v-model="bind.password" type="password" fullWidth/>
      <mu-flat-button slot="actions" primary @click="close" label="取消"/>
      <mu-flat-button slot="actions" primary @click="wxLogin" label="确定"/>
    </mu-dialog>
    <a class="f39dsk" href="#/download" v-if="isWeixin">
      <b class="m48"><img src="http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/08/9df67a15-7379-4374-b575-3fb6f55efa02.png" alt=""></b>
      <span>机汇网后台管理APP</span>
      <b class="n48-dl">立即安装</b>
    </a>
  </div>
</template>
<script>
import jsonp from 'jsonp'
import qs from 'qs'
export default {
  data () {
    return {
      dialog: false,
      bind: {},
      isWeixin: this.$store.state.isWeixin,
      username: '',
      password: '',
      client: ''
    }
  },
  created () {
    let ctx = this
    // 测试号
    this.appid = 'wxe4c05b399c083201'
    this.appsecret = 'd5c665786530ac03d86e8f346c8d20fe'
    // this.client = new OAuth(this.appid, this.appsecret)
    // 注册跳转过来
    if (this.$route.query.u) {
      window.localStorage.setItem('appUsername', this.$route.query.u)
      window.localStorage.setItem('appPassword', this.$route.query.p)
    }
    this.username = window.localStorage.getItem('appUsername') || ''
    this.password = window.localStorage.getItem('appPassword') || ''
    // 微信登录
    if (this.$route.query.code) {
      this.code = this.$route.query.code
      this.open(this.code)
    } else {
      if (this.$route.params.route !== 'logout'){
        this.get()
      }
    }
    // 底部跳转到下载页
    let u = navigator.userAgent
    if (u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1
     || u.indexOf('Mac OS X') > -1 || u.indexOf('Browser') > -1) {
      this.isWeixin = true
    }
  },
  methods: {
    get () {
      var ctx = this
      if (this.username === '') { return false }
      if (this.$parent.$refs.loading) {this.$parent.$refs.loading.show()}
      var login = {
        username: this.username,
        password: this.password
      }
      this.$http.post('/rest/api/user/login?' + qs.stringify(login)).then((res) => {
        ctx.$parent.$refs.loading.hide()
        window.localStorage.setItem('appUsername', ctx.username)
        window.localStorage.setItem('appPassword', ctx.password)
        // 清空数据
        ctx.$store.commit('reset')
        ctx.$router.push({path: '/main/home'})
      }).catch((err) => {
        ctx.$parent.$refs.loading.hide()
      })
    },
    // 微信登录
    wxLogin () {
      let ctx = this
      $.ajax({
        type: 'post',
        url: '/rest/api/user/oauthBind',
        data: {
          model: JSON.stringify({
            oauthType: 'weixin',
            openid: ctx.openid, // 必须的
            username: ctx.bind.username, // 企业账号，必填
            password: ctx.bind.password, // 必填
            email: ctx.bind.email
          })
        },
        success: function (res) {
          if (res.success) {
            ctx.$router.push({path: '/main/home'})
          } else {
            window.alert(res.msg)
          }
        }
      })
      // 扫描后 http://www.jihui88.com/member/login.html?openid=oBtE4wSbFxg7nW95t4VfiXG4cjVo&type=0&oauthtype=weixin
    },
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    weixin () {
      // let appid = 'wxa9dd60e0591fbdb2'
      // let appsecret = 'ceaaf7fa6fa7f4b258a20c7c558fcd56'
      // 机汇网
      // let appid = 'wx308c58370e47720c'
      // let appsecret = 'b0d6837d6aa49dbf41aebe12ab3bb73c'
      window.location.href = this.client.getAuthorizeURL('http://m1.jihui88.com/#/login', 'STATE', 'snsapi_base')
      return false
      jsonp('https://api.weixin.qq.com/sns/oauth2/access_token?' + qs.stringify(model), null, function (err, data) {
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
      })
    },
    open (code) {
      let model = {
        appid: this.appid,
        secret: this.appsecret,
        code: code,
        grant_type: 'authorization_code'
      }
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://api.weixin.qq.com/sns/oauth2/access_token?' + qs.stringify(model))
      xhr.onload = function () {
        debugger
        if (xhr.status === 200) {
          // 上传成功
          let result = JSON.parse(xhr.response).attributes
          console.log(result)
          this.result = result
          this.$emit('result', result)
        } else {
          // 处理其他情况
          console.log(xhr.statusText)
        }
      }
      xhr.send(null)
    }
  }
}
</script>
<style scoped>
/*下载广告*/
.f39dsk{background-color:#5f646e;position:fixed;bottom:0;left:0;padding:6px 0 6px 30px;height:42px;line-height:42px;width:100%;box-sizing:border-box;color:#fff;display:flex;display:-webkit-box-flex}
.f39dsk img{width:30px;display:inline-block;vertical-align:top;margin-right:8px;border-radius:3px;height:30px}
.f39dsk .n48-dl{right:0;top:0;position:absolute;align-items:center;color:#fff;background-color:#FF5000;height:42px;text-align:center;font-weight:400;font-size:14px;padding:0 8px}
.f39dsk span{-webkit-box-flex:1;flex:1;display:block;line-height:30px}
.f39dsk .m48{margin:0 8px 0 0;width:30px;height:30px;display:inline-block;vertical-align:top}
</style>
