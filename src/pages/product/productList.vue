<template>
  <div class='wu-infinite-container'>
    <div class="fixed-bar">
      <mu-appbar>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
        <mu-icon-button icon='search' slot='right' @click='search = !search'/>
        <mu-icon-menu icon='add' slot='right'>
          <mu-menu-item title='产品添加' href='#/productAdd'/>
          <mu-menu-item title='产品分类' href='#/category/product'/>
        </mu-icon-menu>
        <div class='play-title'>
          <div class='play-name'>产品管理<span style='font-size:16px;padding-left:5px' v-if='count != 0'>({{count}})</span></div>
        </div>
      </mu-appbar>
    </div>

    <transition name='fade'>
      <div class='header-search' v-show='search'>
        <mu-select-field v-model='searchData.categoryId' :labelFocusClass="['label-foucs']" hintText='产品分类'>
          <mu-menu-item v-for='v,index in categoryList' :value='v.categoryId' :title='v.name' />
        </mu-select-field>
        <mu-text-field class='appbar-search-field' slot='left' v-model='searchData.title' hintText='请输入产品标题'/>
        <mu-icon-button icon='search' slot='right' @click='searchKey'/>
      </div>
    </transition>

    <mu-list class="pt-list">
      <template v-for='item in list'>
        <mu-list-item data-type='pc' :title='item.name'>
          <img :src="imgUrl + item.picPath" @error="setErrorImg" slot="left" @click='detail(item.id)'>
          <div class='subContent' @click='detail(item.id)'>
            {{item.prodtype}}
          </div>
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item :title="item.isdisplay === '1' ? '已显示' : '已隐藏'" :class="item.isdisplay === '1' ? 'itemActive' : ''" @click='display(item)'/>
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
      imgUrl: this.$store.state.imgUrl,
      count: 0,
      search: false,
      list: [],
      searchData: {
        page: 0,
        name: '',
        category: ''
      },
      loading: false,
      scroller: null,
      refresh: true,
      categoryList: []
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
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/product/list?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    getCate () {
      this.$http.get('/rest/api/product/updateList?categ=1').then((res) => {
        this.categoryList = res.data.attributes.categoryList
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    searchKey () {
      this.productlist = []
      this.searchData.page = 0
      this.get()
      this.search = false
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    detail (id) {
      this.$router.push({path: '/product/' + id})
    },
    // 显示隐藏
    display (item) {
      item.isdisplay = item.isdisplay === '1' ? '0' : '1'
      this.$http.put('/rest/api/product/detail/' + item.productId + '?isdisplay=' + item.isdisplay).then((res) => {})
    },
    del (id) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/product/detail/' + id).then((res) => {})
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
