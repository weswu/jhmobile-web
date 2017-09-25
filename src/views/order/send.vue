<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="订单发货">
        <mu-icon-button icon='arrow_back' @click='$router.back()' slot='left'/>
      </mu-appbar>
    </div>
    <div class="order_sending">
			<h3 class="order_sending_h3">收货信息</h3>
			<div class="order_sending_address" style="font-size:12px">
				<p>
					<span class="sending_fl">收货人：</span><span class="sending_fr">{{data.shipName}}
					</span>
				</p>
				<p v-if="data.shipMobile !== null">
					<span class="sending_fl">手机：</span><span class="receiving_fr">{{data.shipMobile}}</span>
				</p>
				<p>
					<span class="sending_fl">收货地址：</span><span class="sending_fr">{{data.shipArea}}{{data.shipAddress}}</span>
				</p>
			</div>
      <mu-select-field v-model="order.com" :labelFocusClass="['label-foucs']" label="物流信息" :maxHeight="300">
        <mu-menu-item v-for="v,index in middle" :value="v.com" :title="v.name" />
      </mu-select-field>
      <mu-text-field label="运费" hintText="请输入运费" v-model="order.cost" fullWidth/>
      <mu-text-field label="运单号" hintText="请输入运单号" v-model="order.deliverySn" fullWidth/>
      <mu-raised-button label="确认发货" @click="submit" fullWidth primary/>
		</div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      data: {},
      middle: [],
      order: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  },
  methods: {
    get () {
      var ctx = this
      this.$http.get('/rest/api/order/detail/' + this.$route.params.id).then((res) => {
        let data = res.data.attributes.data
        ctx.data = data
        ctx.order.orderId = data.orderId
        let middle = res.data.attributes.middle
        ctx.middle = middle
        ctx.order.com = middle[0].com
      })
    },
    submit () {
      if (!this.order.com) { return window.alert('物流信息不能为空') }
      if (!this.order.cost) { return window.alert('运费不能为空') }
      if (!this.order.deliverySn) { return window.alert('运单号不能为空') }
      this.$http.put('/rest/api/order/express?' + qs.stringify(this.order)).then((res) => {
        this.$router.back()
      })
    }
  }
}
</script>
<style scoped>
.order_sending{padding:.5rem}
.order_sending h3{font-size:.75rem;font-weight:400;padding:.5rem 0}
.order_sending_address{border:.05rem solid #d6d6d6;width:100%;padding:.5rem;overflow:hidden;box-sizing:border-box;border-radius:.25rem}
.sending_fl{float:left;text-align:right;width:3rem}
.sending_fr{float:left;width:75%}
.order_sending_address p{clear:both;overflow:hidden;line-height:1.5}
.order_sending_express select{width:100%;padding:.5rem;border:.05rem solid #d6d6d6;font-size:.6rem;background-size:2rem .2rem;margin-bottom:1rem}
.order_sending_express input{width:100%}
.order_sending_title{margin-top:.8rem}
.receiving_fl{float:left;text-align:right;width:4rem;color:#a8a8a8;padding-top:.2rem}
.receiving_fr{float:left;width:70%;}
</style>
