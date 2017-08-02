<template>
  <div class='wu-infinite-container'>
    <div class="fixed-bar">
      <mu-appbar>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
        <mu-icon-button icon='search' slot='right' @click='search = !search'/>
        <mu-icon-menu icon='add' slot='right'>
          <mu-menu-item title='新闻添加' href='#/newsAdd'/>
          <mu-menu-item title='新闻分类' href='#/category/news'/>
        </mu-icon-menu>
        <div class='play-title'>
          <div class='play-name'>新闻管理<span style='font-size:16px;padding-left:5px' v-if='count != 0'>({{count}})</span></div>
        </div>
      </mu-appbar>
    </div>

    <transition name='fade'>
      <div class='header-search' v-show='search'>
        <mu-select-field v-model='searchData.category' :labelFocusClass="['label-foucs']" hintText='新闻分类'>
          <mu-menu-item v-for='v,index in categoryList' :value='v.categoryId' :title='v.name' />
        </mu-select-field>
        <mu-text-field class='appbar-search-field' slot='left' v-model='searchData.title' hintText='请输入新闻标题'/>
        <mu-icon-button icon='search' slot='right' @click='searchKey'/>
      </div>
    </transition>
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item :title='item.title'>
          <div class='subContent' @click='detail(item.id)'>
            发布时间:{{item.addTime}}
            <span style="padding-left:10px">人气：{{item.viewsum}}</span>
          </div>
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item :title="item.display === '01' ? '已显示' : '已隐藏'" :class="item.display === '01' ? 'itemActive' : ''" @click='display(item)'/>
            <mu-menu-item :title="item.topnews === '01' ? '已置顶' : '未置顶'" :class="item.topnews === '01' ? 'itemActive' : ''" @click='topnews(item)'/>
            <mu-menu-item title="修改" @click='detail(item.id)'/>
            <mu-menu-item title="删除" @click='del(item.id)'/>
          </mu-icon-menu>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      count: 0,
      search: false,
      list: [],
      categoryList: [],
      searchData: {
        page: 0,
        title: '',
        category: ''
      },
      loading: false,
      scroller: null,
      refresh: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
      vm.getCate()
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
      this.loading = true
      this.$http.get('/rest/api/news/list?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    getCate () {
      this.$http.get('/rest/api/news/updateList?categ=1').then((res) => {
        this.categoryList = res.data.attributes.categoryList
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    searchKey () {
      this.newslist = []
      this.searchData.page = 0
      this.get()
      this.search = false
    },
    detail (id) {
      this.$router.push({path: '/news/' + id})
    },
    // 显示隐藏
    display (item) {
      item.display = item.display === '01' ? '02' : '01'
      this.$http.put('/rest/api/news/detail/' + item.newsId + '?display=' + item.display).then((res) => {})
    },
    // 置顶
    topnews (item) {
      item.topnews = item.topnews === '01' ? '02' : '01'
      this.$http.put('/rest/api/news/detail/' + item.newsId + '?topnews=' + item.topnews).then((res) => {})
    },
    del (id) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/news/detail/' + id).then((res) => {})
        this.list.forEach((item, index, arr) => {
          if (item.id === id) {
            arr.splice(index, 1)
          }
        })
      }
    }
  }
}
</script>

<style lang='css'>

.itemActive .mu-menu-item{
  color: #ff7300;
}
.mu-item-right{
  text-align: center;
}
.mu-item-right i{
  font-size: 16px;
  color: #999
}
.subContent{
  font-size: 12px;
  color: #999
}
.subContent span{
  padding-left:10px
}

</style>
