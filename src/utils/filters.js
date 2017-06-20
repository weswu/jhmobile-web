import Vue from 'vue'
// 全局过滤器

// 金额,过滤2位
Vue.filter('price', function (v) {
  var f = parseFloat(v)
  if (isNaN(f)) {
    return
  }
  f = Math.round(v * 100) / 100
  return f
})
// 时间字符格式化
Vue.filter('time', function (value) {
  var length = Math.floor(parseInt(value))
  var minute = Math.floor(value / 60)
  if (minute < 10) {
    minute = '0' + minute
  }
  var second = length % 60
  if (second < 10) {
    second = '0' + second
  }
  return minute + ':' + second
})
