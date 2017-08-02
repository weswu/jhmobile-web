<template>
  <div>
    <div class='fixed-bar'>
      <mu-appbar>
        <mu-icon-button icon='arrow_back' @click="back" slot="left"/>
        <div class='play-title'>
          客户购买数量排行<span style='font-size:16px;padding-left:5px' v-show='count'>({{count}})</span>
        </div>
      </mu-appbar>
    </div>
    <div class="item-list">
        <dl>
            <dd class="item-row-2">排行</dd>
            <dd class="item-row-4">客户</dd>
            <dd class="item-row-4">数量</dd>
        </dl>
    </div>
    <mu-list>
      <template v-for='(item, index) in list'>
        <mu-list-item :title="item.name || item.username">
          <div slot="left">{{index + 1}}</div>
          <div slot="right">{{item.quantity}}</div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      count: 0
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
      this.$http.get('/rest/api/order/data/member_list?pageSize=5000&sort=2&page=1').then((res) => {
        this.list = res.data.attributes.data
        this.count = res.data.attributes.count
      })
    },
    loadMore () {
      this.refresh && this.get()
    }
  }
}
</script>
