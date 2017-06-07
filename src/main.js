import Vue from 'vue'
import App from './App'
import Axios from './utils/diyaxios'
import router from './router/router'
import store from './store'
// 注册为全局组件
import toast from './components/toast.vue'
import MuseUI from 'muse-ui'
import Cookie from 'vue-cookie'
import 'muse-ui/dist/muse-ui.css'
import 'assets/theme.less'
// 开启debug模式
Vue.config.debug = true
// use
Vue.use(MuseUI)
Vue.prototype.$http = Axios // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
Vue.prototype.$cookie = Cookie
Vue.component('Toast', toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
