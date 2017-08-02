<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar title="询盘查看">
        <mu-icon-button icon='arrow_back' @click='back' slot='left'/>
      </mu-appbar>
    </div>
    <div class='message_view'>
			<dl>
				<dt>标题:</dt>
				<dd>{{message.title}}</dd>
				<br>
				<dt>时间:</dt>
				<dd>{{message.addTime}}</dd>
				<br>
				<dt>发件人:</dt>
				<dd>{{message.fromName}}</dd>
				<br>
				<dt>联系电话:</dt>
				<dd>{{message.fromPhone}}</dd>
				<br>
				<dt>电子邮箱:</dt>
				<dd>{{message.fromEmail}}</dd>
				<br>
				<dt>询盘内容:</dt>
				<dd v-html="message.content"></dd>
			</dl>
		</div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      message: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  },
  methods: {
    get () {
      this.$http.get('/rest/api/message/detail/' + this.$route.params.id).then((res) => {
        this.message = res.data.attributes.data
      })
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.message_view {
    padding: 0.5rem;
    line-height: 2;
    font-size: .8rem;
    overflow: hidden;
}
.message_view dt {
    width: 26%;
    float: left;
    text-align: right;
    color: #9b9b9b;
}
.message_view dd {
    width: 68%;
    float: left;
    margin-left: .3rem;
}
</style>
