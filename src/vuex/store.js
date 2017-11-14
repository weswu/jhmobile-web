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
		employee: {},
		user: {},
		userInfo: {},
		enterprise: {},
		point: {},
		memberRankList: [],
		productCategoryList: [],
		newsCategoryList: [],
    nodeApiUrl: 'https://nodejs-api-cutckaazzs.now.sh' // nodejs接口地址
	},
	getters: {
		employee: state => state.employee,
		user: state => state.user,
		userInfo: state => state.userInfo,
		enterprise: state => state.enterprise,
		point: state => state.point,
		memberRankList: state => state.memberRankList,
		productCategoryList: state => state.productCategoryList,
		newsCategoryList: state => state.newsCategoryList,
		albumCategoryList: state => state.newsCategoryList
	},
	mutations: {
		setEmployee (state, employee) {
			state.employee = employee
		},
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
		},
		setProductCategoryList (state, productCategoryList) {
			state.productCategoryList = productCategoryList
		},
		setNewsCategoryList (state, newsCategoryList) {
			state.newsCategoryList = newsCategoryList
		},
		setAlbumCategoryList (state, albumCategoryList) {
			state.albumCategoryList = albumCategoryList
		},
		reset (state) {
			state.employee = {}
			state.user = {}
			state.userInfo = {}
			state.enterprise = {}
			state.point = {}
			state.memberRankList = []
			state.productCategoryList = []
			state.newsCategoryList = []
			state.albumCategoryList = []
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
