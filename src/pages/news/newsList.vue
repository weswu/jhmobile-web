<template>
  <div class='wu-infinite-container'>
    <mu-appbar class='wu-appbar'>
      <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      <mu-icon-button icon='search' slot='right' @click='search = !search'/>
      <mu-icon-menu icon='add' slot='right'>
        <mu-menu-item title='新闻添加' href='#/newsAdd'/>
        <mu-menu-item title='新闻分类' href='#/category/news'/>
      </mu-icon-menu>
      <div class='play-title'>
        <div class='play-name'><span>{{title}}<span style='font-size:16px;padding-left:5px' v-if='num != 0'>({{num}})</span></span></div>
      </div>
    </mu-appbar>
    <transition name='fade'>
      <div class='header-search' v-show='search'>
        <mu-select-field v-model='searchData.categoryId' :labelFocusClass='['label-foucs']' hintText='新闻分类'>
          <mu-menu-item v-for='v,index in categoryList' :value='v.categoryId' :title='v.name' />
        </mu-select-field>
        <mu-text-field class='appbar-search-field' slot='left' v-model='searchData.title' hintText='请输入新闻标题'/>
        <mu-icon-button icon='search' slot='right' @click='searchKey'/>
      </div>
    </transition>

    <div class='pt56 demo-refresh-container'>
      <mu-list>
        <template v-for='item in newslist'>
          <mu-list-item data-type='pc' :title='item.title'>
            <div class='subContent'>
              发布时间:{{item.addTime}}    人气：{{item.viewsum}}
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
      title: '新闻管理',
      num: 0,
      search: false,
      newslist: [
        {
          newsId: 'News_000000000000000000000105546',
          category: 'Category_00000000000000000338054',
          title: 'testdddd',
          addTime: '2017-05-04',
          state: '01',
          topnews: '00',
          display: '01',
          viewsum: 1,
          id: 'News_000000000000000000000105546'
        },
        {
          newsId: 'News_000000000000000000000105546',
          category: 'Category_00000000000000000338054',
          title: 'testdddd',
          addTime: '2017-05-04',
          state: '01',
          topnews: '00',
          display: '01',
          viewsum: 1,
          id: 'News_000000000000000000000105546'
        },
        {
          newsId: 'News_000000000000000000000105546',
          category: 'Category_00000000000000000338054',
          title: 'testdddd',
          addTime: '2017-05-04',
          state: '01',
          topnews: '00',
          display: '01',
          viewsum: 1,
          id: 'News_000000000000000000000105546'
        },
        {
          newsId: 'News_000000000000000000000105546',
          category: 'Category_00000000000000000338054',
          title: 'testdddd',
          addTime: '2017-05-04',
          state: '01',
          topnews: '00',
          display: '01',
          viewsum: 1,
          id: 'News_000000000000000000000105546'
        }
      ],
      searchData: {
        page: 0,
        title: '',
        categoryId: ''
      },
      loading: false,
      scroller: null,
      refresh: true,
      categoryList: [
        {text: '统一社会信用代码证', value: '00'},
        {text: '营业执照证书', value: '01'},
        {text: '组织机构代码证', value: '02'},
        {text: '其他', value: '03'}
      ]
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
      if (to.path === '/news' && JSON.stringify(to.query).length > 10) {
        this.list.unshift(to.query)
      }
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/news/list?' + qs.stringify(this.searchData)).then((res) => {
        var list = res.data.attributes.data
        for (let i = 0; i < list.length; i++) {
          this.newslist.push(list[i])
        }
        this.page = this.page + 1
        if (list.length < 16) { this.refresh = false }
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
    del (entry) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/bind/detail/' + entry.id).then((res) => {
          var data = this.list
          data.forEach(function (item, i) {
            if (item === entry) {
              data.splice(i, 1)
            }
          })
          this.$router.back()
        })
      }
    }
  }
}
</script>

<style lang='css'>
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
