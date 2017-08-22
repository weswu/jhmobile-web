import Vue from 'vue'
import router from './router/routers'
import store from './vuex/store'
import './utils/filters'
import './utils/fun'
import 'muse-ui/dist/muse-ui.css'
import 'assets/theme.less'
// 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
import Axios from './utils/diyaxios'
import Cookie from 'vue-cookie'
Vue.prototype.$http = Axios
Vue.prototype.$cookie = Cookie
// 开启debug模式
Vue.config.debug = true
// use
import MuseUI from 'muse-ui'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(MuseUI)
Vue.use(VueQuillEditor)
// 注册为全局组件 只能首字母大写或者全小写
import toast from './components/toast.vue'
import loading from './components/loading.vue'
import topPopup from './components/topPopup.vue'
Vue.component('loading', loading)
Vue.component('toast', toast)
Vue.component('toppopup', topPopup)
/*
 * 问题
 * 1.ios7 new Vuex()后就显示空白页面
 * 2.ios7 登录不能成功
 *
 */
/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
