<template>
  <div class="wu-infinite-container">
    <mu-list-item title="会员信息">
      <div class="wu-item-right font16"><span class="c000">提现信息</span></div>
    </mu-list-item>
    <mu-divider/>
    <mu-list class="member-list">
      <template v-for='(dis, index) in list'>
        <mu-list-item :style="index%2 === 1 ? 'background: #f3f3f3;' : ''">
          <div class="fl" style="width:30%">
            <div class="fl">
              <p><span>编号：</span>{{dis.dealer_id}}</p>
              <p><span>昵称：</span><br>{{dis.nickname}}</p>
            </div>
          </div>
          <div class="fr" style="width:70%">
            <p><span>提现单号：</span><br>{{dis.mch_billno}}</p>
            <p><span>提现状态：</span>{{dis.result_code === 'SUCCESS' ? '成功' : '失败'}}</p>
            <p><span>提现金额：</span>￥{{dis.total_amount}}</p>
            <p><span>提现时间：</span>{{dis.send_time || ''}}</p>
          </div>
        </mu-list-item>
      </template>
    </mu-list>
    <div v-if="busy" style="text-align: center;padding: .5rem 0;">暂无数据</div>
    <mu-infinite-scroll :scroller='scroller' :loading='loading' @load='loadMore'/>
  </div>
</template>
<script>
import jsonp from 'jsonp'
export default {
  data () {
    return {
      list: [],
      loading: false,
      scroller: null,
      refresh: true,
      busy: false,
      searchData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    get () {
      var ctx = this
      this.loading = true
      var entId = this.$store.state.user.enterpriseId
      jsonp('http://www.jihui88.com/wechat/cps/index.php/jihui_api/bouns/' + entId + '/' + this.searchData.page + '/4?callback=' + entId, null, function (err, data) {
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
        }
        data.attributes.data.forEach(item => {
          item.nickname = JSON.parse(item.userinfo).nickname
        })
        ctx.scrollList(ctx, data)
      })
    },
    loadMore () {
      this.refresh && this.get()
    }
  }
}
</script>
