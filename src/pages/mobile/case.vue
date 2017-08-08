<template>
  <div class='wu-infinite-container'>
    <mu-icon-menu icon="more_vert" class="cate_right">
      <mu-menu-item :title="item.name" v-for="item in category" @click="cate(item)"
      :class="item.id === searchData.category_id ? 'cate_active' : '' "/>
    </mu-icon-menu>
    <mu-list class="wu-list">
      <template v-for='item,index in list'>
        <mu-list-item :title='item.title' @click="open(item.id)">
          <img :src="imgUrl + item.logo" @error="setErrorImg" slot="left">
          <div class="subContent">
            <p v-if="item.language === '1'">中文</p>
            <p v-if="item.language === '2'">英文</p>
          </div>
          <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
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
      imgUrl: this.$store.state.imgUrl,
      list: [],
      category: [
        { name: '全部', id: '' },
        { name: '个人', id: 104 },
        { name: '行业', id: 101 },
        { name: '企业', id: 102 },
        { name: '官方主题', id: 343762 }
      ],
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1,
        pageSize: 10,
        category_id: ''
      }
    }
  },
  created () {
    this.get()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'get'
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/mobile/case?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    open (id) {
      this.$router.push({path: '/mobile/' + id})
    },
    cate (item) {
      this.list = []
      this.searchData.page = 1
      this.searchData.category_id = item.id
      this.get()
    }
  }
}
</script>
