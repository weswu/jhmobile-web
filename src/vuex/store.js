import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 存储数据
window.ua = navigator.userAgent.toLowerCase()
const store = new Vuex.Store({
	state: {
		isWeixin: !!window.ua.match(/MicroMessenger/i), // 微信浏览器
		errImgUrl: 'http://img.easthardware.com/upload/j/j2/jihui/picture/2015/12/04/cb46a5be-9960-4c96-a463-895e7948c415.png', // 破图
		imgUrl: 'http://img.jihui88.com/', // 图片域名地址
		wcdImgUrl: 'http://wcd.jihui88.com/leaflet/images/nopic.png', // 微传单空图片
		user: {},
		userInfo: {},
		enterprise: {},
		point: {},
		memberRankList: []
	},
	getters: {
		user: state => state.user,
		userInfo: state => state.userInfo,
		enterprise: state => state.enterprise,
		point: state => state.point,
		memberRankList: state => state.memberRankList
	},
	mutations: {
		setUser (state, user) {
			state.user = user
		},
		setUserInfo (state, userInfo) {
			state.userInfo = userInfo
		},
		setEnterprise (state, enterprise) {
			state.enterprise = enterprise
		},
		setPoint (state, point) {
			state.point = point
		},
		setMemberRankList (state, memberRankList) {
			state.memberRankList = memberRankList
		}
	},
	// 异步的数据操作
	actions: {
		setUser ({commit}, user) {
			commit('setUser', user)
		}
	}
})

export default store
