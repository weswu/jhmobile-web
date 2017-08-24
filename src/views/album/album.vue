<template>
  <div class='wu-infinite-container'>
    <div class='fixed-bar'>
      <mu-appbar>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
        <mu-icon-menu icon='more_vert' slot='right' maxHeight='400'>
          <mu-menu-item :title="item.name" v-for="item in categoryList" @click="cate(item)"
            :class="item.id === categoryId ? 'cate_active' : '' "/>
        </mu-icon-menu>
        <div class='play-title'>
          {{name}}<span class='appbar-count' v-if='count != 0'>({{count}})</span>
        </div>
      </mu-appbar>
    </div>
    <mu-flexbox wrap='wrap' justify='space-around' class='box' :gutter='0'>
      <mu-flexbox-item basis='30%' class='list-item' :key='item.id' v-for='item,index in list'>
        <img class='list-img' :src='$store.state.imgUrl + item.serverPath | picUrl(5)' @error="setErrorImg">
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    <div v-if='busy' style='text-align: center;padding: .5rem 0;'>暂无数据</div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      categoryList: this.$store.state.albumCategoryList,
      count: 0,
      loading: false,
      scroller: null,
      refresh: true,
      busy: false,
      name: '相册',
      categoryId: 'all',
      searchData: {
        page: 1,
        pageSize: 15,
        sort: 'att_id'
      }
    }
  },
  created () {
    this.get()
    this.getCate()
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/album/attr/list/' + this.categoryId + '?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    getCate () {
      if (this.categoryList.length === 0)
      this.$http.get('/rest/api/album/list?pageSize=100').then((res) => {
        this.categoryList = res.data.attributes.data
        this.categoryList.unshift({id: 'all', name: '全部'})
        this.$store.commit('setAlbumCategoryList', this.categoryList)
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    cate (item) {
      this.list = []
      this.searchData.page = 1
      this.categoryId = item.id
      if (item.id === 'all') {
        this.name = '相册'
      } else {
        this.name = item.name
      }
      this.get()
    }
  }
}
</script>
<style media='screen'>
  .list-img {
    width: 100%
  }
</style>
