<template>
  <div class='demo-container'>
    <mu-list>
      <template v-for='item,index in cate'>
        <mu-list-item data-type="pc" :title="item.text" @click="rank(index)">
          <div slot="leftAvatar">{{index+1}}、</div>
        </mu-list-item>
        <ul class="dis-data" v-show="item.click">
          <div class="item-list">
           <dl class="item-list-first">
             <dd class="item-row-1"></dd>
             <dd class="item-row-2">编号</dd>
             <dd class="item-row-5">昵称</dd>
             <dd class="item-row-2">数量</dd>
           </dl>
           <dl  v-for='d,i in item.list'>
             <dd class="item-row-1"><span>{{i+1}}</span></dd>
             <dd class="item-row-2">{{d.dealer_id}}</dd>
             <dd class="item-row-5 ellipsis">{{d.nickname}}</dd>
             <dd class="item-row-2">{{d.count}}</dd>
           </dl>
          </div>
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

<style lang='css' scoped>
.dis-data{
  padding: 10px;
}
.dis-data .item-list-first {
    color: #000;
    background: #f5f5f5;
}
.dis-data dl{
  position: relative;
overflow: hidden;
padding: 5px .5rem;
border-bottom: 1px solid #f0f0f0;
}
</style>
