<template>
  <div class='order'>
    <div class='fixed-bar'>
      <mu-appbar title='订单详情'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
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
                    <span class='order_detail_product_totel'>￥{{pro.price | number}}</span>
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
              <li v-if='data.paymentTime !== null'><span class='order_list_fl'>付款时间：</span><span
                class='order_list_fr'>{{data.paymentTime}}</span></li>
              <li v-if='data.shippingTime !== null'><span class='order_list_fl'>发货时间：</span><span
                class='order_list_fr'>{{data.shippingTime}}</span></li>
            </ul>
          </div>
        </div>
      </div>


    	<div class='app_footer order_footer'>
    		<div class='app_footer_txt font_14'>
    			<span class='font_16'>应付款: </span>
          <span class='font_16 orange'><em class='font_14'>￥</em>{{totalAmount | number}} 元</span>
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
      totalAmount: 0.01,
      product: [
        {
          deliverycorpId: '0',
          name: '最低购买数量测试',
          com: 'upload/j/j2/jihui88/picture/2017/03/14/9759deb5-1c1a-42c6-847b-8254e62eda01.jpg',
          orderId: '8a9e457e5d73369f015d7403a0de0135',
          productQuantity: 1,
          productId: 'Product_000000000000000000599131',
          price: 0,
          productAttr: '',
          time: null,
          username: null,
          quantity: null,
          amount: null,
          memberId: null,
          id: null,
          enterpriseId: null
        }
      ],
      data: {
        orderId: '8a9e457e5d73369f015d7403a0d40134',
        addTime: '2017-07-24 17:53:01',
        orderSn: '2017072402122219',
        all: null,
        proName: null,
        orderStatusInt: 1,
        paymentStatusInt: 2,
        shippingStatusInt: 0,
        orderStatus: 'processed',
        paymentStatus: 'paid',
        shippingStatus: 'unshipped',
        invoiceName: null,
        invoiceAmount: null,
        deliveryTypeName: '包邮',
        paymentConfigName: null,
        productTotalPrice: 0,
        deliveryFee: 0,
        paymentFee: 0.01,
        totalAmount: 0.01,
        paidAmount: 0.01,
        productWeight: 0,
        productWeightUnit: 'g',
        productTotalQuantity: 1,
        shipName: '王永进',
        shipArea: '浙江省绍兴市越城区',
        shipAreaPath: '402881882ba8753a012ba8da48e000b0,402881882ba8753a012ba8db3e9b00b6,402881e44da29af5014da3609e26035c',
        shipAddress: '鸿通金都27幢4单元208室',
        shipZipCode: '312000',
        shipPhone: '',
        shipMobile: '13588506961',
        memo: null,
        memberId: null,
        deliveryType: null,
        paymentConfig: null,
        paytype: 'mobile',
        enterpriseId: 'Enterp_0000000000000000000049090',
        orderStatusTxt: '已付款',
        deliverytypeId: 'ff80818151417af40151418e3fdb0004',
        productName: null,
        com: null,
        deliverySn: null,
        deliveryCorpName: null,
        startDate: null,
        endDate: null,
        sorting: null,
        id: '8a9e457e5d73369f015d7403a0d40134'
      },
      oId: '8a9e457e5d73369f015d7403a0d40134',
      paymentTime: '2017-07-24 17:53:12'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.loading = true
      this.$http.get('/rest/api/order/listDetail/' + this.$route.params.id).then((res) => {
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
          this.orderStatus = '已完成'
          if (result.paymentStatus === 'paid' && result.shippingStatus === 'shipped') {
            this.orderPrompt = '交易已成功'
          } else {
            this.orderPrompt = '交易已结束'
          }
        } else if (result.orderStatus === 'invalid') {
          this.orderStatus = '已作废'
        } else if (result.paymentStatus === 'unpaid') {
          if (this.date === -1 || this.date === 0) {
            this.orderPrompt = '“付款”操作已自动关闭'
            this.orderStatus = '买家未付款'
          } else {
            this.orderStatus = '等待买家付款'
            this.orderPrompt = '买家还有' + this.date + '分钟来完成“付款”操作，逾期未完成，本交易将自动关闭'
          }
        } else if (result.paymentStatus === 'paid' && result.shippingStatus === 'unshipped') {
          this.orderStatus = '等待您发货'
          this.orderPrompt = '买家已付款，请您尽快发货。如果您无法发货，请及时与买家联系并说明情况'
          this.paymentTime = res.data.attributes.paymentTime
        } else if (result.shippingStatus === 'shipped') {
          if (this.orderStatus === 'unprocessed') {
            this.orderStatus = '未处理'
          } else if (this.orderStatus === 'processed') {
            this.orderStatus = '已处理'
          } else if (this.orderStatus === 'completed') {
            this.orderStatus = '已完成'
          } else {
            this.orderStatus = '已作废'
          }
          if (this.dayHour !== -1 && this.dayHour !== 0) {
            this.orderPrompt = '买家还有' + this.dayHour + '来完成本次交易的“确认收货“'
            this.orderStatus = '等待买家确认收货'
          } else if (this.dayHour === -1) {
            this.orderStatus = '买家已确认收货'
            this.orderPrompt = '交易已成功'
          }
        }
        this.loading = false
      })
    },
    updatePri (id) {
      this.$router.push({path: '/order/price/' + id})
    },
    goShipments (id) {
      this.$router.push({path: '/order/send/' + id})
    }
  },
  filters: {
    number (v) {
      return parseInt(parseFloat(v).toFixed(2))
    }
  }
}
</script>
