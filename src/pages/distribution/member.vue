<template>
  <div class="gridlist-demo-container wrapper">
    <div class="item-list member-list">
			<dl class="item-list-first">
				<dd class="item-row-7">会员信息</dd>
				<dd class="item-row-3">分销信息</dd>
			</dl>
		   <dl v-for="item, index in list">
				<dd class="item-row-7">
				    <div class="left userImg">
				       <img :src="item.headimgurl">
				    </div>
					<div class="left userinfo">
            <p>No.&nbsp;131</p>
            <p><span>昵称：</span>汤圆麻麻™جۇشۇەن</p>
            <p><span>地区：</span>新疆喀什</p>
            <p><span>推荐：</span>汤圆爸比™جاڭ يى</p> <p>.&nbsp;</p>
          </div>
          <br>
          <p class="clr"><span>关注：</span>2016-04-02 17:04:53</p>
				</dd>
				<dd class="item-row-3">
          <div class="distributorinfo">
            <p><span>大掌柜：</span>0人</p>
            <p><span>二掌柜：</span>0人</p>
            <p><span>小掌柜：</span>0人</p>
            <p><span>订单数：</span>0</p>
            <p><span>销售额：</span>￥0</p>
            <p><span>总佣金：</span>￥0</p>
           </div>
         </dd>
			  </dl>
		</div>
    付费用户手机后台使用情况：
    已登录过：398
    新增：1
    未登录过：3116
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
      search: false,
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
      jsonp('http://www.jihui88.com/wechat/cps/index.php/jihui_api/members/' + this.$store.state.enterprise.enterpriseId + '/' + this.searchData.page + '/4', null, function (err, data) {
        if (!data.success) {
          console.log(data.msg)
        }
        ctx.scrollList(ctx, data)
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
      })
    },
    loadMore () {
      this.refresh && this.get()
    }
  }
}
</script>
<style scoped>
.member-list img {
    display: block;
    width: 60px;
    height: 60px;
    margin-right: 10px;
}
.item-list .left {
    float: left;
}
.item-list p, .item-list span {
    line-height: 1rem;
    font-size: .5rem;
}
.item-list dl {
    overflow: hidden;
    margin:0
}
.member-list dl:nth-child(even) {
  background: #f3f3f3;
}
.member-list span {
    color: #999;
}
</style>
