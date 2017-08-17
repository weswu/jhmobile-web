<template>
  <div class="rule">
    <div class="fixed-bar">
      <mu-appbar title="积分规则是什么？">
        <mu-icon-button icon='arrow_back' @click='$router.back()'  slot='left'/>
      </mu-appbar>
    </div>
    <div class="p10">
      <p style="padding-top: 0.7rem;">1、积分专属机汇网，仅限机汇网内使用；</p>
      <p>2、在机汇网后台、微信公众号【机汇网络】和APP进行以下操作时，均可获得积分；</p>
      <table border="1" cellpadding="0" cellspacing="0">
      	<tbody>
          <tr class="firstRow">
      			<td><span>操作行为</span></td>
      			<td><span>获得数量</span></td>
      		</tr>
      		<tr>
      			<td><span>账号资料修改</span></td>
      			<td><span>{{rule.accountEditPoint}}</span><span>积分</span></td>
      		</tr>
      		<tr>
      			<td><span>产品新增</span></td>
      			<td><span>{{rule.productAddPoint}}</span><span>积分</span></td>
      		</tr>
      		<tr>
      			<td><span>产品修改</span></td>
      			<td><span>{{rule.productEditPoint}}</span><span>积分</span></td>
      		</tr>
      		<tr>
      			<td><span>新闻新增</span></td>
      			<td><span>{{rule.newsAddPoint}}</span><span>积分</span></td>
      		</tr>
      		<tr>
      			<td><span>新闻修改</span></td>
      			<td><span>{{rule.newsEditPoint}}</span><span>积分</span></td>
      		</tr>
      		<tr>
      			<td><span>网站发布</span></td>
      			<td><span>{{rule.publishPoint}}</span><span>积分</span></td>
      		</tr>
      		<tr>
      			<td><span>每月操作记录大于15次</span></td>
      			<td><span>{{rule.mounthRecordPoint}}</span><span>积分</span></td>
      		</tr>
      		<tr>
      			<td><span>改进意见提交，<a href="#/service_feedback" style="color: #da4747;">马上发送</a></span></td>
      			<td><span>{{rule.advisePoint}}</span><span>积分</span></td>
      		</tr>
      	</tbody>
      </table>
      <p>3、积分不能兑现，不可转让。</p>
      <p><a href="#/point_detail" class="btn-a" style="margin-right: 0;float: left;">积分明细</a><a href="#/point_exchange" class="btn-a" style="margin-left: 0;float: right;">兑换记录</a></p>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      username: this.$store.state.user.username,
      enterName: this.$store.state.enterprise.name,
      rule: {
        accountEditPoint: 0,
        productAddPoint: 0,
        productEditPoint: 0,
        newsAddPoint: 0,
        newsEditPoint: 0,
        publishPoint: 0,
        mounthRecordPoint: 0,
        advisePoint: 0,
        orderPoint: 0,
        posterPoint: 0
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/rest/api/point_rule/info').then((res) => {
        this.rule = res.data.attributes.data
      })
    }
  }
}
</script>
<style scoped>
.rule p{padding:5px 0}
table{width:100%;margin:10px 0;border-spacing:0;border-collapse:collapse;background-color:#fff;border:1px solid #ddd;font-size:.65rem;color:#666}
table td{line-height:22px;padding:5px 0;text-align:center}
.firstRow{color:#000;font-size:.7rem}
.btn-a{background:#ff6000;color:#fff;display:inline-block;margin:.5rem;padding:.41rem 2rem;border-radius:.2rem;font-size:.7rem}
</style>
