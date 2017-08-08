<template>
  <div>
    <div class='home-header'>
      <div slot='left' style='width:5rem;float:left;margin-left:0.5rem'>
        <a href='#/enterprise'>
          <img :src='imgUrl + enterprise.logo' @error='setErrorImg'>
        </a>
      </div>
      <div slot='left'>
        <div class='home-user-info'>
          {{user.username}},您好！<br/>
          <span v-if='userInfo.versions'>当前版本：{{userInfo.versions}}<br/></span>
          <span v-if="userInfo.endTime === '1'">已到期,请续费<br/></span>
          <span v-else="userInfo.endTime && userInfo.endTime != '0'">到期时间：{{userInfo.endTime}}<br/></span>
          服务热线：<a href='tel:4007111011'>400-7111-011</a>
        </div>
        <a href='#/setting' style='position: absolute;top: 15px;right: 15px;color:#fff'><i class='mu-bottom-item-icon mu-icon material-icons'>settings</i></a>
      </div>
    </div>

    <div class='status'>
      <ul>
        <li @click="page('/order/buyerPayment')" class='app-button'>
          <span class='status_num'>{{userInfo.unpaid}}</span><span class='status_txt'>待付款</span>
        </li>
        <li @click="page('/order/awaitS')" class='app-button' >
          <span class='status_num op'>{{userInfo.unshipped}}</span> <span class='status_txt'>待发货</span>
        </li>
        <li @click="page('/order/delivery')" class='app-button' >
          <span class='status_num'> {{userInfo.shipped}}</span><span class='status_txt'>待收货</span>
        </li>
        <li @click="page('/messageList/00')" class='app-button'>
          <span class='status_num'>{{userInfo.unread}}</span><span class='status_txt'>未读询盘</span>
         </li>
      </ul>
      <mu-list-item href='#/order/all'>
        <span slot='title' style='color: #777'>已卖出的货品</span>
        <div slot='after'>全部订单</div>
        <mu-icon value='navigate_next' :size='20' slot='right' color='#aaa'/>
      </mu-list-item>

    </div>
    <div class='hr'></div>
    <mu-flexbox :gutter='0'>
      <mu-flexbox-item class='flex-home' v-for='item in navList1'>
        <a :href='item.url'>
          <i :class="'iconfont icon-'+item.icon" :style="'color:'+item.color"></i>
          {{item.name}}
        </a>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-flexbox :gutter='0'>
      <mu-flexbox-item class='flex-home' v-for='item in navList2'>
        <a :href='item.url'>
          <i :class="'iconfont icon-'+item.icon" :style="'color:'+item.color"></i>
          {{item.name}}
        </a>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-flexbox :gutter='0' style="padding-bottom: 3rem;">
      <mu-flexbox-item class='flex-home' v-for='item in navList3'>
        <a :href='item.url'>
          <i :class="'iconfont icon-'+item.icon" :style="'color:'+item.color"></i>
          {{item.name}}
        </a>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: this.$store.state.user,
      userInfo: {},
      enterprise: {},
      imgUrl: this.$store.state.imgUrl,
      navList1: [
        {url: '#/shopData', name: '商城数据', icon: 'tongji', color: '#5bba19'},
        {url: '#/mobile/me', name: '微网站', icon: 'weiwangzhan', color: '#8da5cb'},
        {url: '#/wcd/me', name: '微传单', icon: 'weizhan', color: '#FF6000'},
        {url: '#/distribution/member', name: '微分销', icon: 'fenxiao', color: '#8da5cb'}
      ],
      navList2: [
        {url: '#/member', name: '会员管理', icon: 'huiyuan', color: '#52abec'},
        {url: '#/video', name: '视频教程', icon: 'shipin', color: '#FF6000'},
        {url: '#/cnzz', name: '流量分析', icon: 'fenxi', color: '#8da5cb'},
        {url: '#/seo_help', name: 'SEO帮助', icon: 'seo', color: '#5bba19'}
      ],
      navList3: [
        {url: '#/serivepay/payment', name: '服务缴费', icon: 'jiaofei', color: '#FF6000'},
        {url: '#/serive_progress', name: '服务进度', icon: 'f12', color: '#8da5cb'},
        {url: '#/point', name: '我的积分', icon: 'xinwen', color: '#5bba19'},
        {url: '#/spread', name: '参与推广', icon: 'pengyou', color: '#f69215'}
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  },
  methods: {
    get () {
      let _this = this
      if (!this.$store.state.user.username) {
        this.$http.get('/rest/api/user/detail').then((res) => {
          this.user = res.data.attributes.data
          this.$store.state.user = this.user
        })
      }
      if (!this.$store.state.userInfo.name) {
        this.$http.get('/rest/api/order/home/list').then((res) => {
          this.userInfo = res.data.attributes
          this.$store.state.userInfo = this.userInfo
        })
      }
      if (!this.$store.state.enterprise.name) {
        setTimeout(function () {
          _this.$http.get('/rest/api/enterprise/detail').then((res) => {
            _this.enterprise = res.data.attributes.data
            _this.$store.state.enterprise = _this.enterprise
          })
        }, 100)
      }
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    page (e) {
      this.$router.push({path: e})
    }
  }
}
</script>
<style scoped>
.home-header{position: relative;background:url(/../../../static/img/user-bg.jpg) no-repeat;background-size:cover;overflow:hidden;color:#fff;padding:1rem 0 .5rem 0}
.home-user-info{margin: .5rem;font-size:.6rem;opacity:.9;line-height:1rem;float:left}
.home-user-info a{color:#fff}
.home-header img{width:4rem;height:4rem;margin:.5rem;border-radius:100%;}
.mu-item-title{color:#777}
.flex-home{border-right:1px solid #ededed;border-bottom:1px solid #ededed;text-align:center;}
.flex-home a{color:#666;line-height:2.5;display:block;font-size:.7rem}
.flex-home i{color:#bbb;font-size:1.2rem;width: auto;
    display: block;
    margin: 0 auto;
    line-height: 1.6rem;
    padding: .5rem .5rem 0 .5rem;
    background: #fff;}

.status>ul{overflow: hidden;margin: 0;padding:.3rem 0;border-bottom:1px solid #e5e5e5;display: -webkit-flex;display:-moz-box;display:-webkit-box;display:-moz-flex;display:-ms-flexbox;display:-ms-flex}
.status>ul>li{width: 25%;float: left;-webkit-box-flex:1;-moz-box-flex:1;-webkit-flex:1 1 0%;-moz-flex:1 1 0;-ms-flex:1 1 0%;flex:1 1 0%;display:block;padding:.3rem 0}
.status_num,.status_txt{display:block;line-height:1.5;text-align:center;color:#bbb}
.status_txt{color:#999}.status_num{font-size:.8rem}
.status .mu-badge{color:#999}
</style>
