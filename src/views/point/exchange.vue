<template>
  <div class="wu-infinite-container">
    <div class="fixed-bar">
      <mu-appbar title="兑换记录">
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
        <mu-flat-button href="#/point_detail" label="切换积分明细" slot="right"/>
      </mu-appbar>
    </div>
    <section class="section poing-section">
      <div class="label-act">
         <a href="javascript:;">
            <div class="title"><h2><span>可用积分：</span>{{point}}</h2></div>
            <div class="sub" @click="rule">积分规则<i class="iconfont icon-tishi" style="padding-left:0.2rem"></i></div>
          </a>
       </div>
    </section>
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item :title="item.integralRecordDesc">
          <span slot='describe'>
            {{item.addTime | time('yyyy-MM-dd hh:mm')}}
            <span class="orange" v-if="item.state===1">处理中</span><span v-if="item.state===2">交易完成</span>
          </span>
          <div slot='right' class="orange">
            {{item.out}}
          </div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无消费记录</div>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      point: this.$store.state.point.point,
      loading: false,
      scroller: null,
      refresh: true,
      busy: false,
      list: [],
      searchData: {
        page: 1,
        pageSize: 8,
        productId: 1
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
      this.$http.get('/rest/api/point/list?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    loadMore () {
      this.refresh && this.get()
    },
    rule () {
      this.$router.push({path: '/point_rule'})
    }
  }
}
</script>
<style scoped>
.poing-section{color: #fff;background: #ff7300;
   background: -moz-linear-gradient(left,#ea3062,#f8386b 30%,#ea3062);
   background: -webkit-gradient(linear,left top,right top,from(rgba(253,114,0,.93)),color-stop(.3,#ff7300),to(#ff6a00));
   background: -webkit-linear-gradient(left,rgba(253,114,0,.93),#ff7300 30%,#ff6a00);
   background: -o-linear-gradient(left,rgba(253,114,0,.93),#ff7300 30%,#ff6a00);}
.poing-section .label-act .title h2,.label-act .sub {color: #fff;}
.label-act .title h2 span{font-size: 0.5rem;}
</style>
