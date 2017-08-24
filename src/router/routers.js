/**
 * 整个app的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routers = new VueRouter({
  routes: [{
  path: '/main',
    component: require('../views/main/main'),
    children: [
      { path: 'home', component: require('../views/main/home') },
      { path: 'info', component: require('../views/main/info') },
      { path: 'message', component: require('../views/message/message') },
      { path: 'me', component: require('../views/main/me') }
    ]
  },
  // user
  { path: '/login', component: require('../views/user/login') },
  { path: '/signup', component: require('../views/user/signup') },
  { path: '/user', component: require('../views/user/user') },
  { path: '/map', component: require('../views/user/map') },
  { path: '/enterprise', component: require('../views/user/enterprise') },
  { path: '/publish', component: require('../views/user/publish') },
  // 产品
  { path: '/product', component: require('../views/product/productList') },
  { path: '/product/:id', component: require('../views/product/productDetail') },
  { path: '/productAdd', component: require('../views/product/productDetail') },
  // 新闻
  { path: '/news', component: require('../views/news/newsList') },
  { path: '/news/:id', component: require('../views/news/newsDetail') },
  { path: '/newsAdd', component: require('../views/news/newsDetail') },
  // 分类
  { path: '/category/:id', component: require('../views/category/categoryList') },
  { path: '/categoryAdd/:id', component: require('../views/category/categoryDetail') },
  // 大数据
  { path: '/shopData', component: require('../views/shop/data') },
  { path: '/data_p_q', component: require('../views/shop/data_purchase_quantity') },
  { path: '/data_p_a', component: require('../views/shop/data_purchase_amount') },
  // 订单
  { path: '/order/:flag', component: require('../views/order/order') },
  { path: '/order/detail/:id', component: require('../views/order/detail') },
  { path: '/order/price/:id', component: require('../views/order/price') },
  { path: '/order/send/:id', component: require('../views/order/send') },
  { path: '/order/shipments/:id', component: require('../views/order/shipments') },
  // 手机网站
  { path: '/mobile',
    component: require('../views/mobile/mobile'),
    children: [
      { path: 'me', component: require('../views/mobile/me') },
      { path: 'case', component: require('../views/mobile/case') }
    ], meta: {keepAlive: false}
  },
  { path: '/mobile/:id', component: require('../views/mobile/mobileOpen') },
  // 微传单
  { path: '/wcd',
    component: require('../views/wcd/wcd'),
    children: [
      { path: 'vip', component: require('../views/wcd/vip') },
      { path: 'case', component: require('../views/wcd/case') },
      { path: 'me', component: require('../views/wcd/me') }
    ]
  },
  { path: '/wcd_open/:id', component: require('../views/wcd/wcdOpen') },
  // 三级分销
  { path: '/distribution',
    component: require('../views/distribution/distribution'),
    children: [
      { path: 'member', component: require('../views/distribution/member') },
      { path: 'data', component: require('../views/distribution/data') },
      { path: 'bouns', component: require('../views/distribution/bouns') }
    ]
  },
  // 服务缴费
  { path: '/serivepay',
    component: require('../views/serivepay/pay'),
    children: [
      { path: 'payment', component: require('../views/serivepay/payment') },
      { path: 'history', component: require('../views/serivepay/history') },
      { path: 'serviceRecord', component: require('../views/serivepay/serviceRecord') },
      { path: 'goods', component: require('../views/serivepay/goods') }
    ]
  },
  { path: '/mypay', component: require('../views/serivepay/mypay') },
  // 服务进度
  { path: '/serive_progress', component: require('../views/service/progress/progress') },
  { path: '/serive_progress/:id', name: 'progressDetail', component: require('../views/service/progress/progressDetail') },
  // 积分
  { path: '/point', component: require('../views/point/point') },
  { path: '/point_rule', component: require('../views/point/rule') },
  { path: '/point_ranking', component: require('../views/point/ranking') },
  { path: '/point_detail', component: require('../views/point/detail') },
  { path: '/point_exchange', component: require('../views/point/exchange') },
  // 参与推广
  { path: '/spread', component: require('../views/spread/spread') },
  { path: '/spreadRank', component: require('../views/spread/rank') },
  // bind
  { path: '/bind', component: require('../views/bind/bindList') },
  { path: '/bindAdd', component: require('../views/bind/bindDetail') },
  // link
  { path: '/link', component: require('../views/link/linkList'), meta: {keepAlive: true} },
  { path: '/linkAdd', component: require('../views/link/linkDetail') },
  { path: '/link/:id', component: require('../views/link/linkDetail') },
  // cert
  { path: '/cert', component: require('../views/cert/certList') },
  { path: '/certAdd', component: require('../views/cert/certDetail') },
  { path: '/cert/:id', component: require('../views/cert/certDetail') },
  // message
  { path: '/messageBind', component: require('../views/message/messageBind') },
  { path: '/messageList/:recvState', component: require('../views/message/message') },
  { path: '/message/:id', name: 'messageDetail', component: require('../views/message/messageDetail') },
  // 会员
  { path: '/member', component: require('../views/member/memberList') },
  { path: '/memberAdd', component: require('../views/member/memberDetail') },
  { path: '/member/:id', component: require('../views/member/memberDetail') },
  { path: '/memberRank', component: require('../views/member/memberRank') },
  { path: '/memberRankAdd', component: require('../views/member/memberRankDetail') },
  { path: '/memberRank/:id', component: require('../views/member/memberRankDetail') },
  // seo
  { path: '/seo/:id', name: 'seoDetail', component: require('../views/seo/seoDetail') },
  // setting
  { path: '/setting', component: require('../views/setting/setting') },
  { path: '/account', component: require('../views/setting/account') },
  { path: '/service_feedback', component: require('../views/setting/serviceFeedback') },
  { path: '/log', component: require('../views/setting/logList') },
  { path: '/sale', component: require('../views/setting/sale') },
  { path: '/about', component: require('../views/setting/about') },
  { path: '/password', component: require('../views/setting/password') },
  { path: '/app_log', component: require('../views/setting/appLog') },
  { path: '/download', component: require('../views/setting/download') },
  { path: '/down_ios', component: require('../views/setting/down_ios') },
  // 服务
  { path: '/service', component: require('../views/service/service') },
  { path: '/video', component: require('../views/service/video') },
  { path: '/cnzz', component: require('../views/service/cnzz') },
  { path: '/seo_help', component: require('../views/service/seoHelp') },
  { path: '/faq', component: require('../views/service/faq') },
  { path: '/faq1', component: require('../views/service/faq/faq1') },
  { path: '/faq2', component: require('../views/service/faq/faq2') },
  // beian
  { path: '/beian', component: require('../views/beian/beian') },
  { path: '/redShield', component: require('../views/beian/redShield') },
  { path: '/miit', component: require('../views/beian/miit') },
  { path: '/policeRecord', component: require('../views/beian/policeRecord') },
  // default
  { path: '*', redirect: '/main/home' }
  ]
})

export default routers
