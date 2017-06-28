<template>
  <div class='demo-container'>
    <mu-list>
      <template v-for='item,index in cate'>
        <mu-list-item data-type="pc" :title="item.text" @click="rank(index+1)">
          <div slot="leftAvatar">{{index+1}}、</div>
        </mu-list-item>
        <ul class="dis-data-display" style="display: block;">
          <div class="item-list">
           <dl class="item-list-first">
             <dd class="item-row-1"></dd>
             <dd class="item-row-2">编号</dd>
             <dd class="item-row-5">昵称</dd>
             <dd class="item-row-2">数量</dd>
           </dl>
           <dl ng-repeat="dis in disList9">
             <dd class="item-row-1"><span>1</span></dd>
             <dd class="item-row-2">127</dd>
             <dd class="item-row-5 ellipsis">zaing7</dd>
             <dd class="item-row-2">3</dd>
           </dl>
           <dl ng-repeat="dis in disList9"f>
             <dd class="item-row-1"><span>2</span></dd>
             <dd class="item-row-2">128</dd>
             <dd class="item-row-5 ellipsis">汤圆爸比™جاڭ يى</dd>
             <dd class="item-row-2">2</dd>
           </dl>

          </div>
          </ul>
        <mu-divider/>
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
        { text: '本月销售额排行', list: [] },
        { text: '本月佣金排行', list: [] },
        { text: '本月粉丝排行', list: [] },
        { text: '上月销售额排行', list: [] },
        { text: '上月佣金排行', list: [] },
        { text: '上月粉丝排行', list: [] },
        { text: '累计销售额排行', list: [] },
        { text: '累计佣金排行', list: [] },
        { text: '累计粉丝排行', list: [{ nickname: 'zaing7', dealer_id: '127', count: 3 }, { nickname: '汤圆爸比™جاڭ يى', dealer_id: '128', count: 2 }]
        }
      ]
    }
  },
  methods: {
    rank (e) {
      var ctx = this
      jsonp('http://www.jihui88.com/wechat/cps/index.php/jihui_api/ranking/' + this.$store.state.user.enterpriseId + '/' + e, null, function (err, data) {
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
        ctx.cate[e].list = data.attributes.data
      })
    }
  }
}
</script>

<style lang='css' scoped>
</style>
