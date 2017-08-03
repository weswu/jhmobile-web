<template>
  <div class="order wu-infinite-container">
    <div class="fixed-bar">
      <mu-appbar title="订单管理">
        <mu-icon-button icon='arrow_back' @click='back'  slot='left'/>
      </mu-appbar>
    </div>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab v-for="item in tabs" :value="item.value" :title="item.title"/>
    </mu-tabs>

    <mu-list>
      <div v-for='item,index in list' class="order_list">
        <dl @click="detail(item.orderId)">
          <dt :class="item.productTotalQuantity===1?'order_img fl ':'order_img fl order_img_sum'">
            <img :src="'http://img.jihui88.com/' + pic[index]"/>
            <span class="order_num">{{item.productTotalQuantity}}件</span>
          </dt>
          <dt class="orange_txt fl">
            <span> 订单号：{{item.orderSn}} </span>
            <span> 总金额：￥{{item.totalAmount}}&nbsp;&nbsp;&nbsp;({{item.orderStatusTxt}} ) </span>
            <span> 下单时间：{{item.addTime}} </span>
            <button v-if="(item.orderStatus === 'unprocessed' || item.orderStatus === 'processed') && item.paymentStatus === 'unpaid'
              && item.orderStatusInt != -1 && item.shippingStatus !== 'unshipped'"
              @click="price(item.orderId)" class="fl orange">修改价格</button>
            <button v-if="item.orderStatus !== 'completed' && item.orderStatus !== 'invalid' && item.paymentStatus === 'paid' && item.shippingStatus === 'unshipped'"
              @click="send(item.orderId)" class="fl orange">去发货</button>
            <button @click="detail(item.orderId)" class="fl">查看详情</button>
          </dt>
        </dl>
      </div>
    </mu-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
    <div class="chaxun" v-if="nodata" >
  		<em class="icon icon-tishi"></em> 暂无订单
  	</div>
    <div class="chaxun" v-if="grade !== '07'">
       <em class="icon icon-tishi"></em> 您还未开通商城，无法查看订单<br> 咨询请联系：<a href="tel:4007111011">4007111011</a>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      pic: [],
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1,
        flag: ''
      },
      nodata: false,
      grade: '07',
      activeTab: 'all',
      tabs: [
        {value: 'all', title: '全部'},
        {value: 'buyerPayment', title: '待买家付款'},
        {value: 'awaitS', title: '等待您发货'},
        {value: 'delivery', title: '待买家收货'}
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.params.flag === 'all') { vm.searchData.flag = '' }
      if (vm.$route.params.flag === 'buyerPayment') { vm.searchData.flag = '0' }
      if (vm.$route.params.flag === 'awaitS') { vm.searchData.flag = '1' }
      if (vm.$route.params.flag === 'delivery') { vm.searchData.flag = '2' }
      vm.activeTab = vm.$route.params.flag
      vm.get()
    })
  },
  methods: {
    back () {
      this.$router.push({path: '/main/home'})
    },
    get () {
      this.$http.get('/rest/api/order/list?' + qs.stringify(this.searchData)).then((res) => {
        if (this.searchData.page === 1 && res.data.attributes.data.length === 0) {
          this.nodata = true
        }
        this.scrollList(this, res.data)
        var list = res.data.attributes.pic
        for (var item of list) {
          this.pic.push(item)
        }
        this.grade = res.data.attributes.grade
      })
    },
    handleTabChange (val) {
      if (val === 'all') { this.searchData.flag = '' }
      if (val === 'buyerPayment') { this.searchData.flag = '0' }
      if (val === 'awaitS') { this.searchData.flag = '1' }
      if (val === 'delivery') { this.searchData.flag = '2' }
      this.activeTab = val
      this.searchData.page = 1
      this.list = []
      this.$router.push({ path: '/order/' + val })
      this.get()
    },
    loadMore () {
      this.refresh && this.get()
    },
    // 查看详情
    detail (id) {
      this.$router.push({path: '/order/detail/' + id})
    },
    // 修改价格
    price (id) {
      this.$router.push({path: '/order/price/' + id})
    },
    // 发货
    send (id) {
      this.$router.push({path: '/order/send/' + id})
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
