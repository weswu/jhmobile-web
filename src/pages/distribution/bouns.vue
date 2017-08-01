<template>
  <div class="gridlist-demo-container wrapper">
    <div class="hr"></div>
    <div class="item-list member-list">
  			<dl class="item-list-first">
  				<dd class="item-row-3">会员信息</dd>
  				<dd class="item-row-7">提现信息</dd>
  			</dl>
        <dl v-for="dis,index in list">
           <dd class="item-row-3">
             <div class="left userinfo">
               <p><span>编号：</span>{{dis.dealer_id}}</p>
               <p><span>昵称：</span><br>{{dis.nickname}}</p>
             </div>
           </dd>
           <dd class="item-row-7">
             <div class=" distributorinfo">
               <p><span>提现单号：</span><br>{{dis.mch_billno}}</p>
               <p><span>提现状态：</span>{{dis.result_code}}</p>
               <p><span>提现金额：</span>￥{{dis.total_amount}}</p>
               <p><span>提现时间：</span>{{dis.send_time}}</p>
             </div>
           </dd>
       </dl>
		</div>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>

</template>

<script>
import jsonp from 'jsonp'
export default {
  data () {
    return {
      list: [],
      loading: false,
      scroller: null,
      refresh: true,
      busy: false,
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
      var ctx = this
      this.loading = true
      var entId = this.$store.state.user.enterpriseId
      jsonp('http://www.jihui88.com/wechat/cps/index.php/jihui_api/bouns/' + entId + '/' + this.searchData.page + '/4?callback=' + entId, null, function (err, data) {
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
        ctx.scrollList(ctx, data)
      })
    },
    loadMore () {
      this.refresh && this.get()
    }
  }
}
</script>
<style scoped>
.item-list span{
  color:#777
}
.item-list .left {
    float: left;
}
.member-list dl:nth-child(even) {
  background: #f3f3f3;
}
</style>
