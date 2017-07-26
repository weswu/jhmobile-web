<template>
  <div class="gridlist-demo-container wrapper">
    <mu-icon-menu icon="more_vert" class="category">
      <mu-menu-item :title="item.name" v-for="item in category" @click="cate(item)"
      :class="item.id === searchData.category_id ? 'active' : '' "/>
    </mu-icon-menu>

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
  </div>

</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      category: [
        { name: '全部', id: '' },
        { name: 'VIP专属', id: 343798 },
        { name: '外包设计', id: 343764 },
        { name: '品牌', id: 343763 },
        { name: '推荐', id: 343762 },
        { name: '风格', id: 343761 },
        { name: '节假', id: 343760 },
        { name: '个人', id: 343759 },
        { name: '企业', id: 343758 },
        { name: '行业', id: 343757 }
      ],
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1,
        pageSize: 10,
        category_id: '',
        recvState: ''
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
      this.$http.get('/rest/api/wcd/case?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.wcdImgUrl
    },
    open (item) {
      this.$router.push({path: '/wcd_open/' + item.id})
    },
    cate (item) {
      this.searchData.page = 1
      this.searchData.category_id = item.id
      this.refresh && this.get()
    }
  }
}
</script>
<style scoped>
.category{
  position: fixed;
  top: 4px;
  right: 0;
  color: #fff;
  z-index: 999;
}
.active{
  background: #ff5241;
}
</style>
