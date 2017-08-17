<template>
  <div class='wu-infinite-container'>
    <div v-if="grade === '07' || $store.state.enterprise.mobileSite === '14'">
      <div class="fixed-bar">
        <mu-appbar>
          <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
          <mu-icon-button icon='search' slot='right' @click='search = !search'/>
          <div class='play-title'>
            会员管理<span class="appbar-count" v-show='count'>({{count}})</span>
          </div>
          <mu-icon-menu icon='more_vert' slot='right'>
            <mu-menu-item title='会员添加' href='#/memberAdd'/>
            <mu-menu-item title='会员等级' href='#/memberRank'/>
          </mu-icon-menu>
        </mu-appbar>
      </div>
      <transition name='fade'>
        <div class='header-search' v-show='search'>
          <mu-text-field v-model='searchData.name' type='search' fullWidth hintText='请输入用户名'/>
          <mu-raised-button label='搜索' @click='searchKey' secondary fullWidth/>
        </div>
      </transition>
      <mu-list>
        <div v-for='item,index in list' class="wrap" :class="{swipeleft: isSwipe === index}"
        @touchstart="touchstart($event, item)" @touchmove="touchmove($event, item, index)">
          <mu-list-item :title="item.name || item.username" @click='detail(item.id)' class="list-item">
            <div class="subContent">
              {{item.addTime}}
            </div>
            <div slot="left">
              {{index+1}}
            </div>
            <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
          </mu-list-item>
          <div class="delete" @click.stop="del(item.id)">删除</div>
          <mu-divider/>
        </div>
      </mu-list>
      <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
      <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    </div>
    <div v-else-if='!loading'>
      <mu-appbar title='会员管理'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
      <div class="chaxun">
        <em class="iconfont icon-tishi"></em> 您还未开通商城，无法查看商城客户<br> 咨询请联系：<a href="tel:4007111011">4007111011</a>
  	  </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      count: 0,
      grade: '',
      isSwipe: '',
      loading: false,
      scroller: null,
      refresh: true,
      busy: false,
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
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/member/list?' + qs.stringify(this.searchData)).then((res) => {
        if (this.searchData.page === 1) this.grade = res.data.attributes.grade
        this.scrollList(this, res.data)
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
    },
    // 左侧删除
    touchstart (e, item) {
      item.x = e.changedTouches[0].pageX
      item.y = e.changedTouches[0].pageY
    },
    touchmove (e, item, index) {
      item.X = e.changedTouches[0].pageX
      item.Y = e.changedTouches[0].pageY
      if (item.X - item.x > 10) {
        this.isSwipe = ''
      }
      if (item.x - item.X > 10) {
        this.isSwipe = index
      }
    },
    detail (id) {
      this.$router.push({path: '/member/' + id})
    },
    // 删除信息
    del (id) {
      this.$http.delete('/rest/api/member/detail/' + id).then((res) => {})
      // 判断信息列表中id与正在删除的信息id是否相同，如果相同，就删除信息
      this.$parent.$refs.toast.show('删除成功')
      this.isSwipe = ''
      this.list.forEach((item, index, arr) => {
        if (item.id === id) {
          arr.splice(index, 1)
        }
      })
    }
  }
}
</script>
