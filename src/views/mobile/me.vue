<template>
  <div class="wu-infinite-container">
    <div class="chaxun" v-if="mobileSite !== '01' && mobileSite !== '07' && mobileSite !== '14' && mobileSite !== '04'">
       您还未开通手机网站，请联系客服开通
    </div>
    <mu-list class="wu-list" v-else>
      <template v-for='item,index in list'>
        <mu-list-item :title='item.title' @click="open(item)">
          <img :src="$store.state.imgUrl + item.logo" @error="setErrorImg" slot="left">
          <div class="subContent">
            <p v-if="item.state === '0'" class="red">该手机网站暂未开通</p>
            <p v-else-if="item.language === '1'">中文版</p>
            <p v-else="item.language === '2'">英文版</p>
          </div>
          <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <div class="chaxun" v-if="busy" >
  		<em class="iconfont icon-tishi"></em> 输入网址sj.jihui88.com 新建一个自己的手机网站
  	</div>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
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
      busy: false,
      mobileSite: '',
      searchData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.list = []
      vm.searchData.page = 1
      vm.mobileSite = vm.$store.state.enterprise.mobileSite
      if (vm.mobileSite === '01' || vm.mobileSite === '04' || vm.mobileSite === '07' || vm.mobileSite === '14') {
        vm.get()
      }
    })
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    get () {
      this.refresh = false
      this.loading = true
      this.$http.get('/rest/api/mobile/list?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    setErrorImg (e) {
      e.target.src = this.$store.state.errImgUrl
    },
    open (item) {
      if (item.state === '1') {
        this.$router.push({path: '/mobile/' + item.id})
      }
    }
  }
}
</script>
