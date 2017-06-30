/**
 * 整个app的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/index',
    component: require('../views/index'),
    children: [
      {
        path: 'rage',
        component: require('../views/rage')
      },
      {
        path: 'songList',
        component: require('../views/songList')
      }
    ]
  },
  { path: '/main',
    component: require('../pages/main/main'),
    children: [
      { path: 'home', component: require('../pages/main/home') },
      { path: 'info', component: require('../pages/main/info') },
      { path: 'message', component: require('../pages/message/message') },
      { path: 'me', component: require('../pages/main/me') }
    ]
  },
  // user
  { path: '/login', component: require('../pages/user/login') },
  { path: '/signup', component: require('../pages/user/signup') },
  { path: '/user', component: require('../pages/user/user') },
  { path: '/map', component: require('../pages/user/map') },
  { path: '/enterprise', component: require('../pages/user/enterprise') },
  { path: '/publish', component: require('../pages/user/publish') },
  // product
  { path: '/product', component: require('../pages/product/productList') },
  { path: '/product/:id', component: require('../pages/product/productDetail') },
  { path: '/productAdd', component: require('../pages/product/productDetail') },
  // news
  { path: '/news', component: require('../pages/news/newsList') },
  { path: '/news/:id', component: require('../pages/news/newsDetail') },
  { path: '/newsAdd', component: require('../pages/news/newsDetail') },
  // category
  { path: '/category/:id', component: require('../pages/category/categoryList') },
  { path: '/categoryAdd/:id', component: require('../pages/category/categoryDetail') },
  // shop
  { path: '/shopData', component: require('../pages/shop/data') },
  { path: '/data_p_q', component: require('../pages/shop/data_purchase_quantity') },
  { path: '/data_p_a', component: require('../pages/shop/data_purchase_amount') },
  // wcd
  { path: '/wcd',
    component: require('../pages/wcd/wcd'),
    children: [
      { path: 'vip', component: require('../pages/wcd/vip') },
      { path: 'case', component: require('../pages/wcd/case') },
      { path: 'me', component: require('../pages/wcd/me') }
    ]
  },
  { path: '/wcd_open/:id', component: require('../pages/wcd/wcdOpen') },
  // 三级分销
  { path: '/distribution',
    component: require('../pages/distribution/distribution'),
    children: [
      { path: 'member', component: require('../pages/distribution/member') },
      { path: 'data', component: require('../pages/distribution/data') },
      { path: 'bouns', component: require('../pages/distribution/bouns') }
    ]
  },
  // bind
  { path: '/bind', component: require('../pages/bind/bindList') },
  { path: '/bindAdd', component: require('../pages/bind/bindDetail') },
  // message
  { path: '/message/:id', name: 'messageDetail', component: require('../pages/message/messageDetail') },
  // 会员
  { path: '/member', component: require('../pages/member/memberList') },
  // setting
  { path: '/setting', component: require('../pages/setting/setting') },
  { path: '/account', component: require('../pages/setting/account') },
  { path: '/service_feedback', component: require('../pages/setting/serviceFeedback') },
  { path: '/log', component: require('../pages/setting/logList') },
  { path: '/sale', component: require('../pages/setting/sale') },
  { path: '/about', component: require('../pages/setting/about') },
  { path: '/password', component: require('../pages/setting/password') },
  // 服务
  { path: '/service', component: require('../pages/service/service') },
  { path: '/video', component: require('../pages/service/video') },
  { path: '/cnzz', component: require('../pages/service/cnzz') },
  { path: '/seo_help', component: require('../pages/service/seoHelp') },
  { path: '/faq', component: require('../pages/service/faq') },
  { path: '/faq1', component: require('../pages/service/faq/faq1') },
  { path: '/faq2', component: require('../pages/service/faq/faq2') },
  // beian
  { path: '/beian', component: require('../pages/beian/beian') },
  { path: '/redShield', component: require('../pages/beian/redShield') },
  { path: '/miit', component: require('../pages/beian/miit') },
  { path: '/policeRecord', component: require('../pages/beian/policeRecord') },
  // other
  { name: 'playerDetail', path: '/playerDetail/:id', component: require('../views/playerDetail') },
  { path: '/playListDetail/:id', name: 'playListDetail', component: require('../views/playListDetail') },
  { path: '*', redirect: '/main/home' }
  ]
})

export default router
