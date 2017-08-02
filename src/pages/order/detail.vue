<template>
  <div class='order'>
    <div class='fixed-bar'>
      <mu-appbar title='订单详情'>
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <div class='demo-refresh-container' style='background: #f5f5f5;padding-bottom: 2.5rem;'>
      <div class='order_detail'>
        <div class='order_detail_header'>
          <div class='order_detail_title'>
            订单状态：<span class='orange'>{{orderStatus}}</span>
          </div>
          <div class='order_detail_state'>
            <em class='icon fl icon-qianbaob'></em>
            <span class='order_detail_state_txt'> {{orderPrompt}} </span>
          </div>
        </div>
        <div class='order_detail_receiving'>
          <div class='order_detail_shadow'></div>
          <h3 class='order_detail_h3'>收货信息</h3>
          <div class='order_detail_receiving_txt'>
            <p><span class='receiving_fl'>收货人：</span><span class='receiving_fr'>{{shipName}}</span></p>
            <p v-if='sPhone'><span class='receiving_fl'  >电话：</span><span class='receiving_fr'>{{shipPhone}}</span></p>
            <p v-if='sMobile'><span class='receiving_fl' >手机：</span><span class='receiving_fr'>{{shipMobile}}</span></p>
            <p><span class='receiving_fl'>收货地址：</span><span class='receiving_fr'>{{shipAddress}}</span></p>
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
                class='order_list_fr'>{{orderSn}}</span></li>
              <li><span class='order_list_fl'>下单时间：</span><span
                class='order_list_fr'>{{addTime}}</span></li>
              <li><span class='order_list_fl'>买家留言：</span><span
                class='order_list_fr'>{{memo}}</span></li>
              <li v-if='shippingS'><span class='order_list_fl'>付款时间：</span><span
                class='order_list_fr'>{{paymentTime}}</span></li>
              <li v-if='receive'><span class='order_list_fl'>发货时间：</span><span
                class='order_list_fr'>{{shippingTime}}</span></li>
            </ul>
          </div>
        </div>
      </div>


    	<div class='app_footer order_footer'>
    		<div class='app_footer_txt font_14'>
    			<span class='font_16'>应付款: </span>
          <span class='font_16 orange'><em class='font_14'>￥</em>{{payable | number}} 元</span>
    		</div>
    		<div v-if='pri' class='app-button app_btn app_btn_right'
    			@click='updatePri(orderId)'>修改价格</div>
    		<div v-if='goReceive' class='app-button app_btn'
    			@click='goShipments(oId)'>去发货</div>
    	</div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      payable: 0,
      pri: false,
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
        this.date = res.data.attributes.date
        this.dayHour = res.data.attributes.dayHour
        this.totalAmount = res.data.attributes.totalAmount
        this.product = res.data.attributes.product
        this.data = res.data.attributes.data
        this.oId = res.data.attributes.oId
        this.paymentTime = res.data.attributes.paymentTime
        this.loading = false
      })
    },
    updatePri () {
      this.loading = true
    },
    goShipments () {
      this.loading = true
    }
  },
  filters: {
    number (v) {
      return parseInt(parseFloat(v).toFixed(2))
    }
  }
}
</script>
