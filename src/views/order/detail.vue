<template>
  <div class='order'>
    <div class='fixed-bar'>
      <mu-appbar title='订单详情'>
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <div class='demo-refresh-container' style='background: #f5f5f5padding-bottom: 2.5rem'>
      <div class='order_detail'>
        <div class='order_detail_header'>
          <div class='order_detail_title'>
            订单状态：<span class='orange'>{{data.orderStatus}}</span>
          </div>
          <div class='order_detail_state'>
            <em class='iconfont fl icon-qianbaob'></em>
            <span class='order_detail_state_txt'> {{data.orderPrompt}} </span>
          </div>
        </div>
        <div class='order_detail_receiving'>
          <div class='order_detail_shadow'></div>
          <h3 class='order_detail_h3'>收货信息</h3>
          <div class='order_detail_receiving_txt'>
            <p><span class='receiving_fl'>收货人：</span><span class='receiving_fr'>{{data.shipName}}</span></p>
            <p v-if='data.sPhone'><span class='receiving_fl'  >电话：</span><span class='receiving_fr'>{{data.shipPhone}}</span></p>
            <p v-if='data.sMobile'><span class='receiving_fl' >手机：</span><span class='receiving_fr'>{{data.shipMobile}}</span></p>
            <p><span class='receiving_fl'>收货地址：</span><span class='receiving_fr'>{{data.shipAddress}}</span></p>
          </div>
        </div>
        <div class='order_detail_product'>
          <h3 class='order_detail_h3'>商品信息</h3>
          <div class='order_detail_product_list'>
            <dl v-for='pro in product'>
              <dt>
                <img :src="'http://img.jihui88.com/'+pro.com">
              </dt>
              <dd>
                {{pro.name}}
                <ul class='order_detail_product_list_type'>
                  <li>
                    <span class='order_detail_product_meta'>{{pro.productAttr}}</span>
                    <span class='order_detail_product_totel'>￥{{pro.price}}</span>
                    <span class='order_detail_product_num'>×{{pro.productQuantity}}</span>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>
        <div class='order_detail_order'>
          <h3 class='order_detail_h3'>订单信息</h3>
          <div class='order_detail_order_list'>
            <ul>
              <li><span class='order_list_fl'>订单号：</span><span
                class='order_list_fr'>{{data.orderSn}}</span></li>
              <li><span class='order_list_fl'>下单时间：</span><span
                class='order_list_fr'>{{data.addTime}}</span></li>
              <li><span class='order_list_fl'>买家留言：</span><span
                class='order_list_fr'>{{data.memo}}</span></li>
              <li v-if='paymentTime !== null'><span class='order_list_fl'>付款时间：</span><span
                class='order_list_fr'>{{paymentTime}}</span></li>
              <li v-if='shippingTime !== null'><span class='order_list_fl'>发货时间：</span><span
                class='order_list_fr'>{{shippingTime}}</span></li>
            </ul>
          </div>
        </div>
      </div>

    	<div class='app_footer order_footer'>
    		<div class='app_footer_txt font_14'>
    			<span class='font_16'>应付款: </span>
          <span class='font_16 orange'><em class='font_14'>￥</em>{{totalAmount}} 元</span>
    		</div>
    		<div v-if="data.paymentStatus === 'unpaid' && (date !== -1 || date !== 0)"
        class='app-button app_btn app_btn_right' @click='updatePri(data.orderId)'>修改价格</div>
    		<div v-if="data.paymentStatus === 'paid' && data.shippingStatus === 'unshipped'"
        class='app-button app_btn' @click='goShipments(oId)'>去发货</div>
    	</div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      date: -1,
      dayHour: -1,
      totalAmount: 0,
      product: [],
      data: {},
      oId: '',
      shippingTime: ''
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.loading = true
      this.$http.get('/rest/api/order/listDetail/' + this.$route.params.id).then((res) => {
        this.loading = false
        var result = res.data.attributes.data
        var attr = res.data.attributes
        this.date = attr.date
        this.dayHour = attr.dayHour
        this.totalAmount = attr.totalAmount
        this.product = attr.product
        this.data = attr.data
        this.oId = attr.oId
        this.paymentTime = attr.paymentTime
        this.shippingTime = attr.shippingTime

        if (result.orderStatus === 'completed') {
          this.data.orderStatus = '已完成'
          if (result.paymentStatus === 'paid' && result.shippingStatus === 'shipped') {
            this.data.orderPrompt = '交易已成功'
          } else {
            this.data.orderPrompt = '交易已结束'
          }
        } else if (result.orderStatus === 'invalid') {
          this.data.orderStatus = '已作废'
        } else if (result.paymentStatus === 'unpaid') {
          if (this.data.date === -1 || this.date === 0) {
            this.data.orderPrompt = '“付款”操作已自动关闭'
            this.data.orderStatus = '买家未付款'
          } else {
            this.data.orderStatus = '等待买家付款'
            this.data.orderPrompt = '买家还有' + this.date + '分钟来完成“付款”操作，逾期未完成，本交易将自动关闭'
          }
        } else if (result.paymentStatus === 'paid' && result.shippingStatus === 'unshipped') {
          this.data.orderStatus = '等待您发货'
          this.data.orderPrompt = '买家已付款，请您尽快发货。如果您无法发货，请及时与买家联系并说明情况'
          this.data.paymentTime = res.data.attributes.paymentTime
        } else if (result.shippingStatus === 'shipped') {
          if (this.data.orderStatus === 'unprocessed') {
            this.data.orderStatus = '未处理'
          } else if (result.orderStatus === 'processed') {
            this.data.orderStatus = '已处理'
          } else if (result.orderStatus === 'completed') {
            this.data.orderStatus = '已完成'
          } else {
            this.data.orderStatus = '已作废'
          }
          if (this.dayHour !== -1 && this.dayHour !== 0) {
            this.data.orderPrompt = '买家还有' + this.dayHour + '来完成本次交易的“确认收货“'
            this.data.orderStatus = '等待买家确认收货'
          } else if (this.dayHour === -1) {
            this.data.orderStatus = '买家已确认收货'
            this.data.orderPrompt = '交易已成功'
          }
        }
      })
    },
    updatePri (id) {
      this.$router.push({path: '/order/price/' + id})
    },
    goShipments (id) {
      this.$router.push({path: '/order/send/' + id})
    }
  }
}
</script>
<style scoped>
.receiving_fl{float:left;text-align:right;width:4rem;color:#a8a8a8;padding-top:.2rem}
.receiving_fr{float:left;width:70%;padding-top: 0.2rem}
</style>
