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
      <mu-flexbox-item basis='30%' class='list-img' :key='item.id' v-for='item,index in list'>
        <img :src='$store.state.imgUrl + item.serverPath | picUrl(5)' @error="setErrorImg" @click="clickImg(item)">
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    <div v-if='busy' style='text-align: center;padding: .5rem 0;'>暂无数据</div>
    <!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
  </div>
</template>
<script>
import BigImg from '../../components/BigImg'
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
        pageSize: 18,
        sort: 'att_id'
      },
      showImg: false
    }
  },
  components: {
      'big-img':BigImg
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
      if (this.categoryList && this.categoryList.length === 0)
      this.$http.get('/rest/api/album/list?pageSize=100').then((res) => {
        this.categoryList = res.data.attributes.data
        this.categoryList.unshift({id: 'all', name: '全部'})
        this.$store.commit('setAlbumCategoryList', this.categoryList)
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    clickImg(item) {
      this.showImg = true
      // 获取当前图片地址
      this.imgSrc = this.$store.state.imgUrl + item.serverPath
    },
    viewImg(){
      this.showImg = false
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
<style scoped>
.list-img{
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: -ms-flexbox;
  -ms-flex-pack: center;
  -ms-flex-align: center;
}
.list-img img{
  max-width: 100%
}
</style>
