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
            <span>￥{{item.so_amount}}</span><br>
            <span class='complete'>交易成功</span>
          </div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <mu-circular-progress :size="60" :strokeWidth="4" v-if="loading" style="margin: 0 auto;display: flex;"/>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;" v-html="text"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      text: '暂无数据',
      busy: false,
      loading: false
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.loading = true
      this.$http.get('/rest/api/crm/receipt/log').then((res) => {
        this.loading = false
        if (!res.data.success) {
          this.text = '请在正常工作时间浏览噢<br>周一到周五　8:00～17:30'
          this.busy = true
          return false
        }
        var result = res.data.attributes.data
        if (result.length === 0) {
          this.busy = true
        } else {
          for (var item of result) {
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
        }
      })
    }
  }
}
</script>
