<template>
  <div class="wu-infinite-container">
    <div class="fixed-bar">
      <mu-appbar title="积分明细">
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
        <mu-flat-button href="#/point_exchange" label="切换兑换记录" slot="right"/>
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
    <div class="item-list">
      <dl>
          <dd class="item-row-4">来源</dd>
          <dd class="item-row-2">积分变化</dd>
          <dd class="item-row-4">日期</dd>
      </dl>
      <dl v-for="item in list">
          <dd class="item-row-4">{{item.integralRecordDesc}}</dd>
          <dd class="item-row-2 number">
            <span class="plus" v-if="item.income!='0'&&item.income!=null"><span>+</span>{{item.income}}</span>
            <span class="minus" v-if="item.out!='0'&&item.out!=null"><span>-</span>{{item.out}}</span>
          </dd>
          <dd class="item-row-4">{{item.addTime | time('MM-dd hh:mm')}}</dd>
      </dl>
		</div>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
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
        pageSize: 8
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
    back () {
      this.$router.back()
    },
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
.mu-appbar {
    background-color: #fafafa;
    color: #4d4d4d;
}

.plus{color:#b1000f;}
.minus{color:#30992e;font-size: 0.75rem;}
.item-list .number span{font-size: 0.75rem;}
.item-list .number span span{font-size: 0.65rem;}
.data-tip{text-align: center;line-height: 3rem;color: #999;display:none}

.poing-section{    color: #fff;background: #ff7300;
   background: -moz-linear-gradient(left,#ea3062,#f8386b 30%,#ea3062);
   background: -webkit-gradient(linear,left top,right top,from(rgba(253,114,0,.93)),color-stop(.3,#ff7300),to(#ff6a00));
   background: -webkit-linear-gradient(left,rgba(253,114,0,.93),#ff7300 30%,#ff6a00);
   background: -o-linear-gradient(left,rgba(253,114,0,.93),#ff7300 30%,#ff6a00);}
.poing-section .label-act .title h2,.label-act .sub {color: #fff;}
.label-act .title h2 span{font-size: 0.5rem;}
.icon-tishi {font-size: 0.7rem;}
</style>
