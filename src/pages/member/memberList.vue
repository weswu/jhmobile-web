<template>
  <div class='wu-infinite-container'>
    <mu-appbar class='wu-appbar'>
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      <mu-icon-button icon='search' slot='right' @click='search = !search'/>
      <div class='play-title'>
        会员管理<span style='font-size:16px;padding-left:5px' v-show='count'>({{count}})</span>
      </div>
    </mu-appbar>
    <transition name='fade'>
      <div class='header-search' v-show='search'>
        <mu-text-field class='appbar-search-field' slot='left' v-model='searchData.name' hintText='请输入用户名'/>
        <mu-icon-button icon='search' slot='right' @click='searchKey'/>
      </div>
    </transition>

    <div class='pt56 demo-refresh-container'>
      <mu-list>
        <template v-for='item in list'>
          <mu-list-item data-type="pc" :title="item.name || item.username">
            <div class="subContent">
              {{item.addTime}}
            </div>
            <div slot="right">
              {{$index}}
            </div>
          </mu-list-item>
          <mu-divider/>
        </template>
      </mu-list>
      <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      count: 10,
      loading: false,
      scroller: null,
      refresh: true,
      search: false,
      searchData: {
        page: 1,
        pageSize: 16,
        name: ''
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
      this.$router.go(-1)
    },
    get () {
      this.$http.get('/rest/api/member/list?' + qs.stringify(this.searchData)).then((res) => {
        this.list = this.list.addAll(res.data.attributes.data)
        this.count = res.data.attributes.count
        this.searchData.page += 1
        if (res.data.attributes.data.length < 16) { this.refresh = false }
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    searchKey () {
      this.refresh = true
      this.searchData.pge = 1
      this.get()
    }
  }
}
</script>

<style lang='css' scoped>
.header-search .mu-text-field {
    width: 83%;
}
</style>
