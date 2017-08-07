<template>
  <div class='wu-infinite-container'>
    <div class="fixed-bar">
      <mu-appbar>
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
        <mu-icon-button icon='search' slot='right' @click='search = !search'/>
        <mu-icon-button icon='add' href='#/certAdd' slot='right'/>
        <div class='play-title'>
          证书管理<span class="appbar-count" v-if='count != 0'>({{count}})</span>
        </div>
      </mu-appbar>
    </div>

    <transition name='fade'>
      <div class='header-search' v-show='search'>
        <mu-select-field v-model='searchData.type' :labelFocusClass="['label-foucs']" hintText='证书分类' fullWidth>
          <mu-menu-item v-for='v,index in typeList' :value='v.value' :title='v.text' />
        </mu-select-field>
        <mu-text-field v-model='searchData.name' hintText='请输入标题' fullWidth/>
        <mu-raised-button label='搜索' @click='searchKey' secondary fullWidth/>
      </div>
    </transition>

    <mu-list class='pt-list'>
      <template v-for='item in list'>
        <mu-list-item :title='item.name' @click='detail(item.id)'>
          <img :src="imgUrl + item.attaPic | picUrl(8)" @error="setErrorImg" slot="left">
          <div class='subContent'>
            {{item.organize}}
          </div>
          <div slot="right" @click.stop='del(item.id)'>删除</div>
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
      list: [],
      imgUrl: this.$store.state.imgUrl,
      count: 0,
      loading: false,
      scroller: null,
      refresh: true,
      search: false,
      searchData: {
        page: 1,
        name: '',
        type: ''
      },
      typeList: [
        {text: '全部', value: ''},
        {text: '基本证书', value: '01'},
        {text: '税务登记证', value: '07'},
        {text: '荣誉证书', value: '04'},
        {text: '营业执照', value: '06'},
        {text: '组织机构代码证', value: '08'},
        {text: '实地认证', value: '09'},
        {text: '其它证书', value: '05'}
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.list = []
      vm.searchData.page = 1
      vm.get()
    })
  },
  methods: {
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/cert/list?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    back () {
      this.$router.back()
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
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    detail (id) {
      this.$router.push({path: '/cert/' + id})
    },
    del (id) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/cert/detail/' + id).then((res) => {})
        this.list.forEach((item, index, arr) => {
          if (item.id === id) {
            arr.splice(index, 1)
          }
        })
        this.count = this.count - 1
      }
    }
  }
}
</script>
