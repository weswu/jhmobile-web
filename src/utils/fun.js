import Vue from 'vue'
// 全局过滤器

// 添加list
Vue.prototype.addAll = function (a, b) {
  if (b.length === 0) return
  for (let i = 0; i < b.length; i++) {
    a.push(b[i])
  }
}
Vue.prototype.scrollList = function (ctx, data) {
  if (data.success) {
    this.addAll(ctx.list, data.attributes.data)
    if (ctx.searchData.page === 1) {
      ctx.count = data.attributes.count
      if (data.attributes.data.length === 0) {
        ctx.busy = true
      }
    }
    ctx.searchData.page += 1
    ctx.searchData.pageSize = ctx.searchData.pageSize || 16
    if (data < ctx.searchData.pageSize) { ctx.refresh = false }
  } else {
    ctx.refresh = false
  }
  ctx.loading = false
}
