<template>
  <div class='wu-infinite-container'>
    <mu-appbar title='证书管理'>
      <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
      <mu-icon-button icon='search' slot='right' @click='search = !search'/>
      <mu-icon-button icon='add' href='#/certAdd' slot='right'/>
    </mu-appbar>

    <transition name='fade'>
      <div class='header-search' v-show='search'>
        <mu-select-field v-model='searchData.type' :labelFocusClass="['label-foucs']" hintText='证书分类'>
          <mu-menu-item v-for='v,index in typeList' :value='v.value' :title='v.text' />
        </mu-select-field>
        <mu-text-field class='appbar-search-field' slot='left' v-model='searchData.name' hintText='请输入标题'/>
        <mu-icon-button icon='search' slot='right' @click='search'/>
      </div>
    </transition>

    <div class='pt56 pt-list'>
      <mu-list>
        <template v-for='item in list'>
          <mu-list-item :title='item.name' @click='detail(item.id)'>
            <img :src="imgUrl + item.attaPic" @error="setErrorImg" slot="left">
            <div class='subContent'>
              {{item.organize}}
            </div>
            <mu-icon value='delete' slot='right' :size='36' color='#ccc' @click.stop='del(item)'/>
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
      list: [
        {
          certificateId: 'Certificate_00000000000000007577',
          enterpriseId: 'Enterp_0000000000000000000000039',
          name: 'ä¸3',
          organize: '33',
          state: '01',
          type: '01',
          attachmentId: 'undefined',
          attaPic: null,
          addTime: 1493101183132,
          sort: 525,
          domain: null,
          updateTime: null,
          id: 'Certificate_00000000000000007577'
        },
        {
          certificateId: 'Certificate_00000000000000006922',
          enterpriseId: 'Enterp_0000000000000000000000039',
          name: 'q',
          organize: 'qq',
          state: '01',
          type: '07',
          attachmentId: 'Attach_0000000000000000001238752',
          attaPic: 'upload//g//g2//ggggfj//picture//2016//09//23/469bf576-8ce5-44ec-b32d-7b2f534988da.jpg',
          addTime: 1474598291622,
          sort: 524,
          domain: null,
          updateTime: null,
          id: 'Certificate_00000000000000006922'
        }
      ],
      imgUrl: this.$store.state.imgUrl,
      count: 10,
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1,
        name: '',
        type: ''
      },
      search: false,
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
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/cert/list?' + qs.stringify(this.searchData)).then((res) => {
        this.list = res.data.attributes.data
      })
    },
    back () {
      this.$router.back()
    },
    loadMore () {
      this.get()
    },
    search () {
      this.list = []
      this.searchData.page = 1
      this.get()
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    detail (id) {
      this.$router.push({path: '/cert/' + id})
    },
    del (entry) {
      if (window.confirm('确认删除吗？')) {
        this.$http.delete('/rest/api/link/detail/' + entry.id).then((res) => {
          var data = this.list
          data.forEach(function (item, i) {
            if (item === entry) {
              data.splice(i, 1)
            }
          })
        })
      }
    }
  }
}
</script>
