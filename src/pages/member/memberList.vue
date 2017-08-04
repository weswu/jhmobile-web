<template>
  <div class='wu-infinite-container'>
    <div class="fixed-bar">
      <mu-appbar>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
        <mu-icon-button icon='search' slot='right' @click='search = !search'/>
        <div class='play-title'>
          会员管理<span class="appbar-count" v-show='count'>({{count}})</span>
        </div>
      </mu-appbar>
    </div>
    <transition name='fade'>
      <div class='header-search' v-show='search'>
        <mu-text-field v-model='searchData.name' fullWidth hintText='请输入用户名'/>
        <mu-raised-button label='搜索' @click='searchKey' secondary fullWidth/>
      </div>
    </transition>
    <mu-list>
      <template v-for='item,index in list'>
        <mu-list-item :title="item.name || item.username">
          <div class="subContent">
            {{item.addTime}}
          </div>
          <div slot="left">
            {{index+1}}
          </div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <div v-if="chaxun" class="chaxun">
      <em class="iconfont icon-tishi"></em> 您还未开通商城，无法查看商城客户<br> 咨询请联系：<a href="tel:4007111011">4007111011</a>
	  </div>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      count: 0,
      loading: false,
      scroller: null,
      refresh: true,
      busy: false,
      chaxun: false,
      search: false,
      searchData: {
        page: 1,
        pageSize: 16,
        name: ''
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
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/member/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.data.attributes.grade !== null && res.data.attributes.grade !== '07') {
          this.chaxun = true
        } else {
          this.scrollList(this, res.data)
        }
        this.loading = false
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    searchKey () {
      this.list = []
      this.searchData.page = 1
      this.search = false
      this.get()
    }
  }
}
</script>
