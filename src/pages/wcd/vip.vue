<template>
  <div class='gridlist-demo-container wrapper'>
    <mu-grid-list class='gridlist-demo'>
      <mu-grid-tile v-for='item, index in list'>
        <img :src='item.sharepic' @error='setErrorImg' @click='open(item)'/>
        <span slot='title'>{{item.seo_title}}</span>
        <span slot='subTitle'>
          <i class='iconfont icon-xianshi'></i>{{item.views}}
          <i class='iconfont icon-liuyan'></i>{{item.mviews}}
          <i class='iconfont icon-fenxiang'></i>{{item.rviews}}
        </span>
        <div v-if="item.vip" class="showVip" @click="vip(item)">快速生成专属页面</div>
      </mu-grid-tile>
    </mu-grid-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>
</template>
<script>
import jsonp from 'jsonp'
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
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
      this.$http.get('/rest/api/wcd/vip?' + qs.stringify(this.searchData)).then((res) => {
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
    vip (wcd) {
      var ctx = this
      this.vipList = {
        enterpriseId: this.$store.state.user.enterpriseId,
        vieId: wcd.id,
        fields: []
      }
      jsonp('http://wcd.jihui88.com/rest/comm/wcd/copyp?' + qs.stringify(this.vipList), null, function (err, data) {
        if (data.msgType === 'notLogin') {
          ctx.$router.push('/login')
        }
        if (data.attributes.shortage === true) {
          if (ctx.vipList.length > 0) {
            window.alert('请完善传单信息')
            return false
          }
          // 第一次提交,完善数据
          ctx.vipList = data.attributes.fields
        } else {
          if (confirm('传单生成成功,确定查看')) {
            ctx.$router.push('/wcd_open/' + data.attributes.data.wcdId)
          }
        }
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
      })
    }
  }
}
</script>

<style scoped>
.showVip {
    left: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    text-align: center;
    line-height: 5.733rem;
    color: #fff;
    background-color: rgba(0,0,0,.6);
}
</style>
