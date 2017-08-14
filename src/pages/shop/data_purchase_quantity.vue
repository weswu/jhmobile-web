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
    <mu-list-item title="客户">
      <div slot="left" class="c000 font14">排行</div>
      <div slot="right" class="c000 font14">数量</div>
    </mu-list-item>
    <mu-divider/>
    <mu-list>
      <template v-for='(item, index) in list'>
        <mu-list-item :title="item.name || item.username">
          <div slot="left">{{index + 1}}</div>
          <div slot="right">{{item.quantity}}</div>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      busy: false,
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
      this.$http.get('/rest/api/order/data/member_list?pageSize=5000&sort=1&page=1').then((res) => {
        this.list = res.data.attributes.data
        if (this.list.length === 0) {this.busy = true}
        this.count = res.data.attributes.count
      })
    },
    loadMore () {
      this.refresh && this.get()
    }
  }
}
</script>
