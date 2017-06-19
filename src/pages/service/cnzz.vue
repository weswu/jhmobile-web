<template>
  <div>
    <mu-appbar title='流量分析'>
      <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
    </mu-appbar>

    <div class="container">
        <div class="logo">
            <img src="http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/10/d3f9136d-9738-46d0-a6dc-59b78dd90d44.png" alt="">
        </div>
        <div class="logo_txt">
            CNZZ
        </div>
        <div class="down_btn">
            <a href="https://itunes.apple.com/cn/app/cnzz/id710500922?mt=8" class="ios">ios版</a>
            <a href="http://demo.ykit.net/wytx/cnzz.apk" target="_blank" class="android">安卓版</a>
        </div>
        <div class="chaxun">
            <i class="material-icons" style="vertical-align: middle;">lightbulb_outline</i> 暂无法接入第三方统计，请下载统计app<br>
            查询登录帐号请联系：<a href="tel:4007111011">4007111011</a>
        </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      iframe1: false,
      iframe2: false,
      iframe3: false,
      iframe4: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.container{overflow:hidden;background:#f2f4f6}
.container img{display:block;width:100%}
.container a{text-decoration:none}
.logo{position:relative;overflow:hidden;margin:0 auto;margin-top:2rem;width:5rem;border-radius:1rem;background-color:#fff}
.down_btn a{display:block;margin:1rem auto;width:8rem;height:2.5rem;border-radius:.5rem;background:#3f3f3f;color:#fff;text-align:center;font-size:1rem;line-height:2.5rem}
.logo_txt{margin-top:.3rem;text-align:center;font-size:.8rem}
.chaxun{text-align:center;margin:2rem 0;color:#999;font-size:.7rem}
</style>
