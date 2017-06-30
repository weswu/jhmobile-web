<template>
  <div>
    <div class='home-header'>
      <div slot='left' style='width:5rem;float:left;margin-left:0.5rem'>
        <a href='#/enterprise'>
          <img :src='imgUrl + userInfo.logo' @error='setErrorImg' alt='logo'>
        </a>
      </div>
      <div slot='left'>
        <div class='home-user-info'>
          {{user.username}},您好！！<br/>
          <span v-if='userInfo.versions'>当前版本：{{userInfo.versions}}<br/></span>
          <span v-if="userInfo.endTime === '1'">已到期,请续费<br/></span>
          <span v-if="userInfo.endTime && userInfo.endTime != '0'">到期时间：{{userInfo.endTime}}<br/></span>
          服务热线：<a href='tel:4007111011'>400-7111-011</a>
        </div>
        <a href='#/setting' style='position: absolute;top: 15px;right: 15px;color:#fff'><i class='mu-bottom-item-icon mu-icon material-icons'>settings</i></a>
      </div>
    </div>


    <div class='status'>
      <ul>
        <li @click="toOrder('#/order/buyerPayment')" class='app-button'>
          <span class='status_num'>{{userInfo.unpaid}}</span><span class='status_txt'>待付款</span>
        </li>
        <li @click="toOrder('#/order/awaitS')" class='app-button' >
          <span class='status_num op'>{{userInfo.unshipped}}</span> <span class='status_txt'>待发货</span>
        </li>
        <li @click="toOrder('#/order/delivery')" class='app-button' >
          <span class='status_num'> {{userInfo.shipped}}</span><span class='status_txt'>待收货</span>
        </li>
        <li @click="toOrder('#/message/list?recvState=00')" class='app-button'>
          <span class='status_num'>{{userInfo.unread}}</span><span class='status_txt'>未读询盘</span>
         </li>
      </ul>
      <mu-list-item href='#/order'>
        <span slot='title'  style='color: #777'>
          已卖出的货品
        </span>
        <div slot='after'>
          全部订单
        </div>
        <mu-icon value='navigate_next' :size='20' slot='right' color='#aaa'/>
      </mu-list-item>

    </div>
    <div class='hr'></div>
    <mu-flexbox :gutter='0'>
      <mu-flexbox-item class='flex-home' v-for='item in navList1'>
        <a :href='item.url'>
          <i class='mu-bottom-item-icon mu-icon material-icons'>{{item.icon}}</i>
          {{item.name}}
        </a>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-flexbox :gutter='0'>
      <mu-flexbox-item class='flex-home' v-for='item in navList2'>
        <a :href='item.url'>
          <i class='mu-bottom-item-icon mu-icon material-icons'>{{item.icon}}</i>
          {{item.name}}
        </a>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-flexbox :gutter='0'>
      <mu-flexbox-item class='flex-home' v-for='item in navList3'>
        <a :href='item.url'>
          <i class='mu-bottom-item-icon mu-icon material-icons'>{{item.icon}}</i>
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
      user: this.$store.state.user,
      navList1: [
        {url: '#/shopData', name: '商城数据', icon: 'cloud_circle'},
        {url: 'http://m.' + this.$store.state.user.username + '.jihui88.com', name: '微网站', icon: 'settings_cell'},
        {url: '#/wcd/me', name: '微传单', icon: 'wifi_tethering'},
        {url: '#/distribution', name: '微分销', icon: 'settings_input_antenna'}
      ],
      navList2: [
        {url: '#/member', name: '会员管理', icon: 'supervisor_account'},
        {url: '#/video', name: '视频教程', icon: 'video_call'},
        {url: '#/cnzz', name: '流量分析', icon: 'assessment'},
        {url: '#/seo_help', name: 'SEO帮助', icon: 'devices'}
      ],
      navList3: [
        {url: '#/serivepay', name: '服务缴费', icon: 'note'},
        {url: '#/progress', name: '服务进度', icon: 'snooze'},
        {url: '#/point', name: '我的积分', icon: 'featured_play_list'},
        {url: '#/friend', name: '参与推广', icon: 'language'}
      ],
      userInfo: {
        unshipped: 9,
        shipped: 0,
        unread: 6,
        versions: '电商版',
        name: 'jihui88',
        logo: 'upload/j/j2/jihui88/picture/2015/04/04/a6e43943-f0fc-4124-8405-3a16d749175d.gif',
        endTime: '2019-07-17',
        unpaid: 1
      }
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
        this.userInfo = res.data.attributes.data
      })
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    toOrder (e) {
      this.$router.push({path: e})
    }
  }
}
</script>
<style lang='less' scoped>

.home-header{background:url(http://app.jihui88.com/css/img/user-bg.jpg) no-repeat;background-size:cover;overflow:hidden;color:#fff;padding:1rem 0 .5rem 0}
.home-user-info{margin: .5rem;font-size:.6rem;opacity:.9;line-height:1rem;float:left}
.home-user-info a{color:#fff}
.home-header img{width:4rem;height:4rem;margin:.5rem;border-radius:100%;}
.mu-item-title{color:#777}
.flex-home{border-right:1px solid #ededed;border-bottom:1px solid #ededed;text-align:center;padding:10px 0 5px 0}
.flex-home a{color:#666;line-height:2.5;display:block;font-size:.7rem}
.flex-home i{color:#bbb;font-size:1.2rem;width:auto}

.status>ul{overflow: hidden;margin: 0;padding:.3rem 0;border-bottom:1px solid #e5e5e5;display: -webkit-flex;display:-moz-box;display:-webkit-box;display:-moz-flex;display:-ms-flexbox;display:-ms-flex}
.status>ul>li{width: 25%;float: left;-webkit-box-flex:1;-moz-box-flex:1;-webkit-flex:1 1 0%;-moz-flex:1 1 0;-ms-flex:1 1 0%;flex:1 1 0%;display:block;padding:.3rem 0}
.status_num,.status_txt{display:block;line-height:1.5;text-align:center;color:#bbb}
.status_txt{color:#999}.status_num{font-size:.8rem}
.status .mu-badge{color:#999}
</style>
