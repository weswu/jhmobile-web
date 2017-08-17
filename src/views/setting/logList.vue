<template>
  <div class='wu-infinite-container'>
    <div class="fixed-bar">
      <mu-appbar title='操作记录'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item :title="item.logStr">
          <div class='subContent'>
            {{item.location}}
          </div>
          <div slot="right">
            {{item.addTime | time('MM-dd hh:mm')}}
          </div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      searchData: {
        page: 1
      },
      search: false,
      loading: false,
      scroller: null,
      refresh: true
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
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/log/list?page=' + this.searchData.page).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    loadMore () {
      this.refresh && this.get()
    }
  }
}
</script>
