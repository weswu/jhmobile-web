<template>
  <div class='wu-infinite-container'>
    <div class="fixed-bar">
      <mu-appbar title='域名绑定'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
        <mu-icon-button icon='add' href='#/bindAdd' slot='right'/>
      </mu-appbar>
    </div>
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item :title="item.address">
          <div class="subContent">
            {{item.type | bindType}} <span v-html="bindState(item.state)"></span>
          </div>
          <div slot="right" @click.stop='del(item.id)'>删除</div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
    <!--提示...-->
    <toast ref="toast"></toast>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      scroller: null,
      refresh: true,
      busy: false,
      searchData: {
        page: 1
      }
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.scroller = this.$el
  },
  watch: {
    $route (to, from) {
      if (to.path === '/bind' && JSON.stringify(to.query).length > 10) {
        this.list.unshift(to.query)
      }
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/bind/list?page=' + this.searchData.page).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    bindState (v) {
      if (v === '00') { return '未审核' }
      if (v === '02') { return '<span style="color:red">审核不通过</span>' }
    },
    del (id) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/bind/detail/' + id).then((res) => {})
        this.list.forEach((item, index, arr) => {
          if (item.id === id) {
            arr.splice(index, 1)
          }
        })
        this.$refs.toast.show('删除成功')
      }
    }
  },
  filters: {
    bindType (v) {
      if (v === 'D') { return '域名' }
      if (v === 'A') { return '地址' }
      if (v === 'I') { return '图片' }
      if (v === 'M') { return '手机' }
    }
  }
}
</script>
