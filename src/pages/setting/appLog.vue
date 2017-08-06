<template>
  <div>
    <mu-appbar title='更新记录'>
      <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
    </mu-appbar>
    <section class="section">
      <div class="title">机汇网App 1.2.0 功能介绍</div>
      <div class="content">
        1.版本全面升级<br>
        2.解决图片太大上传不了问题
			</div>
    </section>
    <div class="hr"></div>
    <section class="section">
      <div class="title">机汇网App 1.1.0 功能介绍</div>
      <div class="content">
        首页: 页面样式更新，添加店铺数据/我的微传单/我的微分销/相册/服务中心<br>
        设置: 添加账号资料/企业联系人/招聘管理/公司证书/域名绑定/微商城<br>
        关于机汇网: 检查版本/官方微信二维码/更新记录
			</div>
      </section>

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
<style scoped>
.section .title {
    padding: 0.5rem;
    font-size: 0.8rem;
    color: #000;
}
.section .content {
    padding: 0.5rem;
    font-size: 0.6rem;
    color: #666;
    line-height: 0.8rem;
}
</style>
