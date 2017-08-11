import Vue from 'vue'
import router from './router/routers'
import store from './vuex/store'
import MuseUI from 'muse-ui'
import VueRouter from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
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
Vue.use(MuseUI)
Vue.use(VueRouter)
Vue.use(VueQuillEditor)
// 注册为全局组件
import toast from './components/toast.vue'
import loading from './components/loading.vue'
import toppopup from './components/toppopup.vue'
Vue.component('Loading', loading)
Vue.component('Toast', toast)
Vue.component('Toppopup', toppopup)
/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
