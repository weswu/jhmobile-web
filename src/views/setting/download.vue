<template>
  <div class="inbg">
    <mu-appbar title='机汇网管理'>
      <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
    </mu-appbar>
    <div class="logo">
      <img src="http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/08/9df67a15-7379-4374-b575-3fb6f55efa02.png" alt=""/>
    </div>
    <div class="logo_txt">机汇网管理</div>
    <div class="down_btn">
      <a v-if="andriod" href="http://demo.ykit.net/wytx/jihui.apk" class="andriod down"><div @click.stop="weixin">立即下载</div></a>
      <a v-if="ios" class="ios down hide" href="#/down_ios" >查看安装教程</a>
      <a class="down" href="#/login" >进入网页版</a>
    </div>
    <div v-if="tips" class="tips" @click="tips = false">
      <img src="http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/08/d87cbb89-f406-43e6-b0e2-09b5a65291da.jpg" alt="" /><br />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ios: false,
      andriod: false,
      tips: false
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      let u = navigator.userAgent
      if (u.indexOf('Mac') > -1 || u.indexOf('OS X') > -1) {
        this.ios = true
      }
      if (u.indexOf('Android') > -1) {
        this.andriod = true
      }
    },
    weixin () {
      if (this.$store.state.isWeixin) {
        this.tips = true
      }
    }
  }
}
</script>
<style scoped>
.inbg{margin:0;background:#f2f4f6;font-size:20px;height: 100vh;}
.inbg img{width:100%;display:block}
.inbg a{text-decoration:none}
.inbg .logo{width:5rem;margin:0 auto;border-radius:1rem;overflow:hidden;background-color:#fff;position:relative;margin-top: 2rem;}
.down{border-radius:.5rem;background:#3f3f3f;width:8rem;text-align:center;color:#fff;line-height:2.5rem;height:2.5rem;display:block;margin:1rem auto}
.down_btn{margin-top:2rem}
.logo_txt{text-align:center;font-size:.8rem;margin-top:.3rem}
.tips{position:absolute;top:0;width:100%;height:100%;background:#efefef}
</style>
