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
  }, {
    path: '/main',
    component: require('../views/main')
  }, {
    path: '/beian',
    component: require('../views/beian')
  }, {
    path: '/redShield',
    component: require('../views/redShield')
  }, {
    path: '/miit',
    component: require('../views/miit')
  }, {
    path: '/policeRecord',
    component: require('../views/policeRecord')
  }, {
    name: 'playerDetail',
    path: '/playerDetail/:id',
    component: require('../views/playerDetail')
  }, {
    path: '/playListDetail/:id',
    name: 'playListDetail',
    component: require('../views/playListDetail')
  }, {
    path: '*', redirect: '/main'
  }]
})

export default router
