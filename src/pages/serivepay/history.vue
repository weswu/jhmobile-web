<template>
  <div>
    <mu-list>
      <template v-for='item in list'>
        <mu-list-item>
          <div slot='title'>
             <img src='static/img/allpaid.gif'/>
             {{item.name}}
          </div>
          <span slot='describe'>
            {{item.so_date | time('yyyy-MM-dd')}}
          </span>
          <div slot='right'>
            <span>￥{{item.price}}</span><br>
            <span class='complete '>交易成功</span>
          </div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <div v-show='isNull'>
      请在正常工作时间浏览噢<br>周一到周五　8:00～17:30
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          so_date: 1568131200000,
          so_amount: 0,
          so_payed_amount: 0,
          orderItemList: [
            {
              prod_name: '手机网站续费'
            }
          ],
          price: 200,
          type: 'no',
          so_id: 159091,
          so_code: 'xf2019090030'
        },
        {
          so_date: 1559145600000,
          so_amount: 2580,
          so_payed_amount: 2580,
          orderItemList: [
            {
              prod_name: '会员2代续费【机汇网会员】'
            },
            {
              prod_name: '国际域名续费'
            }
          ],
          price: 200,
          type: 'no',
          so_id: 159084,
          so_code: 'xf2019050020'
        }
      ]
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/crm/receipt/log').then((res) => {
        if (!res.data.success) {
          this.isNull = true
          return false
        }
        var data = res.data.attributes.data
        for (var item of data) {
          item.name = ''
          for (var it of item.orderItemList) {
            if (item.name === '') {
              item.name += it.prod_name
            } else {
              item.name += '、' + it.prod_name
            }
          }
          this.list.push(item)
        }
      })
    }
  }
}
</script>
