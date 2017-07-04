<template>
  <div>
    <mu-appbar>
      <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
      <div class='play-title'>
        <div class='play-name'><span>友情链接<span style='font-size:16px;padding-left:5px' v-if='count != 0'>({{count}})</span></span></div>
      </div>
    </mu-appbar>

    <template v-for='item in list'>
      <mu-list-item :title='item.title' :to="{name: 'messageDetail',params: { id: item.id}}">
        <div class="subContent">
          {{item.addTime}}
        </div>
      </mu-list-item>
      <mu-divider/>
    </template>
     <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      count: 0,
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1,
        pageSize: 10,
        category_id: ''
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/message/list').then((res) => {
        this.scrollList(this, res.data)
        if (this.searchData.page === 1) {
          this.count = res.data.attributes.res.data
        }
      })
    },
    back () {
      this.$router.back()
    },
    loadMore () {
      this.get()
    }
  }
}
</script>
<style lang='less' scoped>
.mu-td-left{
  width: 65px;
}
.mu-td-right{
  width: 120px;
}
</style>
