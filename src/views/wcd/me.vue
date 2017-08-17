<template>
  <div class="wu-infinite-container">
    <mu-grid-list class="gridlist-demo">
      <mu-grid-tile v-for="item, index in list">
        <img :src="item.sharepic" @error="setErrorImg" @click="open(item)"/>
        <span slot="title">{{item.seo_title}}</span>
        <span slot="subTitle">
          <i class="iconfont icon-xianshi"></i>{{item.views}}
          <i class="iconfont icon-liuyan"></i>{{item.mviews}}
          <i class="iconfont icon-fenxiang"></i>{{item.rviews}}
        </span>
      </mu-grid-tile>
    </mu-grid-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    <div class="chaxun" v-if="chaxun">
       在电脑端输入网址<br/><span style="color:#999">http://wcd.jihui88.com/leaflet/index.html</span><br/>登录即可免费创建微传单
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      loading: false,
      scroller: null,
      refresh: true,
      chaxun: this.$store.state.user.wcdMember !== '01',
      searchData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created () {
    !this.chaxun && this.get()
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/wcd/list?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    loadMore () {
      !this.chaxun && this.refresh && this.get()
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.wcdImgUrl
    },
    open (item) {
      this.$router.push({path: '/wcd_open/' + item.id})
    }
  }
}
</script>
