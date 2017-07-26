<template>
<div>
  <mu-appbar title="商城数据">
    <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
  </mu-appbar>

  <div class="container">
    <div class="hr"></div>
    <mu-list>
      <mu-list-item title="支付金额">
        <div slot="right">￥{{data.totalAmount}}</div>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="买家数">
        <div slot="right">{{data.operator}}</div>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="支付件数">
        <div slot="right">{{data.productTotalQuantity}}</div>
      </mu-list-item>
    </mu-list>
    <div class="hr"></div>
    <mu-list>
      <mu-list-item title="客户购买数量排行" @click="page('/data_p_q')">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="客户购买金额排行" @click="page('/data_p_a')">
        <mu-icon value="navigate_next" :size="20" slot="right" color="#aaa"/>
      </mu-list-item>
      <mu-divider/>
    </mu-list>
  </div>

</div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        totalAmount: 0,
        operator: 0,
        productTotalQuantity: 0
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
      this.$http.get('/rest/api/order/data').then((res) => {
        this.data = res.data.attributes
      })
    },
    page (e) {
      this.$router.push({path: e})
    }
  }
}
</script>
