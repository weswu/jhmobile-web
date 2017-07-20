<template>
  <div class="order">
    <div class="fixed-bar">
      <mu-appbar title="订单管理">
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
      </mu-appbar>
    </div>
    <mu-tabs :value="searchData.flag" @change="handleTabChange" class="view-tabs">
      <mu-tab value="" title="全部"/>
      <mu-tab value="0" title="待买家付款"/>
      <mu-tab value="1" title="等待您发货"/>
      <mu-tab value="2" title="待买家收货"/>
    </mu-tabs>
    <div class='demo-refresh-container'>
      <mu-list>
        <template v-for='item in list'>
          <dl class="app-button" @click="detail(item.orderId)">
    				<dt :class="item.productTotalQuantity==1?'order_img fl ':'order_img fl order_img_sum'">
    					<img :src="'http://img.jihui88.com/' + item.memberId"/>
              <span class="order_num">{{item.productTotalQuantity}}件</span>
    				</dt>
    				<dt class="orange_txt fl">
    					<span> 订单号：{{item.orderSn}} </span>
              <span> 总金额：￥{{item.totalAmount}}&nbsp;&nbsp;&nbsp;({{item.orderStatusTxt}} ) </span>
              <span> 下单时间：{{item.addTime}} </span>
    					<button v-if="item.orderStatus=='true'?item.shippingStatus=='false'?'true':'false':'false'"
    						@click="price(order.orderId)" class="fl orange">修改价格</button>
    					<button v-if="item.shippingStatus" @click="shipments(item.orderId)" class="fl orange">
    						去发货</button>
    					<button @click="detail(item.orderId)" class="fl">查看详情</button>
    				</dt>
    			</dl>
          <mu-divider/>
        </template>
      </mu-list>
      <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>

      <div class="chaxun" style="display: block;">
		     <em class="icon icon-tishi"></em> 您还未开通商城，无法查看订单<br> 咨询请联系：<a href="tel:4007111011">4007111011</a>
	    </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      searchData: {
        page: 1,
        flag: ''
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/order/list?' + qs.stringify(this.searchData)).then((res) => {
        this.scrollList(this, res.data)
      })
    },
    handleTabChange (val) {
      this.searchData.flag = val
      this.searchData.page = 1
      this.list = []
    },
    // 查看详情
    detail (id) {
      this.$router.push({path: '/order/' + id})
    },
    // 修改价格
    price (id) {
      this.$router.push({path: '/order/price/' + id})
    },
    // 发货
    shipments (id) {
      this.$router.push({path: '/order/shipments/' + id})
    }
  }
}
</script>
<style scoped>
.chaxun {
    text-align: center;
    margin-top: 1rem;
    color: #999;
    font-size: .7rem;
}
.chaxun a {
    color: #999;
    text-decoration: underline;
}
</style>
