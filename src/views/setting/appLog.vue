<template>
  <div>
    <mu-appbar title='更新记录'>
      <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
    </mu-appbar>
    <mu-timeline lineColor="black" class="p10">
      <mu-timeline-item>
        <span slot="time">2017年 7月 7日</span>
        <span slot="des" class="font12">
          1.版本全面升级<br>
          2.解决图片太大上传不了问题
        </span>
      </mu-timeline-item>
      <mu-timeline-item>
        <mu-icon value="flight_takeoff" color="red" slot="icon"/>
        <span>发布1.1.0版本</span>
      </mu-timeline-item>
      <mu-timeline-item>
        <span slot="time">2016年 1月 1日</span>
        <span slot="des" class="font12">
          1.首页: 页面样式更新<br/>
          2.添加: 店铺数据/我的微传单/我的微分销/相册/服务中心<br/>
          3.设置: 添加账号资料/企业联系人/招聘管理/公司证书/域名绑定/微商城<br>
          4.关于机汇网: 检查版本/官方微信二维码/更新记录
        </span>
      </mu-timeline-item>
      <mu-timeline-item iconColor="red" iconType="dotted">
        <span>发布1.0.0版本</span>
      </mu-timeline-item>
    </mu-timeline>
  </div>
</template>
