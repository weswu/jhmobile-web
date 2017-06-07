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
  { path: '/login', component: require('../pages/user/login') },
  { path: '/signup', component: require('../pages/user/signup') },
  { path: '/user', component: require('../pages/user/user') },
  { path: '/map', component: require('../pages/user/map') },
  { path: '/enterprise', component: require('../pages/user/enterprise') },
  { path: '/bind', component: require('../pages/bind/bindList') },
  { path: '/bindAdd', component: require('../pages/bind/bindDetail') },
  { path: '/message/:id', name: 'messageDetail', component: require('../pages/message/messageDetail') },
  { path: '/member', component: require('../pages/member/member') },
  { path: '/beian', component: require('../pages/beian/beian') },
  { path: '/redShield', component: require('../pages/beian/redShield') },
  { path: '/miit', component: require('../pages/beian/miit') },
  { path: '/policeRecord', component: require('../pages/beian/policeRecord') },
  { name: 'playerDetail', path: '/playerDetail/:id', component: require('../views/playerDetail') },
  { path: '/playListDetail/:id', name: 'playListDetail', component: require('../views/playListDetail') },
  { path: '*', redirect: '/main/home' }
  ]
})

export default router
