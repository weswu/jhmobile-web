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
        var data = res.data.attributes.data
        if (data.content.indexOf('[{"value":"') > -1) {
          var cList = JSON.parse(data.content)
          data.content = ''
          for (var item of cList) {
            if (cList.length === 1 && item.type === 'textarea') { // 单一选项
              data.content = item.value
            } else {
              if (item.label === '姓名') {
                data.fromName = item.wxNick || item.value
              } else {
                if (data.content === '') {
                  data.content = item.label + ':' + item.value
                } else {
                  data.content = data.content + '<br/>' + item.label + ':' + item.value
                }
              }
            }
          }
        }
        this.message = data
      })
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.message_view{padding:.5rem;line-height:2;font-size:.8rem;overflow:hidden}
.message_view dt{width:26%;float:left;text-align:right;color:#9b9b9b}
.message_view dd{width:68%;float:left;margin-left:.3rem}
</style>
