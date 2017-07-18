<template>
  <div class="progress">
    <div class="fixed-bar">
      <mu-appbar :title="title">
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <div class=" progress">
			<div class="sp_title">描述</div>
      <section class="section" v-html="desc"></section>
			<div class="sp_title">处理结果</div>
      <section class="section">
        {{result}}
      </section>
			<div class="sp_title">处理过程</div>
			<div class="item-list">
			  <dl class="member_list_first">
			    <dd class="item-row-2-5">处理时间</dd>
				  <dd class="item-row-2">姓名</dd>
				  <dd class="item-row-5-5">处理过程</dd>
			  </dl>
			<div class="tab-panel">
			  <dl v-for="item in list">
			 		<dd class="item-row-2-5">{{item.deal_time | time('yyyy-MM-dd')}}</dd>
					<dd class="ellipsis item-row-2">{{item.emp_name}}</dd>
					<dd class="item-row-5-5">{{item.deal_result}}</dd>
				</dl>
			</div>
			</div>
	</div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      title: this.$route.params.title,
      desc: this.$route.params.desc,
      result: this.$route.params.result,
      list: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.params.id) {
        vm.get()
      }
    })
  },
  methods: {
    back () {
      this.$router.back()
    },
    get () {
      this.$http.get('/rest/api/crm/feedback/detail/' + this.$route.params.id).then((res) => {
        this.list = res.data.attributes.data
      })
    }
  }
}
</script>
<style scoped="">
.sp_title {
    background: #f5f5f5;
    padding: .4rem .5rem;
    color: #000;
    font-weight: 600;
    font-size: .55rem;
}
</style>
