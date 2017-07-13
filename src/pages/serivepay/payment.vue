<template>
  <div class="serivepay-payment">
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item disableRipple @click="check(item)" :describeText="item.so_date | time('yyyy-MM-dd')">
          <mu-checkbox :value="item.check" slot="left" @change="check(item)"/>
          <div slot="title">
             <img :src="'../../static/img/' + item.type + 'paid.gif'"/>
             <span v-for='names in item.orderItemList'>{{names.prod_name}}</span>
          </div>
          <div slot="right">
            <span class="red">￥{{item.price}}</span>元<br>
            {{item.tip}}部分支付
          </div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <div v-show="isNull">
      请在正常工作时间浏览噢<br>周一到周五　8:00～17:30
    </div>
    <div class="app_footer">
      <div class="foot-lf">
        <span @click="toggleAll" style="padding-right: 0.2rem;">全选</span>
        选中<span style="padding:0 0.1rem">{{checkNum}}</span>，
        共计<span class="red" style="padding:0 0.2rem">{{totel}}</span>元
      </div>
      <div class="app-button" @click="pay">确定缴费</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          so_date: 1414512000000,
          so_amount: 200,
          so_payed_amount: 0,
          orderItemList: [
            {
              prod_name: '腾讯企业邮箱'
            }
          ],
          price: 200,
          type: 'no',
          so_id: 101617,
          so_code: 'xf2014100140'
        }
      ],
      isNull: false,
      checkNum: 0,
      totel: 0
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.loading = true
      this.$http.get('/rest/api/crm/receipt/list').then((res) => {
        if (!res.data.success) {
          this.isNull = true
          return false
        }
        var result = res.data.attributes.data
        for (var i = 0; i < result.length; i++) {
          result[i].name = ''
          result[i].price = result[i].so_amount - result[i].so_payed_amount
          result[i].type = 'no'
          if (result[i].so_payed_amount > 0 && result[i].price > 0) {
            result[i].tip = '部分支付'
            result[i].type = 'under'
          }
          if (result[i].price === 0) {
            result[i].tip = '已支付'
            result[i].type = 'all'
          }
          result[i].check = false
          this.list.push(result[i])
        }
      })
    },
    check (item) {
      item.check = !item.check
      this.totelsum()
    },
    toggleAll () {
      var bol
      if (this.checkNum > this.list.length / 2) {
        bol = false
      } else {
        bol = true
      }
      for (var item of this.list) {
        item.check = bol
      }
      this.totelsum()
    },
    totelsum () {
      this.totel = 0
      this.checkNum = 0
      for (var item of this.list) {
        if (item.check) {
          this.totel = this.accAdd(this.totel, parseFloat(item.price))
          this.checkNum += 1
        }
      }
    },
    pay () {
      if (this.totel === 0) {
        alert('请选择订单')
        return false
      }
      this.$router.push({path: '/mypay', params: {totel: this.totel}})
    },
    // 计算浮点数
    accAdd (arg1, arg2) {
      var r1, r2, m, c
      try {
        r1 = arg1.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = arg2.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      c = Math.abs(r1 - r2)
      m = Math.pow(10, Math.max(r1, r2))
      if (c > 0) {
        var cm = Math.pow(10, c)
        if (r1 > r2) {
          arg1 = Number(arg1.toString().replace('.', ''))
          arg2 = Number(arg2.toString().replace('.', '')) * cm
        } else {
          arg1 = Number(arg1.toString().replace('.', '')) * cm
          arg2 = Number(arg2.toString().replace('.', ''))
        }
      } else {
        arg1 = Number(arg1.toString().replace('.', ''))
        arg2 = Number(arg2.toString().replace('.', ''))
      }
      return (arg1 + arg2) / m
    }
  }
}
</script>
<style>
.serivepay-payment .mu-item-title span{
  padding-right: 5px
}

.app_footer{
  position: fixed;
  color:#666;
  line-height: 2.3rem;
    font-size: .8rem;
    height: 2.3rem;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    background: #fafafa;
    display: -moz-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: -ms-flex;
    display: flex;
}
.app_footer .foot-lf{
  color: #777;font-size: 0.6rem;padding-left: 0.5rem;float: left;
}
.app_footer .app-button{
  background: #ff6000;color:#fff;right: 0;  padding: 0 0.7rem;position: absolute;
}
</style>
