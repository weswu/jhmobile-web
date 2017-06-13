<template>
  <div>
    <mu-row gutter class="home-header">
      <mu-col width="30" tablet="20" desktop="15">
        <a href="#/enterprise"><img src="http://img.jihui88.com/upload/j/j2/jihui88/picture/2015/04/04/a6e43943-f0fc-4124-8405-3a16d749175d_5.gif" alt="logo"
          style="width:85px;height:85px;margin: 15px; border-radius: 100%;"></a>
      </mu-col>
      <mu-col width="70" tablet="40" desktop="35">
        <div class="home-user-info">
          {{user.username}},您好！！<br/>
          当前版本：电商版<br/>
          到期时间：电商版<br/>
          服务热线：<a href="tel:4007111011">400-7111-011</a>
        </div>
        <a href="#/setting" style="position: absolute;top: 15px;right: 15px;color:#fff"><i class="mu-bottom-item-icon mu-icon material-icons">settings</i></a>
      </mu-col>
    </mu-row>

    <div class="status">
      <ul>
        <li @click="toOrder('#/order/buyerPayment')" class="app-button">
          <span class="status_num">{{unpaid}}</span><span class="status_txt">待付款</span>
        </li>
        <li @click="toOrder('#/order/awaitS')" class="app-button" >
          <span class="status_num op">{{unshipped}}</span> <span class="status_txt">待发货</span>
        </li>
        <li @click="toOrder('#/order/delivery')" class="app-button" >
          <span class="status_num"> {{shipped}}</span><span class="status_txt">待收货</span>
        </li>
        <li @click="toOrder('#/message/list?recvState=00')" class="app-button">
          <span class="status_num">{{unread}}</span><span class="status_txt">未读询盘</span>
         </li>
      </ul>
      <mu-list-item  title="已卖出的货品" href="#/order">
        <div slot="after">
          全部订单
        </div>
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
    </div>
    <div class="hr"></div>
    <mu-flexbox :gutter="0">
      <mu-flexbox-item class="flex-home" v-for="item in navList1">
        <a :href="item.url">
          <i class="mu-bottom-item-icon mu-icon material-icons">{{item.icon}}</i>
          {{item.name}}
        </a>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-flexbox :gutter="0">
      <mu-flexbox-item class="flex-home" v-for="item in navList2">
        <a :href="item.url">
          <i class="mu-bottom-item-icon mu-icon material-icons">{{item.icon}}</i>
          {{item.name}}
        </a>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-flexbox :gutter="0">
      <mu-flexbox-item class="flex-home" v-for="item in navList3">
        <a :href="item.url">
          <i class="mu-bottom-item-icon mu-icon material-icons">{{item.icon}}</i>
          {{item.name}}
        </a>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>
<script>
import api from '../../api'
export default {
  data () {
    return {
      user: {},
      navList1: [
        {url: '#/data', name: '商城数据', icon: 'cloud_circle'},
        {url: 'jvascript:;', name: '微网站', icon: 'settings_cell'},
        {url: '#/wcd', name: '微传单', icon: 'wifi_tethering'},
        {url: '#/distributor', name: '微分销', icon: 'settings_input_antenna'}
      ],
      navList2: [
        {url: '#/member', name: '会员管理', icon: 'supervisor_account'},
        {url: '#/video', name: '视频教程', icon: 'video_call'},
        {url: '#/cnzz', name: '流量分析', icon: 'assessment'},
        {url: '#/seo', name: 'SEO帮助', icon: 'devices'}
      ],
      navList3: [
        {url: '#/serivepay', name: '服务缴费', icon: 'note'},
        {url: '#/progress', name: '服务进度', icon: 'snooze'},
        {url: '#/point', name: '我的积分', icon: 'featured_play_list'},
        {url: '#/friend', name: '参与推广', icon: 'language'}
      ],
      unpaid: 0,
      unshipped: 0,
      shipped: 0,
      unread: 0,
      shop: {}
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      let _this = this
      this.$http.get(api.getUser()).then((res) => {
        this.user = res.data.attributes.data
        this.$store.state.user = this.user
      })
      setTimeout(function () {
        _this.$http.get(api.getEnterprise()).then((res) => {
          _this.$store.state.enterprise = res.data.attributes.data
        })
      }, 500)
      this.$http.get(api.getOrderInfo()).then((res) => {
        this.shop = res.data.attributes.data
      })
    },
    toOrder (e) {
      this.$router.push({path: e})
    }
  }
}
</script>
<style lang="less" scoped>
.flex-home{
  border-right: 1px solid #ededed;
border-bottom: 1px solid #ededed;text-align: center;padding: 10px 0 5px 0;
}
.flex-home a{
  color:#666;    line-height: 2.5;display: block
}
.flex-home i{
   color: #bbb;
}
.home-header{
  background: url(http://app.jihui88.com/css/img/user-bg.jpg) no-repeat;
background-size: cover;
overflow: hidden;
color:#fff
}
.home-user-info{
margin:20px 10px;    font-size: 12px;
    opacity: 0.9;
}
.home-user-info a{
color:#fff
}

.status>ul{margin: 0;padding:.5rem;border-bottom:1px solid #e5e5e5;display:-moz-box;display:-webkit-box;display:-webkit-flex;display:-moz-flex;display:-ms-flexbox;display:-ms-flex}
.status>ul>li{-webkit-box-flex:1;-moz-box-flex:1;-webkit-flex:1 1 0%;-moz-flex:1 1 0;-ms-flex:1 1 0%;flex:1 1 0%;display:block;padding:.5rem 0}
.status_num,.status_txt{display:block;line-height:1.5;text-align:center;}
.status_txt{opacity:.8}.status_num{font-size:.8rem}
.status .mu-badge{color:#999}
</style>
