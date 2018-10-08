<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="修改价格">
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <div class="order_price">
			<div class="order_price_head">
				<div class="order_price_v1">
					<span class="fl"> 订单号: {{orderSn}} </span>
          <span class="fr orange">等待买家付款 </span>
				</div>
				<div class="order_price_v2">
					<span class="fl"> 物流运费: </span>
          <span class="fr">
            <input type="text" v-model="deliveryFee" @change="totalSum">
					</span>
				</div>
			</div>
			<div class="order_price_product">
				<dl v-for="item in data">
					<dt>
						<img :src="'http://img.jihui88.com/'+item.com">
					</dt>
					<dd>{{item.name}}</dd>
					<div class="order_price_product_type">
						<div class="order_price_product_fl">
							<div class="order_price_product_meta">
								{{item.productAttr}}</div>
							<div class="order_price_product_totel">
								<span class="fr">×{{item.productQuantity}}</span>
							</div>
						</div>
						<div class="order_price_product_fr">
							<input type="text" v-model="item.price" class="price" @change="totalSum">
						</div>
					</div>
				</dl>
			</div>
		</div>
    <div class="app_footer order_footer">
  		<div class="app_footer_txt font_14">
  			<span class="font_16">总计: </span><span class="font_16 orange"><em
  				class="font_14">￥</em>{{total}} 元 </span>
  		</div>
  		<div class="app-button app_btn app_btn_right"
  			@click="updatePrice(deliveryFee,data)">确定</div>
  	</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [],
      deliveryFee: 0,
      orderSn: '',
      total: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  },
  methods: {
    get () {
      this.$http.get('/rest/api/order/priceDetail?orderId=' + this.$route.params.id).then((res) => {
        this.data = res.data.attributes.data
        this.deliveryFee = res.data.attributes.deliveryFee
        this.orderSn = res.data.attributes.orderSn
        this.totalSum()
      })
    },
    totalSum () {
      this.total = parseFloat(this.deliveryFee)
      for (var item of this.data) {
        this.total += parseFloat(item.price) * item.productQuantity
      }
    },
    updatePrice () {
      if (!this.deliveryFee) {
        window.alert('物流运费不能为空')
        return
      }
      var list = ''
      for (var item of this.data) {
        if (!item.price) {
          window.alert('价格不能为空')
          return
        }
        if (list === '') {
          list += 'id=' + item.orderId + ',price=' + item.price
        } else {
          list += ';id=' + item.orderId + ',price=' + item.price
        }
      }
      this.$http.put('/rest/api/order/update?list=' + list + '&orderId=' + this.$route.params.id + '&deliveryFee=' + this.deliveryFee + '&total=' + this.total).then((res) => {
        window.alert('修改成功')
      })
    }
  }
}
</script>
