<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="发货">
        <mu-icon-button icon='arrow_back' @click='$router.back()'  slot='left'/>
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

      <mu-select-field v-model="order.exp" :labelFocusClass="['label-foucs']" label="物流信息">
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
      this.$http.get('/rest/api/order/detail/' + this.$route.params.id).then((res) => {
        this.data = res.data.attributes.data
        this.middle = res.data.attributes.middle
        this.order.orderId = this.data.orderId
      })
    },
    submit () {
      if (!this.order.exp) {
        window.alert('物流信息不能为空')
        return
      }
      if (!this.order.cost) {
        window.alert('运费不能为空')
        return
      }
      if (!this.order.deliverySn) {
        window.alert('运单号不能为空')
        return
      }
      this.$http.post('/rest/api/order/express?' + qs.stringify(this.order)).then((res) => {
        this.$router.push({
          path: '/bind',
          query: this.bind
        })
      })
    }
  }
}
</script>
