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
  // setting
  { path: '/setting', component: require('../pages/setting/setting') },
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
  // bind
  { path: '/bind', component: require('../pages/bind/bindList') },
  { path: '/bindAdd', component: require('../pages/bind/bindDetail') },
  // message
  { path: '/message/:id', name: 'messageDetail', component: require('../pages/message/messageDetail') },
  { path: '/member', component: require('../pages/member/member') },
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
