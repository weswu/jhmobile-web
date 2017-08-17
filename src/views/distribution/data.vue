<template>
  <div>
    <mu-list>
      <template v-for='item,index in cate'>
        <mu-list-item data-type="pc" :title="item.text" @click="rank(index)">
          <div slot="leftAvatar">{{index+1}}、</div>
        </mu-list-item>
        <ul class="p10" v-show="item.click">
          <mu-list-item title="昵称" style="background:#f5f5f5">
            <div slot="left" class="c000 font14">排行</div>
            <div slot="right" class="c000 font14">数量</div>
          </mu-list-item>
          <mu-list>
            <template v-for='(d, i) in item.list'>
              <mu-list-item :title="'编号:'+d.dealer_id" :describeText='d.nickname'>
                <div slot="left">{{i + 1}}</div>
                <div slot="right">{{d.count}}</div>
              </mu-list-item>
              <mu-divider/>
            </template>
          </mu-list>
        </ul>
      </template>
    </mu-list>
  </div>
</template>
<script>
import jsonp from 'jsonp'
export default {
  data () {
    return {
      cate: [
        { text: '本月销售额排行', list: [], click: false, data: true },
        { text: '本月佣金排行', list: [], click: false, data: true },
        { text: '本月粉丝排行', list: [], click: false, data: true },
        { text: '上月销售额排行', list: [], click: false, data: true },
        { text: '上月佣金排行', list: [], click: false, data: true },
        { text: '上月粉丝排行', list: [], click: false, data: true },
        { text: '累计销售额排行', list: [], click: false, data: true },
        { text: '累计佣金排行', list: [], click: false, data: true },
        { text: '累计粉丝排行', list: [], click: false, data: true }
      ]
    }
  },
  methods: {
    rank (e) {
      var ctx = this
      this.cate[e].click = !this.cate[e].click
      if (this.cate[e].data) {
        jsonp('http://www.jihui88.com/wechat/cps/index.php/jihui_api/ranking/' + this.$store.state.user.enterpriseId + '/' + (e + 1), null, function (err, data) {
          if (err) {
            console.error(err.message)
          } else {
            console.log(data)
          }
          ctx.cate[e].list = data.attributes.data
        })
      }
      this.cate[e].data = false
    }
  }
}
</script>
