<template>
  <div class="inbg">
      <div class="logo">
          <img src="http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/08/9df67a15-7379-4374-b575-3fb6f55efa02.png" alt=""/>
      </div>
      <div class="logo_txt">机汇网管理</div>
      <div class="down_btn">
          <a v-if="andriod" href="http://demo.ykit.net/wytx/jihui.apk" class="andriod down" >立即下载</a>
          <a v-if="ios" class="ios down hide" href="#/down_ios" >查看安装教程</a>
          <a class="down" href="#/login" >进入网页版</a>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ios: false,
      andriod: false
    }
  },
  created () {
    this.get()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'get'
  },
  methods: {
    get () {
      let u = navigator.userAgent
      let ma = '/\\(i[^;]+;( U;)? CPU.+Mac OS X/'
      if (u.match(ma)) {
        this.ios = true
      }
      if (u.indexOf('Android') > -1) {
        this.andriod = true
      }
    }
  }
}
</script>
<style scoped>
.inbg{margin:0;background:#f2f4f6;font-size:20px;padding-top: 3rem;height: 100vh;}
.inbg img{width:100%;display:block}
.inbg a{text-decoration:none}
.inbg .logo{width:5rem;margin:0 auto;border-radius:1rem;overflow:hidden;background-color:#fff;position:relative;}
.down{border-radius:.5rem;background:#3f3f3f;width:8rem;text-align:center;color:#fff;line-height:2.5rem;height:2.5rem;display:block;margin:1rem auto}
.down_btn{margin-top:2rem}
.logo_txt{text-align:center;font-size:.8rem;margin-top:.3rem}
</style>
