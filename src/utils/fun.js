import Vue from 'vue'
// 全局过滤器

/*
 * @author: wes
 * @date: 2017-7-7
 * @desc: 数组相加
*/
Vue.prototype.addAll = function (a, b) {
  if (b.length === 0) return
  for (let i = 0; i < b.length; i++) {
    a.push(b[i])
  }
}
/*
 * @author: wes
 * @date: 2017-7-7
 * @desc: 滚动加载数据
*/
Vue.prototype.scrollList = function (ctx, data) {
  if (data.success) {
    this.addAll(ctx.list, data.attributes.data)
    if (ctx.searchData.page === 1) {
      ctx.count = data.attributes.count
      if (data.attributes.data.length === 0) {
        ctx.busy = true
      } else {
        ctx.busy = false
      }
    }
    ctx.searchData.page += 1
    ctx.searchData.pageSize = ctx.searchData.pageSize || 16
    if (data.attributes.data.length < ctx.searchData.pageSize) { ctx.refresh = false } else { ctx.refresh = true }
  } else {
    ctx.refresh = false
  }
  ctx.loading = false
}
