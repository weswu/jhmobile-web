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
              @click="shipments(item.orderId)" class="fl orange">去发货</button>
            <button @click="detail(item.orderId)" class="fl">查看详情</button>
          </dt>
        </dl>
      </div>
    </mu-list>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
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
      list: [
        {
          orderId: '8a9e457e5d73369f015d7403a0d40134',
          addTime: '2017-07-24 17:53:01',
          orderSn: '2017072402122219',
          all: '0',
          proName: null,
          orderStatusInt: -1,
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
          productName: '最低购买数量测试',
          com: null,
          deliverySn: null,
          deliveryCorpName: null,
          startDate: null,
          endDate: null,
          sorting: null,
          id: '8a9e457e5d73369f015d7403a0d40134'
        },
        {
          orderId: 'ff80818158c4a9d30158c76a1dc30056',
          addTime: '2016-12-04 09:19:30',
          orderSn: '2016120308393413',
          all: '0',
          proName: null,
          orderStatusInt: 2,
          paymentStatusInt: 2,
          shippingStatusInt: 2,
          orderStatus: 'completed',
          paymentStatus: 'paid',
          shippingStatus: 'shipped',
          invoiceName: null,
          invoiceAmount: null,
          deliveryTypeName: '包邮',
          paymentConfigName: null,
          productTotalPrice: 0.01,
          deliveryFee: 0,
          paymentFee: 0,
          totalAmount: 0.01,
          paidAmount: 0.01,
          productWeight: 1,
          productWeightUnit: 'g',
          productTotalQuantity: 1,
          shipName: 'wyj',
          shipArea: '山西省阳泉市郊区',
          shipAreaPath: '402881882ba8753a012ba8c8f0b1004e,402881882ba8753a012ba8c98d3f0051,402881e44da29af5014da32f7d5e00dd',
          shipAddress: 'ewwwww',
          shipZipCode: '312000',
          shipPhone: 'null',
          shipMobile: '13588506961',
          memo: '',
          memberId: null,
          deliveryType: null,
          paymentConfig: null,
          paytype: 'mobile',
          enterpriseId: 'Enterp_0000000000000000000049090',
          orderStatusTxt: '已完成',
          deliverytypeId: 'ff80818151417af40151418e3fdb0004',
          productName: '微信支付测试',
          com: null,
          deliverySn: null,
          deliveryCorpName: null,
          startDate: null,
          endDate: null,
          sorting: null,
          id: 'ff80818158c4a9d30158c76a1dc30056'
        },
        {
          orderId: 'ff80818158c4a9d30158c4b23f230005',
          addTime: '2016-12-03 20:39:25',
          orderSn: '20161203083926',
          all: '0',
          proName: null,
          orderStatusInt: -1,
          paymentStatusInt: 0,
          shippingStatusInt: 2,
          orderStatus: 'unprocessed',
          paymentStatus: 'unpaid',
          shippingStatus: 'shipped',
          invoiceName: null,
          invoiceAmount: null,
          deliveryTypeName: '包邮',
          paymentConfigName: null,
          productTotalPrice: 100.08,
          deliveryFee: 0,
          paymentFee: 0,
          totalAmount: 100.08,
          paidAmount: 0,
          productWeight: 1,
          productWeightUnit: 'g',
          productTotalQuantity: 1,
          shipName: 'tttt',
          shipArea: '海南省海口市秀英区',
          shipAreaPath: '402881882ba8753a012ba939ac010149,402881882ba8753a012ba939da07014a,402881e44da29af5014da3bd63a907bc',
          shipAddress: 'ttttt',
          shipZipCode: 'fdgdfg',
          shipPhone: 'null',
          shipMobile: '13512345678',
          memo: '',
          memberId: null,
          deliveryType: null,
          paymentConfig: null,
          paytype: 'mobile',
          enterpriseId: 'Enterp_0000000000000000000049090',
          orderStatusTxt: '未付款',
          deliverytypeId: 'ff80818151417af40151418e3fdb0004',
          productName: '定制属性测试',
          com: null,
          deliverySn: null,
          deliveryCorpName: null,
          startDate: null,
          endDate: null,
          sorting: null,
          id: 'ff80818158c4a9d30158c4b23f230005'
        }
      ],
      pic: [
        'upload/j/j2/jihui88/picture/2017/03/14/9759deb5-1c1a-42c6-847b-8254e62eda01.jpg',
        'upload/j/j2/jihui88/picture/2017/06/01/512f3149-4813-4b1b-806e-3fa46c760b08.jpg'
      ],
      loading: false,
      scroller: null,
      refresh: true,
      searchData: {
        page: 1,
        flag: ''
      },
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
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/order/list?' + qs.stringify(this.searchData)).then((res) => {
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
