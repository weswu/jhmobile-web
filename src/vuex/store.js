import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 设备
window.ua = navigator.userAgent.toLowerCase()
// 存储数据
const state = {
  state: {
    isWeixin: !!window.ua.match(/MicroMessenger/i), // 微信浏览器
    errImgUrl: 'http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/04/cb46a5be-9960-4c96-a463-895e7948c415.png', // 破图
    imgUrl: 'http://img.jihui88.com/', // 图片域名地址
    wcdImgUrl: 'http://wcd.jihui88.com/leaflet/images/nopic.png', // 微传单空图片
    user: {},
    userInfo: {},
    enterprise: {},
    point: {},
    memberRank: []
  },
  getters: {
    user: state => state.user,
    userInfo: state => state.userInfo,
    enterprise: state => state.enterprise,
    point: state => state.point,
    memberRank: state => state.memberRank
  },
  mutations: {
    setUser (state, user) {
			state.user = user
		}
  },
  // 异步的数据操作
  actions: {
    setUser ({commit}, user) {
			commit('setUser', user)
		}
  }
}

export default state
