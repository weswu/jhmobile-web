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
      },
      {
        path: 'leaderBoard',
        component: require('../views/leaderBoard')
      },
      {
        path: 'hotSinger',
        component: require('../views/hotSinger')
      }
    ]
  },
  { path: '/main',
    component: require('../pages/main/main'),
    children: [
      { path: 'home', component: require('../pages/main/home') },
      { path: 'info', component: require('../pages/main/info') },
      { path: 'message', component: require('../pages/main/message') },
      { path: 'me', component: require('../pages/main/me') }
    ]
  },
  { path: '/login', component: require('../views/login') },
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
