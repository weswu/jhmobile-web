<template>
  <div class="gridlist-demo-container">
    <mu-grid-list class="gridlist-demo">
      <mu-grid-tile v-for="item, index in list" :key="index">
        <img :src="item.sharepic"/>
        <span slot="title">{{item.seo_title}}</span>
        <span slot="subTitle">
          <i class="iconfont icon-xianshi"></i>{{item.views}}
          <i class="iconfont icon-liuyan"></i>{{item.mviews}}
          <i class="iconfont icon-fenxiang"></i>{{item.rviews}}
        </span>
        <mu-icon-button slot="action" href="https://github.com/museui/muse-ui">
          <i class="iconfont icon-qrcode"></i>
        </mu-icon-button>
      </mu-grid-tile>
    </mu-grid-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>

</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [
        {
          sharepic: 'http://img.jihui88.com/wcd/upload//j//j2//jihui88//picture//2017//06//09/71b88a5d-153e-4763-a7ae-982ec8deb5e2_c.jpg?v=1496971005569',
          mviews: 0,
          rviews: 0,
          id: 2631,
          seo_title: '副本-副本-年会｜永康日精进智慧群',
          views: 0
        },
        {
          sharepic: 'http://img.jihui88.com/wcd/upload/y/y3/ykrjj/picture/2015/12/12/59c3c912-062b-4a6e-85f7-2e18e84f8aa8.jpg',
          mviews: 0,
          rviews: 0,
          id: 2615,
          seo_title: '副本-年会｜永康日精进智慧群',
          views: 0
        },
        {
          sharepic: 'http://wcd.jihui88.com/leaflet/images/nopic.png',
          mviews: 2,
          rviews: 0,
          id: 2554,
          seo_title: 'aaa-',
          views: 9
        },
        {
          sharepic: 'http://img.jihui88.com/wcd/upload//j//j2//jihui88//picture//2016//12//10/7025f749-b4fb-4759-9bc2-5452c1fdd564_c.jpg?v=1481943159228',
          mviews: 2,
          rviews: 1,
          id: 2278,
          seo_title: '1111',
          views: 44
        },
        {
          sharepic: 'http://wcd.jihui88.com/leaflet/images/nopic.png',
          mviews: 0,
          rviews: 0,
          id: 2255,
          seo_title: '机汇网微传单 -【 16年12月05日】',
          views: 0
        },
        {
          sharepic: 'http://wcd.jihui88.com/leaflet/images/nopic.png',
          mviews: 0,
          rviews: 0,
          id: 2222,
          seo_title: '机汇网微传单 -【 16年12月03日】',
          views: 1
        },
        {
          sharepic: 'http://wcd.jihui88.com/leaflet/images/nopic.png',
          mviews: 7,
          rviews: 0,
          id: 2139,
          seo_title: '留言测试',
          views: 2
        },
        {
          sharepic: 'http://img.jihui88.com/wcd/upload//x//x3//xmt123//picture//2016//03//31/ce45add0-1bae-41f3-818e-1376bbdc2965_c.jpg?v=1459400101594',
          mviews: 0,
          rviews: 0,
          id: 1288,
          seo_title: '【第1期】项目校企对接会',
          views: 0
        },
        {
          sharepic: 'http://img.jihui88.com/wcd/upload//j//j2//jingjutang//picture//2016//03//17/2f2f38d8-f2f1-4251-925c-696654d6f152_c.png?v=1458262085785',
          mviews: 0,
          rviews: 0,
          id: 1268,
          seo_title: '金聚堂防火门',
          views: 0
        },
        {
          sharepic: 'http://img.jihui88.com/wcd/upload//j//j2//jihui88//picture//2016//01//28/48e4ace8-b4f3-4667-86b6-a4fab4e9e98e_c2.jpg?v=1454161526500',
          mviews: 0,
          rviews: 1,
          id: 1088,
          seo_title: '机汇网微传单 -【 16年01月30日】',
          views: 14
        }
      ],
      page: 1,
      num: 10,
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    get () {
      this.loading = true
      this.$http.get('/rest/api/wcd/list?' + qs.stringify(this.searchData)).then((res) => {
        this.list = this.list.addAll(res.data.attributes.data)
        this.searchData.page += 1
        this.loading = false
        if (res.data.attributes.data.length < 16) { this.refresh = false }
      })
    },
    loadMore () {
      this.refresh && this.get()
    }
  }
}
</script>

<style lang='css' scoped>
.icon-qrcode{
  color: #fff
}

</style>
