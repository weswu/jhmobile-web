<template>
  <div class='wu-infinite-container'>
    <div class="fixed-bar">
      <mu-appbar title='友情链接'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
        <mu-icon-button icon='add' href='#/linkAdd' slot='right'/>
      </mu-appbar>
    </div>
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item :title='item.name' @click='detail(item.id)'>
          <div class='subContent'>
            {{item.url}}
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.list = []
      vm.searchData.page = 1
      vm.get()
    })
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/link/list?page=' + this.searchData.page).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    detail (id) {
      this.$router.push({path: '/link/' + id})
    },
    del (id) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/link/detail/' + id).then((res) => {})
        this.list.forEach((item, index, arr) => {
          if (item.id === id) {
            arr.splice(index, 1)
          }
        })
        this.$refs.toast.show('删除成功')
        this.count = this.count - 1
      }
    }
  }
}
</script>
